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

// Google Sheets compatible endpoints - return plain text for IMPORTDATA
// Get count by stage
app.get('/api/sheets/stage/:stageName/count', async (c) => {
  try {
    const stageName = c.req.param('stageName')
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const stageMap = pipeline.stageOrder || []
    const stages = Array.isArray(stageMap) ? stageMap.map(key => ({
      key,
      name: pipeline.stages?.[key]?.name || 'Unknown'
    })) : []
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      const stage = stages.find(s => s && s.key === box.stageKey)
      return stage && stage.name.toLowerCase() === stageName.toLowerCase()
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get count by priority
app.get('/api/sheets/priority/:priorityName/count', async (c) => {
  try {
    const priorityName = c.req.param('priorityName')
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const priorityField = fields.find(f => f && f.name === 'Priority')
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      if (!priorityField || !box.fields || !box.fields[priorityField.key]) {
        return priorityName.toLowerCase() === 'no priority'
      }
      const priorityKey = box.fields[priorityField.key]
      const items = priorityField.dropdownSettings?.items
      const priorityItem = Array.isArray(items) ? items.find(i => i && i.key === priorityKey) : null
      const priority = priorityItem ? priorityItem.name : 'No Priority'
      return priority.toLowerCase().includes(priorityName.toLowerCase())
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get count by country
app.get('/api/sheets/country/:countryName/count', async (c) => {
  try {
    const countryName = c.req.param('countryName')
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const countryField = fields.find(f => f && f.name === 'Country')
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      if (!countryField || !box.fields || !box.fields[countryField.key]) {
        return countryName.toLowerCase() === 'unknown'
      }
      const countryKey = box.fields[countryField.key]
      const items = countryField.dropdownSettings?.items
      const countryItem = Array.isArray(items) ? items.find(i => i && i.key === countryKey) : null
      const country = countryItem ? countryItem.name : 'Unknown'
      return country.toLowerCase() === countryName.toLowerCase()
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get total boxes count
app.get('/api/sheets/total', async (c) => {
  try {
    const boxes = await callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    const count = Array.isArray(boxes) ? boxes.length : 0
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get boxes with due dates (relevant stages only)
app.get('/api/sheets/duedate/count', async (c) => {
  try {
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const dueDateRelevantStages = ['Proposal Sent', 'Nurtering', 'Negotiating', 'Closing']
    const stageMap = pipeline.stageOrder || []
    const stages = Array.isArray(stageMap) ? stageMap.map(key => ({
      key,
      name: pipeline.stages?.[key]?.name || 'Unknown'
    })) : []
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const dueDateField = fields.find(f => f && f.name === 'Est Start Date')
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      const stage = stages.find(s => s && s.key === box.stageKey)
      const stageName = stage ? stage.name : 'Unknown'
      return dueDateRelevantStages.includes(stageName) && 
             dueDateField && 
             box.fields && 
             box.fields[dueDateField.key]
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get count by freshness level
app.get('/api/sheets/freshness/:level/count', async (c) => {
  try {
    const level = c.req.param('level').toLowerCase()
    const boxes = await callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      const freshness = box.freshness || 0
      if (level === 'high') {
        return freshness > 0.5
      } else if (level === 'medium') {
        return freshness >= 0.2 && freshness <= 0.5
      } else if (level === 'low') {
        return freshness < 0.2
      }
      return false
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
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
    const countryDistribution = {}
    const languageDistribution = {}
    const freshnessDistribution = { 'High (>0.5)': 0, 'Medium (0.2-0.5)': 0, 'Low (<0.2)': 0 }
    let boxesWithDueDate = 0
    let relevantStageBoxes = 0 // Boxes in stages where due date matters
    
    // Stages where due date is important
    const dueDateRelevantStages = ['Proposal Sent', 'Nurtering', 'Negotiating', 'Closing']
    
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
    const countryField = fields.find(f => f && f.name === 'Country')
    const languageField = fields.find(f => f && f.name === 'Language')
    
    if (Array.isArray(boxes)) {
      boxes.forEach(box => {
        if (!box) return
        
        // Get stage info (used multiple times)
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
        
        // Count boxes with due date (only for relevant stages: Proposal Sent, Nurtering, Negotiating, Closing)
        if (dueDateRelevantStages.includes(stageName)) {
          relevantStageBoxes++
          if (dueDateField && box.fields && box.fields[dueDateField.key]) {
            boxesWithDueDate++
          }
        }
        
        // Count by country
        if (countryField && box.fields && box.fields[countryField.key]) {
          const countryKey = box.fields[countryField.key]
          const items = countryField.dropdownSettings?.items
          const countryItem = Array.isArray(items) ? items.find(i => i && i.key === countryKey) : null
          const countryName = countryItem ? countryItem.name : 'Unknown'
          countryDistribution[countryName] = (countryDistribution[countryName] || 0) + 1
        } else {
          countryDistribution['Unknown'] = (countryDistribution['Unknown'] || 0) + 1
        }
        
        // Count by language
        if (languageField && box.fields && box.fields[languageField.key]) {
          const languageKey = box.fields[languageField.key]
          const items = languageField.dropdownSettings?.items
          const languageItem = Array.isArray(items) ? items.find(i => i && i.key === languageKey) : null
          const languageName = languageItem ? languageItem.name : 'Unknown'
          languageDistribution[languageName] = (languageDistribution[languageName] || 0) + 1
        } else {
          languageDistribution['Unknown'] = (languageDistribution['Unknown'] || 0) + 1
        }
        
        // Count by freshness
        const freshness = box.freshness || 0
        if (freshness > 0.5) {
          freshnessDistribution['High (>0.5)']++
        } else if (freshness >= 0.2) {
          freshnessDistribution['Medium (0.2-0.5)']++
        } else {
          freshnessDistribution['Low (<0.2)']++
        }
      })
    }
    
    // Calculate percentages
    const priorityPercentages = {}
    Object.keys(priorityDistribution).forEach(key => {
      priorityPercentages[key] = totalBoxes > 0 ? ((priorityDistribution[key] / totalBoxes) * 100).toFixed(1) : 0
    })
    
    // Due date percentage only for relevant stages (Proposal Sent, Nurtering, Negotiating, Closing)
    const dueDatePercentage = relevantStageBoxes > 0 ? ((boxesWithDueDate / relevantStageBoxes) * 100).toFixed(1) : 0
    
    return c.json({
      totalBoxes,
      stageDistribution,
      originDistribution,
      priorityDistribution,
      priorityPercentages,
      countryDistribution,
      languageDistribution,
      freshnessDistribution,
      relevantStageBoxes,
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
        
        // Get country
        let country = 'Unknown'
        if (countryField && box.fields && box.fields[countryField.key]) {
          const countryKey = box.fields[countryField.key]
          const items = countryField.dropdownSettings?.items
          const countryItem = Array.isArray(items) ? items.find(i => i && i.key === countryKey) : null
          country = countryItem ? countryItem.name : 'Unknown'
        }
        
        // Get language
        let language = 'Unknown'
        if (languageField && box.fields && box.fields[languageField.key]) {
          const languageKey = box.fields[languageField.key]
          const items = languageField.dropdownSettings?.items
          const languageItem = Array.isArray(items) ? items.find(i => i && i.key === languageKey) : null
          language = languageItem ? languageItem.name : 'Unknown'
        }
        
        // Get freshness
        const freshness = box.freshness || 0
        
        return {
          name: box.name || 'Unnamed',
          key: box.boxKey,
          stage: stage ? stage.name : 'Unknown',
          priority: priority,
          dueDate: dueDate,
          country: country,
          language: language,
          freshness: freshness.toFixed(3),
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
                    Auto-refreshes every Monday at 8:00 AM | *Due dates tracked for: Proposal Sent, Nurtering, Negotiating, Closing
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
                <!-- View Tabs -->
                <div class="bg-white rounded-lg shadow mb-8">
                    <div class="border-b border-gray-200">
                        <nav class="flex -mb-px">
                            <button onclick="switchView('overview')" id="tab-overview" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-chart-line mr-2"></i>Overview
                            </button>
                            <button onclick="switchView('stage')" id="tab-stage" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-layer-group mr-2"></i>By Stage
                            </button>
                            <button onclick="switchView('priority')" id="tab-priority" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-exclamation-circle mr-2"></i>By Priority
                            </button>
                            <button onclick="switchView('country')" id="tab-country" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-globe mr-2"></i>By Country
                            </button>
                            <button onclick="switchView('language')" id="tab-language" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-language mr-2"></i>By Language
                            </button>
                            <button onclick="switchView('freshness')" id="tab-freshness" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-heartbeat mr-2"></i>By Freshness
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Overview View --><div id="view-overview" class="view-content">
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
                                <p class="text-xs text-gray-400 mt-1">Active stages only*</p>
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
                <!-- End Overview View -->

                <!-- By Stage View -->
                <div id="view-stage" class="view-content hidden">
                    <div id="stage-content"></div>
                </div>

                <!-- By Priority View -->
                <div id="view-priority" class="view-content hidden">
                    <div id="priority-content"></div>
                </div>

                <!-- By Country View -->
                <div id="view-country" class="view-content hidden">
                    <div id="country-content"></div>
                </div>

                <!-- By Language View -->
                <div id="view-language" class="view-content hidden">
                    <div id="language-content"></div>
                </div>

                <!-- By Freshness View -->
                <div id="view-freshness" class="view-content hidden">
                    <div id="freshness-content"></div>
                </div>

            </div>

            <!-- Google Sheets Integration Section -->
            <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-8 mt-8 border border-green-200">
                <div class="flex items-center mb-6">
                    <div class="bg-green-500 rounded-full p-3 mr-4">
                        <i class="fas fa-table text-white text-2xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">Google Sheets Integration</h2>
                        <p class="text-gray-600">Pull live data directly into your spreadsheets</p>
                    </div>
                </div>

                <div class="bg-white rounded-lg p-6 shadow mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                        How to Use
                    </h3>
                    <p class="text-gray-700 mb-4">
                        Use the <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">IMPORTDATA()</code> function in Google Sheets to import live data from your pipeline.
                        The data updates automatically when you refresh your sheet.
                    </p>
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p class="text-sm text-blue-800">
                            <strong>Tip:</strong> Copy the formulas below and paste them directly into your Google Sheets cells.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- General Metrics -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-chart-bar text-purple-500 mr-2"></i>
                            General Metrics
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Total Boxes</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Boxes with Due Dates</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/duedate/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By Stage -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-layer-group text-blue-500 mr-2"></i>
                            By Stage (Active Stages)
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Closing</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/stage/Closing/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Negotiating</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/stage/Negotiating/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Nurtering</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/stage/Nurtering/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Proposal Sent</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/stage/Proposal Sent/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By Priority -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
                            By Priority
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High Priority</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/priority/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium Priority</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/priority/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low Priority</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/priority/low/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By Country -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-globe text-green-500 mr-2"></i>
                            By Country
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">France</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/country/France/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">USA</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/country/USA/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Canada</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/country/Canada/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By Freshness -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-heartbeat text-pink-500 mr-2"></i>
                            By Freshness (Activity Level)
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High Activity (>0.5)</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/freshness/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium Activity (0.2-0.5)</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/freshness/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low Activity (<0.2)</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/sheets/freshness/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <div class="flex items-start">
                        <i class="fas fa-lightbulb text-yellow-600 text-lg mt-1 mr-3"></i>
                        <div>
                            <h4 class="font-semibold text-yellow-900 mb-2">Advanced Tips</h4>
                            <ul class="text-sm text-yellow-800 space-y-1">
                                <li>• The "By Stage" section shows the 4 key active stages where due dates matter</li>
                                <li>• You can also query other stages (e.g., "Contacted", "Pitched", "Scheduled", "Lead") by replacing the stage name in the URL</li>
                                <li>• Use these formulas in your weekly reports for automatic data updates</li>
                                <li>• Combine with Google Sheets charts for custom visualizations</li>
                                <li>• Data refreshes automatically when you reopen or refresh your Google Sheet</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let stageChart, priorityChart;
            let currentData = null;

            // View switching function
            function switchView(viewName) {
                // Hide all views
                document.querySelectorAll('.view-content').forEach(view => {
                    view.classList.add('hidden');
                });
                
                // Remove active class from all tabs
                document.querySelectorAll('.view-tab').forEach(tab => {
                    tab.classList.remove('active', 'border-blue-500', 'text-blue-600');
                    tab.classList.add('border-transparent', 'text-gray-500');
                });
                
                // Show selected view
                document.getElementById('view-' + viewName).classList.remove('hidden');
                
                // Add active class to selected tab
                const activeTab = document.getElementById('tab-' + viewName);
                activeTab.classList.add('active', 'border-blue-500', 'text-blue-600');
                activeTab.classList.remove('border-transparent', 'text-gray-500');
                
                // Render view-specific content
                if (currentData && viewName !== 'overview') {
                    renderView(viewName, currentData);
                }
            }

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

            // Render view-specific content
            function renderView(viewName, data) {
                const contentId = viewName + '-content';
                const contentDiv = document.getElementById(contentId);
                
                if (viewName === 'stage') {
                    contentDiv.innerHTML = renderStageView(data);
                } else if (viewName === 'priority') {
                    contentDiv.innerHTML = renderPriorityView(data);
                } else if (viewName === 'country') {
                    contentDiv.innerHTML = renderCountryView(data);
                } else if (viewName === 'language') {
                    contentDiv.innerHTML = renderLanguageView(data);
                } else if (viewName === 'freshness') {
                    contentDiv.innerHTML = renderFreshnessView(data);
                }
            }

            function renderStageView(data) {
                const stages = Object.entries(data.stageDistribution).sort((a, b) => b[1] - a[1]);
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        \${stages.map(([stage, count]) => {
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-6">
                                    <h3 class="text-lg font-semibold text-gray-800 mb-2">\${stage}</h3>
                                    <div class="flex items-end justify-between">
                                        <div>
                                            <p class="text-3xl font-bold text-blue-600">\${count}</p>
                                            <p class="text-sm text-gray-500">boxes</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-2xl font-semibold text-gray-700">\${percentage}%</p>
                                            <p class="text-xs text-gray-500">of total</p>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderPriorityView(data) {
                const priorities = [
                    { name: '1. High', key: '1. High', color: 'red' },
                    { name: '2. Medium', key: '2. Medium', color: 'yellow' },
                    { name: '3. Low', key: '3. Low', color: 'green' },
                    { name: 'No Priority', key: 'No Priority', color: 'gray' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        \${priorities.map(priority => {
                            const count = data.priorityDistribution[priority.key] || 0;
                            const percentage = data.priorityPercentages[priority.key] || '0';
                            return \`
                                <div class="bg-white rounded-lg shadow p-6">
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="text-lg font-semibold text-gray-800">\${priority.name}</h3>
                                        <span class="bg-\${priority.color}-100 text-\${priority.color}-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            \${percentage}%
                                        </span>
                                    </div>
                                    <p class="text-4xl font-bold text-\${priority.color}-600">\${count}</p>
                                    <p class="text-sm text-gray-500 mt-2">boxes in this priority</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderCountryView(data) {
                const countries = Object.entries(data.countryDistribution).sort((a, b) => b[1] - a[1]);
                return \`
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boxes</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                \${countries.map(([country, count]) => {
                                    const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                                    return \`
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <i class="fas fa-globe text-blue-500 mr-3"></i>
                                                    <span class="text-sm font-medium text-gray-900">\${country}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${count}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div class="bg-blue-600 h-2 rounded-full" style="width: \${percentage}%"></div>
                                                    </div>
                                                    <span class="text-sm text-gray-900">\${percentage}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    \`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
            }

            function renderLanguageView(data) {
                const languages = Object.entries(data.languageDistribution).sort((a, b) => b[1] - a[1]);
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        \${languages.map(([language, count]) => {
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                        <i class="fas fa-language text-purple-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">\${language}</h3>
                                    <p class="text-4xl font-bold text-purple-600 mb-1">\${count}</p>
                                    <p class="text-sm text-gray-500">\${percentage}% of total</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderFreshnessView(data) {
                const freshness = [
                    { name: 'High Activity', key: 'High (>0.5)', desc: 'Very recent interactions', color: 'green', icon: 'fa-fire' },
                    { name: 'Medium Activity', key: 'Medium (0.2-0.5)', desc: 'Moderate engagement', color: 'yellow', icon: 'fa-heartbeat' },
                    { name: 'Low Activity', key: 'Low (<0.2)', desc: 'Needs attention', color: 'red', icon: 'fa-clock' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        \${freshness.map(item => {
                            const count = data.freshnessDistribution[item.key] || 0;
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-6">
                                    <div class="flex items-center mb-4">
                                        <div class="bg-\${item.color}-100 rounded-full p-3 mr-4">
                                            <i class="fas \${item.icon} text-\${item.color}-600 text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-semibold text-gray-800">\${item.name}</h3>
                                            <p class="text-xs text-gray-500">\${item.desc}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-end justify-between">
                                        <div>
                                            <p class="text-3xl font-bold text-\${item.color}-600">\${count}</p>
                                            <p class="text-sm text-gray-500">boxes</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-xl font-semibold text-gray-700">\${percentage}%</p>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle text-blue-600 text-lg mt-1 mr-3"></i>
                            <div>
                                <h4 class="font-semibold text-blue-900 mb-1">About Freshness Score</h4>
                                <p class="text-sm text-blue-800">
                                    Freshness indicates how recently a box has been updated or interacted with. 
                                    Higher scores mean more recent activity. Use this to identify boxes that may need follow-up.
                                </p>
                            </div>
                        </div>
                    </div>
                \`;
            }

            async function loadDashboard() {
                try {
                    const response = await fetch('/api/analytics');
                    if (!response.ok) throw new Error('Failed to fetch data');
                    
                    const data = await response.json();
                    currentData = data; // Store for view switching
                    
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
