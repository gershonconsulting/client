import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Streak API configuration
const STREAK_API_KEY = 'e77554988b424c6498d85362b0367757'
const PIPELINE_KEY = 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgICAwLWbCgw'
const STREAK_API_BASE = 'https://www.streak.com/api/v1'

// Helper function to make Streak API calls
async function callStreakAPI(endpoint: string) {
  const auth = btoa(`${STREAK_API_KEY}:`)
  const response = await fetch(`${STREAK_API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    throw new Error(`Streak API error: ${response.statusText}`)
  }
  
  return response.json()
}

// API Routes

// Get pipeline information
app.get('/api/pipeline', async (c) => {
  try {
    const pipeline = await callStreakAPI(`/pipelines/${PIPELINE_KEY}`)
    return c.json(pipeline)
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

// Get all boxes from pipeline
app.get('/api/boxes', async (c) => {
  try {
    const boxes = await callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    return c.json(boxes)
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

// Get specific box details
app.get('/api/boxes/:boxKey', async (c) => {
  try {
    const boxKey = c.req.param('boxKey')
    const box = await callStreakAPI(`/boxes/${boxKey}`)
    return c.json(box)
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

// Get analytics summary
app.get('/api/analytics', async (c) => {
  try {
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    // Calculate analytics
    const totalBoxes = Array.isArray(boxes) ? boxes.length : 0
    const stageDistribution = {}
    const originDistribution = {}
    const priorityDistribution = {}
    let boxesWithDueDate = 0
    
    // Find stage and field keys
    const stageMap = pipeline.stageOrder || []
    const stages = Array.isArray(stageMap) ? stageMap.map(key => ({
      key,
      name: pipeline.stages?.[key]?.name || 'Unknown'
    })) : []
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const originField = fields.find(f => f && f.name === 'Origin')
    const priorityField = fields.find(f => f && f.name === 'Priority')
    const dueDateField = fields.find(f => f && f.name === 'Est Start Date')
    
    if (Array.isArray(boxes)) {
      boxes.forEach(box => {
        if (!box) return
        
        // Count by stage
        const stage = stages.find(s => s && s.key === box.stageKey)
        const stageName = stage ? stage.name : 'Unknown'
        stageDistribution[stageName] = (stageDistribution[stageName] || 0) + 1
        
        // Count by origin
        if (originField && box.fields && box.fields[originField.key]) {
          const originKey = box.fields[originField.key]
          const items = originField.dropdownSettings?.items
          const originItem = Array.isArray(items) ? items.find(i => i && i.key === originKey) : null
          const originName = originItem ? originItem.name : 'Unknown'
          originDistribution[originName] = (originDistribution[originName] || 0) + 1
        }
        
        // Count by priority
        if (priorityField && box.fields && box.fields[priorityField.key]) {
          const priorityKey = box.fields[priorityField.key]
          const items = priorityField.dropdownSettings?.items
          const priorityItem = Array.isArray(items) ? items.find(i => i && i.key === priorityKey) : null
          const priorityName = priorityItem ? priorityItem.name : 'No Priority'
          priorityDistribution[priorityName] = (priorityDistribution[priorityName] || 0) + 1
        } else {
          priorityDistribution['No Priority'] = (priorityDistribution['No Priority'] || 0) + 1
        }
        
        // Count boxes with due date
        if (dueDateField && box.fields && box.fields[dueDateField.key]) {
          boxesWithDueDate++
        }
      })
    }
    
    // Calculate percentages
    const priorityPercentages = {}
    Object.keys(priorityDistribution).forEach(key => {
      priorityPercentages[key] = totalBoxes > 0 ? ((priorityDistribution[key] / totalBoxes) * 100).toFixed(1) : 0
    })
    
    const dueDatePercentage = totalBoxes > 0 ? ((boxesWithDueDate / totalBoxes) * 100).toFixed(1) : 0
    
    return c.json({
      totalBoxes,
      stageDistribution,
      originDistribution,
      priorityDistribution,
      priorityPercentages,
      boxesWithDueDate,
      dueDatePercentage: parseFloat(dueDatePercentage),
      recentBoxes: Array.isArray(boxes) ? boxes.slice(0, 10).map(box => {
        const stage = stages.find(s => s && s.key === box.stageKey)
        
        // Get priority
        let priority = 'No Priority'
        if (priorityField && box.fields && box.fields[priorityField.key]) {
          const priorityKey = box.fields[priorityField.key]
          const items = priorityField.dropdownSettings?.items
          const priorityItem = Array.isArray(items) ? items.find(i => i && i.key === priorityKey) : null
          priority = priorityItem ? priorityItem.name : 'No Priority'
        }
        
        // Get due date
        let dueDate = null
        if (dueDateField && box.fields && box.fields[dueDateField.key]) {
          dueDate = new Date(box.fields[dueDateField.key]).toISOString()
        }
        
        return {
          name: box.name || 'Unnamed',
          key: box.boxKey,
          stage: stage ? stage.name : 'Unknown',
          priority: priority,
          dueDate: dueDate,
          lastUpdated: new Date(box.lastUpdatedTimestamp).toISOString()
        }
      }) : []
    })
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

// Default route - Dashboard HTML
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gershon Consulting Pipeline Report</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 mb-8 text-white">
                <h1 class="text-4xl font-bold mb-2">
                    <i class="fas fa-chart-line mr-3"></i>
                    Gershon Consulting Pipeline Report
                </h1>
                <div class="flex items-center justify-between">
                    <p class="text-blue-100">GC Pipeline Dashboard</p>
                    <p class="text-blue-100 text-sm">
                        <i class="fas fa-sync-alt mr-2"></i>
                        Last Updated: <span id="last-updated" class="font-semibold">Loading...</span>
                    </p>
                </div>
                <p class="text-blue-200 text-xs mt-2">
                    <i class="fas fa-calendar-alt mr-1"></i>
                    Auto-refreshes every Monday at 8:00 AM
                </p>
            </div>

            <!-- Loading State -->
            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-5xl text-blue-600 mb-4"></i>
                <p class="text-gray-600 text-lg">Loading pipeline data...</p>
            </div>

            <!-- Error State -->
            <div id="error" class="hidden bg-red-50 border border-red-200 rounded-lg p-6">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-red-800 font-semibold">Error Loading Data</h3>
                        <p id="error-message" class="text-red-600"></p>
                    </div>
                </div>
            </div>

            <!-- Dashboard Content -->
            <div id="dashboard" class="hidden">
                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Total Boxes</p>
                                <p id="total-boxes" class="text-3xl font-bold text-gray-800 mt-1">0</p>
                            </div>
                            <div class="bg-blue-100 rounded-full p-3">
                                <i class="fas fa-box text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Active Stages</p>
                                <p id="total-stages" class="text-3xl font-bold text-gray-800 mt-1">0</p>
                            </div>
                            <div class="bg-green-100 rounded-full p-3">
                                <i class="fas fa-layer-group text-green-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">High Priority</p>
                                <p id="high-priority" class="text-3xl font-bold text-red-600 mt-1">0%</p>
                            </div>
                            <div class="bg-red-100 rounded-full p-3">
                                <i class="fas fa-exclamation-circle text-red-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">With Due Date</p>
                                <p id="due-date-percentage" class="text-3xl font-bold text-purple-600 mt-1">0%</p>
                            </div>
                            <div class="bg-purple-100 rounded-full p-3">
                                <i class="fas fa-calendar-check text-purple-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-pie mr-2 text-blue-600"></i>
                            Distribution by Stage
                        </h3>
                        <canvas id="stageChart"></canvas>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar mr-2 text-red-600"></i>
                            Priority Distribution
                        </h3>
                        <canvas id="priorityChart"></canvas>
                    </div>
                </div>

                <!-- Top Origins -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">
                        <i class="fas fa-star mr-2 text-yellow-600"></i>
                        Top Origins
                    </h3>
                    <div id="origins-list" class="space-y-3"></div>
                </div>

                <!-- Recent Boxes -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">
                        <i class="fas fa-clock mr-2 text-indigo-600"></i>
                        Recent Boxes
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody id="recent-boxes" class="bg-white divide-y divide-gray-200"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let stageChart, priorityChart;

            // Update last updated timestamp
            function updateTimestamp() {
                const now = new Date();
                const options = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                };
                document.getElementById('last-updated').textContent = now.toLocaleDateString('en-US', options);
            }

            // Check if it's Monday 8AM and schedule auto-refresh
            function setupAutoRefresh() {
                const checkAndRefresh = () => {
                    const now = new Date();
                    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday
                    const hour = now.getHours();
                    const minute = now.getMinutes();
                    
                    // If it's Monday (1) at 8:00 AM
                    if (dayOfWeek === 1 && hour === 8 && minute === 0) {
                        console.log('Auto-refreshing dashboard - Monday 8:00 AM');
                        loadDashboard();
                    }
                };
                
                // Check every minute
                setInterval(checkAndRefresh, 60000);
                
                // Also calculate time until next Monday 8AM for console info
                const now = new Date();
                const nextMonday = new Date();
                const daysUntilMonday = (8 - now.getDay()) % 7 || 7; // Days until next Monday
                nextMonday.setDate(now.getDate() + daysUntilMonday);
                nextMonday.setHours(8, 0, 0, 0);
                
                const timeUntilRefresh = nextMonday - now;
                const hoursUntil = Math.floor(timeUntilRefresh / (1000 * 60 * 60));
                console.log(\`Next auto-refresh scheduled for: \${nextMonday.toLocaleString()} (in \${hoursUntil} hours)\`);
            }

            async function loadDashboard() {
                try {
                    const response = await fetch('/api/analytics');
                    if (!response.ok) throw new Error('Failed to fetch data');
                    
                    const data = await response.json();
                    
                    // Update timestamp
                    updateTimestamp();
                    
                    // Update summary cards
                    document.getElementById('total-boxes').textContent = data.totalBoxes;
                    document.getElementById('total-stages').textContent = Object.keys(data.stageDistribution).length;
                    document.getElementById('high-priority').textContent = data.priorityPercentages['1. High'] ? data.priorityPercentages['1. High'] + '%' : '0%';
                    document.getElementById('due-date-percentage').textContent = data.dueDatePercentage + '%';

                    // Create stage distribution chart
                    const stageLabels = Object.keys(data.stageDistribution);
                    const stageValues = Object.values(data.stageDistribution);
                    
                    const stageCtx = document.getElementById('stageChart').getContext('2d');
                    if (stageChart) stageChart.destroy();
                    stageChart = new Chart(stageCtx, {
                        type: 'pie',
                        data: {
                            labels: stageLabels,
                            datasets: [{
                                data: stageValues,
                                backgroundColor: [
                                    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                                    '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { position: 'bottom' }
                            }
                        }
                    });

                    // Create priority distribution chart
                    const priorityLabels = Object.keys(data.priorityPercentages);
                    const priorityValues = Object.values(data.priorityPercentages).map(v => parseFloat(v));
                    
                    const priorityCtx = document.getElementById('priorityChart').getContext('2d');
                    if (priorityChart) priorityChart.destroy();
                    priorityChart = new Chart(priorityCtx, {
                        type: 'doughnut',
                        data: {
                            labels: priorityLabels,
                            datasets: [{
                                data: priorityValues,
                                backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#9CA3AF']
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { position: 'bottom' },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return context.label + ': ' + context.parsed + '%';
                                        }
                                    }
                                }
                            }
                        }
                    });

                    // Display top origins
                    const originsList = document.getElementById('origins-list');
                    const sortedOrigins = Object.entries(data.originDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 10);
                    
                    originsList.innerHTML = sortedOrigins.map(([name, count]) => \`
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <span class="text-gray-700 font-medium">\${name}</span>
                            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">\${count}</span>
                        </div>
                    \`).join('');

                    // Display recent boxes
                    const recentBoxes = document.getElementById('recent-boxes');
                    recentBoxes.innerHTML = data.recentBoxes.map(box => {
                        const priorityColor = box.priority.includes('High') ? 'bg-red-100 text-red-800' : 
                                            box.priority.includes('Medium') ? 'bg-yellow-100 text-yellow-800' : 
                                            box.priority.includes('Low') ? 'bg-green-100 text-green-800' : 
                                            'bg-gray-100 text-gray-600';
                        const dueDate = box.dueDate ? new Date(box.dueDate).toLocaleDateString() : '-';
                        
                        return \`
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">\${box.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">\${box.stage}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 \${priorityColor} rounded">\${box.priority}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">\${dueDate}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                \${new Date(box.lastUpdated).toLocaleDateString()}
                            </td>
                        </tr>
                        \`;
                    }).join('');

                    // Show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    
                } catch (error) {
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('error').classList.remove('hidden');
                    document.getElementById('error-message').textContent = error.message;
                }
            }

            // Load dashboard on page load and setup auto-refresh
            loadDashboard();
            setupAutoRefresh();
        </script>
    </body>
    </html>
  `)
})

export default app
