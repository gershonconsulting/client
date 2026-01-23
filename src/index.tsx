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
const STREAK_API_BASE = 'https://www.streak.com/api/v1'

// Multi-Company Pipeline Configuration
const COMPANIES = {
  'mabsilico': {
    name: 'MabSilico',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
    networkSheetGid: '910674612'
  },
  'finance-montreal': {
    name: 'Finance Montreal (Steve)',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw'
  },
  'apm-music': {
    name: 'APM Music',
    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM'
  },
  'ducrocq': {
    name: 'Ducrocq',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww'
  },
  'milvue': {
    name: 'Milvue',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgMX-7baZCgw'
  },
  'seekyo': {
    name: 'Seekyo Therapeutics',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww'
  },
  'altavia': {
    name: 'Altavia',
    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM'
  },
  'valos': {
    name: 'Valos',
    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM'
  },
  'dab-embedded': {
    name: 'DAB-Embedded',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww'
  },
  'finance-montreal-noza': {
    name: 'Finance Montreal (Noza)',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw'
  }
}

// Default pipeline for backward compatibility
const PIPELINE_KEY = COMPANIES['mabsilico'].pipelineKey
const PIPELINE_NAME = COMPANIES['mabsilico'].name
const FIT_FIELD = 'Fit'
const INTEREST_FIELD = 'Interest'

// Google Sheets configuration
const GOOGLE_SHEET_ID = '1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw'
const GOOGLE_SHEET_BASE_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`

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

// Helper function to fetch and parse Network data from Google Sheets
async function fetchNetworkData(gid: string) {
  try {
    const url = `${GOOGLE_SHEET_BASE_URL}&gid=${gid}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Google Sheets error: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    const lines = csvText.split('\n').filter(line => line.trim())
    
    // Parse CSV (skip header)
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      const cols = line.split(',')
      
      // Extract data: W, From, To, Invitations, Messages, Inmails, Follow ups, Acceptance, Opportunities
      if (cols.length >= 9 && cols[3] && cols[3].trim()) {
        const invitations = parseInt(cols[3]) || 0
        const messages = parseInt(cols[4]) || 0
        const acceptance = cols[7] ? cols[7].replace('%', '').trim() : '0'
        const acceptanceRate = parseFloat(acceptance) || 0
        
        data.push({
          week: cols[0],
          from: cols[1],
          to: cols[2],
          invitations,
          messages,
          acceptance: acceptanceRate,
          opportunities: parseInt(cols[8]) || 0
        })
      }
    }
    
    // Calculate metrics
    const totalInvitations = data.reduce((sum, row) => sum + row.invitations, 0)
    
    // Calculate total accepted - the acceptance rate represents messages/invitations ratio
    // So if acceptance is 75%, it means 75 messages were received from 100 invitations
    // We want to calculate actual accepted connections, not messages
    // For simplicity, we'll use the acceptance rate directly as the percentage of accepted invitations
    const totalAccepted = data.reduce((sum, row) => {
      // Cap acceptance at 100% for calculation purposes
      const cappedRate = Math.min(row.acceptance, 100)
      return sum + Math.round(row.invitations * cappedRate / 100)
    }, 0)
    
    // Calculate average acceptance rate, capping individual values at 100%
    const validRates = data.map(row => Math.min(row.acceptance, 100))
    const avgAcceptanceRate = validRates.length > 0 
      ? validRates.reduce((sum, rate) => sum + rate, 0) / validRates.length 
      : 0
    
    // Network objective is 20% acceptance rate
    const networkObjective = 20
    const objectiveAchievement = avgAcceptanceRate > 0 ? (avgAcceptanceRate / networkObjective) * 100 : 0
    
    // Get recent data (last 4 weeks)
    const recentData = data.slice(-4)
    const thisWeekData = data[data.length - 1] || { invitations: 0, acceptance: 0 }
    const lastWeekData = data[data.length - 2] || { invitations: 0, acceptance: 0 }
    
    return {
      totalInvitations,
      totalAccepted,
      avgAcceptanceRate: Math.round(avgAcceptanceRate * 10) / 10, // Round to 1 decimal
      networkObjective,
      objectiveAchievement: Math.round(objectiveAchievement * 10) / 10,
      thisWeek: {
        invitations: thisWeekData.invitations,
        acceptance: Math.min(thisWeekData.acceptance, 100) // Cap at 100%
      },
      lastWeek: {
        invitations: lastWeekData.invitations,
        acceptance: Math.min(lastWeekData.acceptance, 100) // Cap at 100%
      },
      recentWeeks: recentData.map(week => ({
        ...week,
        acceptance: Math.min(week.acceptance, 100) // Cap display at 100%
      })),
      allData: data
    }
  } catch (error) {
    console.error('Error fetching network data:', error)
    return {
      totalInvitations: 0,
      totalAccepted: 0,
      avgAcceptanceRate: 0,
      thisWeek: { invitations: 0, acceptance: 0 },
      lastWeek: { invitations: 0, acceptance: 0 },
      recentWeeks: [],
      allData: []
    }
  }
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

// Get count by FIT level
app.get('/api/sheets/fit/:fitLevel/count', async (c) => {
  try {
    const fitLevel = c.req.param('fitLevel')
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const fitField = fields.find(f => f && f.name === FIT_FIELD)
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      if (!fitField || !box.fields || !box.fields[fitField.key]) {
        return fitLevel.toLowerCase() === 'not set'
      }
      const fitKey = box.fields[fitField.key]
      const items = fitField.dropdownSettings?.items
      const fitItem = Array.isArray(items) ? items.find(i => i && i.key === fitKey) : null
      const fit = fitItem ? fitItem.name : 'Not Set'
      return fit.toLowerCase() === fitLevel.toLowerCase()
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get count by INTEREST level
app.get('/api/sheets/interest/:interestLevel/count', async (c) => {
  try {
    const interestLevel = c.req.param('interestLevel')
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${PIPELINE_KEY}`),
      callStreakAPI(`/pipelines/${PIPELINE_KEY}/boxes`)
    ])
    
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const interestField = fields.find(f => f && f.name === INTEREST_FIELD)
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      if (!interestField || !box.fields || !box.fields[interestField.key]) {
        return interestLevel.toLowerCase() === 'not set'
      }
      const interestKey = box.fields[interestField.key]
      const items = interestField.dropdownSettings?.items
      const interestItem = Array.isArray(items) ? items.find(i => i && i.key === interestKey) : null
      const interest = interestItem ? interestItem.name : 'Not Set'
      return interest.toLowerCase() === interestLevel.toLowerCase()
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// List all available companies
app.get('/api/companies', async (c) => {
  const companiesList = Object.keys(COMPANIES).map(key => ({
    key: key,
    name: COMPANIES[key].name,
    url: COMPANIES[key].url
  }))
  return c.json({ companies: companiesList, count: companiesList.length })
})

// Get total leads for a specific company (case-insensitive)
app.get('/api/sheets/:companyName/total', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = COMPANIES[companyName]
    
    if (!company) {
      return c.text('COMPANY_NOT_FOUND')
    }
    
    const boxes = await callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    const count = Array.isArray(boxes) ? boxes.length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get leads created in a specific month for a company (format: YYYY-MM)
app.get('/api/sheets/:companyName/month/:yearMonth/count', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const yearMonth = c.req.param('yearMonth') // Format: YYYY-MM
    const company = COMPANIES[companyName]
    
    if (!company) {
      return c.text('COMPANY_NOT_FOUND')
    }
    
    const boxes = await callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    const [year, month] = yearMonth.split('-').map(Number)
    
    const count = Array.isArray(boxes) ? boxes.filter(box => {
      const createdDate = new Date(box.creationTimestamp)
      return createdDate.getFullYear() === year && (createdDate.getMonth() + 1) === month
    }).length : 0
    
    return c.text(count.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get leads count for the past week for a company
app.get('/api/sheets/:companyName/week/count', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = COMPANIES[companyName]
    
    if (!company) {
      return c.text('ERROR')
    }
    
    const boxes = await callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    
    if (!Array.isArray(boxes)) {
      return c.text('0')
    }
    
    // Calculate timestamp for 7 days ago
    const now = Date.now()
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000)
    
    // Count boxes created in the past 7 days
    const weekCount = boxes.filter(box => {
      const creationTime = box.creationTimestamp || 0
      return creationTime >= oneWeekAgo
    }).length
    
    return c.text(weekCount.toString())
  } catch (error) {
    return c.text('ERROR')
  }
})

// Get campaign duration in months for a company
app.get('/api/sheets/:companyName/duration/total', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = COMPANIES[companyName]
    
    if (!company) {
      return c.text('0')
    }
    
    const boxes = await callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    
    if (!Array.isArray(boxes) || boxes.length === 0) {
      return c.text('0')
    }
    
    // Find the earliest creation timestamp
    const timestamps = boxes.map(box => box.creationTimestamp).filter(t => t)
    
    if (timestamps.length === 0) {
      return c.text('0')
    }
    
    const earliestTimestamp = Math.min(...timestamps)
    const firstLeadDate = new Date(earliestTimestamp)
    const now = new Date()
    
    // Calculate months between first lead and now
    const yearsDiff = now.getFullYear() - firstLeadDate.getFullYear()
    const monthsDiff = now.getMonth() - firstLeadDate.getMonth()
    const campaignDurationMonths = (yearsDiff * 12) + monthsDiff + 1 // +1 to include current month
    
    return c.text(campaignDurationMonths.toString())
  } catch (error) {
    return c.text('0')
  }
})

// Get monthly lead statistics for a company (last 12 months)
app.get('/api/sheets/:companyName/monthly-stats', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = COMPANIES[companyName]
    
    if (!company) {
      return c.json({ error: 'Company not found' }, 404)
    }
    
    const boxes = await callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    const companyBoxes = Array.isArray(boxes) ? boxes : []
    
    // Calculate monthly stats for last 12 months
    const now = new Date()
    const monthlyStats = []
    
    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const year = targetDate.getFullYear()
      const month = targetDate.getMonth() + 1
      
      const count = companyBoxes.filter(box => {
        const createdDate = new Date(box.creationTimestamp)
        return createdDate.getFullYear() === year && (createdDate.getMonth() + 1) === month
      }).length
      
      const percentage = ((count / 10) * 100).toFixed(1)
      
      monthlyStats.push({
        month: `${year}-${String(month).padStart(2, '0')}`,
        count: count,
        objective: 10,
        percentage: parseFloat(percentage)
      })
    }
    
    // Calculate average
    const totalLeads = monthlyStats.reduce((sum, stat) => sum + stat.count, 0)
    const average = (totalLeads / 12).toFixed(1)
    const averagePercentage = ((parseFloat(average) / 10) * 100).toFixed(1)
    
    return c.json({
      company: company.name,
      companyKey: companyName,
      objective: 10,
      monthlyStats: monthlyStats,
      summary: {
        totalLeads: totalLeads,
        average: parseFloat(average),
        averagePercentage: parseFloat(averagePercentage)
      }
    })
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

// Get analytics summary
app.get('/api/analytics', async (c) => {
  try {
    // Get company from query parameter or default to MabSilico
    const companyKey = c.req.query('company') || 'mabsilico'
    const company = COMPANIES[companyKey]
    
    if (!company) {
      return c.json({ error: 'Invalid company key' }, 400)
    }
    
    const pipelineKey = company.pipelineKey
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${pipelineKey}`),
      callStreakAPI(`/pipelines/${pipelineKey}/boxes`)
    ])
    
    // Calculate analytics
    const totalBoxes = Array.isArray(boxes) ? boxes.length : 0
    const stageDistribution = {}
    const originDistribution = {}
    const fitDistribution = {}
    const interestDistribution = {}
    const countryDistribution = {}
    const languageDistribution = {}
    const freshnessDistribution = { 'High (>0.5)': 0, 'Medium (0.2-0.5)': 0, 'Low (<0.2)': 0 }

    
    // Find stage and field keys
    const stageMap = pipeline.stageOrder || []
    const stages = Array.isArray(stageMap) ? stageMap.map(key => ({
      key,
      name: pipeline.stages?.[key]?.name || 'Unknown'
    })) : []
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const originField = fields.find(f => f && f.name === 'Origin')
    const fitField = fields.find(f => f && f.name === FIT_FIELD)
    const interestField = fields.find(f => f && f.name === INTEREST_FIELD)
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
        
        // Count by FIT
        if (fitField && box.fields && box.fields[fitField.key]) {
          const fitKey = box.fields[fitField.key]
          const items = fitField.dropdownSettings?.items
          const fitItem = Array.isArray(items) ? items.find(i => i && i.key === fitKey) : null
          const fitName = fitItem ? fitItem.name : 'Not Set'
          fitDistribution[fitName] = (fitDistribution[fitName] || 0) + 1
        } else {
          fitDistribution['Not Set'] = (fitDistribution['Not Set'] || 0) + 1
        }
        
        // Count by INTEREST
        if (interestField && box.fields && box.fields[interestField.key]) {
          const interestKey = box.fields[interestField.key]
          const items = interestField.dropdownSettings?.items
          const interestItem = Array.isArray(items) ? items.find(i => i && i.key === interestKey) : null
          const interestName = interestItem ? interestItem.name : 'Not Set'
          interestDistribution[interestName] = (interestDistribution[interestName] || 0) + 1
        } else {
          interestDistribution['Not Set'] = (interestDistribution['Not Set'] || 0) + 1
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
    const fitPercentages = {}
    Object.keys(fitDistribution).forEach(key => {
      fitPercentages[key] = totalBoxes > 0 ? ((fitDistribution[key] / totalBoxes) * 100).toFixed(1) : 0
    })
    
    const interestPercentages = {}
    Object.keys(interestDistribution).forEach(key => {
      interestPercentages[key] = totalBoxes > 0 ? ((interestDistribution[key] / totalBoxes) * 100).toFixed(1) : 0
    })
    
    // Calculate monthly lead tracking (last 12 months)
    const now = new Date()
    const monthlyLeads = []
    const leadObjective = 10
    
    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const year = targetDate.getFullYear()
      const month = targetDate.getMonth() + 1
      
      const count = Array.isArray(boxes) ? boxes.filter(box => {
        const createdDate = new Date(box.creationTimestamp)
        return createdDate.getFullYear() === year && (createdDate.getMonth() + 1) === month
      }).length : 0
      
      const percentage = ((count / leadObjective) * 100).toFixed(1)
      
      monthlyLeads.push({
        month: `${year}-${String(month).padStart(2, '0')}`,
        monthName: targetDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
        count: count,
        objective: leadObjective,
        percentage: parseFloat(percentage),
        status: count >= leadObjective ? 'achieved' : 'pending'
      })
    }
    
    // Calculate average
    const totalMonthlyLeads = monthlyLeads.reduce((sum, m) => sum + m.count, 0)
    const averageLeadsPerMonth = (totalMonthlyLeads / 12).toFixed(1)
    const averagePercentage = ((parseFloat(averageLeadsPerMonth) / leadObjective) * 100).toFixed(1)
    
    // Calculate campaign duration (from first lead to now)
    let campaignDurationMonths = 0
    let firstLeadDate = null
    
    if (Array.isArray(boxes) && boxes.length > 0) {
      // Find the earliest lead creation date
      const timestamps = boxes.map(box => box.creationTimestamp).filter(t => t)
      if (timestamps.length > 0) {
        const earliestTimestamp = Math.min(...timestamps)
        firstLeadDate = new Date(earliestTimestamp)
        
        // Calculate months between first lead and now
        const yearsDiff = now.getFullYear() - firstLeadDate.getFullYear()
        const monthsDiff = now.getMonth() - firstLeadDate.getMonth()
        campaignDurationMonths = (yearsDiff * 12) + monthsDiff + 1 // +1 to include current month
      }
    }
    
    // Fetch network data if available for this company
    let networkData = null
    if (company.networkSheetGid) {
      networkData = await fetchNetworkData(company.networkSheetGid)
    }
    
    return c.json({
      company: company.name,
      companyKey: companyKey,
      totalBoxes,
      campaignDurationMonths,
      firstLeadDate: firstLeadDate ? firstLeadDate.toISOString() : null,
      networkData,
      stageDistribution,
      originDistribution,
      fitDistribution,
      fitPercentages,
      interestDistribution,
      interestPercentages,
      countryDistribution,
      languageDistribution,
      freshnessDistribution,
      monthlyLeads: monthlyLeads,
      leadObjective: leadObjective,
      averageLeadsPerMonth: parseFloat(averageLeadsPerMonth),
      averagePercentage: parseFloat(averagePercentage),
      recentBoxes: Array.isArray(boxes) ? boxes.filter(box => {
        // Filter for High FIT and High INTEREST
        const hasFit = fitField && box.fields && box.fields[fitField.key]
        const hasInterest = interestField && box.fields && box.fields[interestField.key]
        
        let fitName = 'Not Set'
        if (hasFit) {
          const fitKey = box.fields[fitField.key]
          const items = fitField.dropdownSettings?.items
          const fitItem = Array.isArray(items) ? items.find(i => i && i.key === fitKey) : null
          fitName = fitItem ? fitItem.name : 'Not Set'
        }
        
        let interestName = 'Not Set'
        if (hasInterest) {
          const interestKey = box.fields[interestField.key]
          const items = interestField.dropdownSettings?.items
          const interestItem = Array.isArray(items) ? items.find(i => i && i.key === interestKey) : null
          interestName = interestItem ? interestItem.name : 'Not Set'
        }
        
        // Show boxes with High FIT or High INTEREST
        return fitName === 'High' || interestName === 'High'
      }).slice(0, 10).map(box => {
        const stage = stages.find(s => s && s.key === box.stageKey)
        
        // Get FIT
        let fit = 'Not Set'
        if (fitField && box.fields && box.fields[fitField.key]) {
          const fitKey = box.fields[fitField.key]
          const items = fitField.dropdownSettings?.items
          const fitItem = Array.isArray(items) ? items.find(i => i && i.key === fitKey) : null
          fit = fitItem ? fitItem.name : 'Not Set'
        }
        
        // Get INTEREST
        let interest = 'Not Set'
        if (interestField && box.fields && box.fields[interestField.key]) {
          const interestKey = box.fields[interestField.key]
          const items = interestField.dropdownSettings?.items
          const interestItem = Array.isArray(items) ? items.find(i => i && i.key === interestKey) : null
          interest = interestItem ? interestItem.name : 'Not Set'
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
          fit: fit,
          interest: interest,
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
        <title>Gershon Consulting - Multi-Company Pipeline Report</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js"></script>
        <style>
            @media print {
                .no-print { display: none !important; }
                .page-break { page-break-before: always; }
                body { margin: 0; padding: 20px; }
                table { page-break-inside: avoid; }
                .print-header { margin-bottom: 30px; }
                @page { margin: 1cm; }
            }
            .print-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .print-table th { background-color: #f3f4f6; padding: 12px 8px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
            .print-table td { padding: 10px 8px; border-bottom: 1px solid #e5e7eb; }
            .print-table tr:hover { background-color: #f9fafb; }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 mb-8 text-white">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h1 class="text-4xl font-bold mb-3">
                            <i class="fas fa-chart-line mr-3"></i>
                            Gershon Consulting - Multi-Company Report
                        </h1>
                        <!-- Company Selector -->
                        <div class="flex items-center space-x-3">
                            <label for="company-selector" class="text-blue-100 text-sm font-medium">
                                <i class="fas fa-building mr-2"></i>Select Company:
                            </label>
                            <select id="company-selector" onchange="switchCompany(this.value)" class="bg-white text-gray-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md">
                                <option value="mabsilico">MabSilico</option>
                                <option value="finance-montreal">Finance Montreal (Steve)</option>
                                <option value="finance-montreal-noza">Finance Montreal (Noza)</option>
                                <option value="apm-music">APM Music</option>
                                <option value="ducrocq">Ducrocq</option>
                                <option value="milvue">Milvue</option>
                                <option value="seekyo">Seekyo Therapeutics</option>
                                <option value="altavia">Altavia</option>
                                <option value="valos">Valos</option>
                                <option value="dab-embedded">DAB-Embedded</option>
                            </select>
                            <button onclick="refreshDashboard()" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-sync-alt mr-2"></i>Refresh
                            </button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-blue-100 text-sm mb-2">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Last Updated: <span id="last-updated" class="font-semibold">Loading...</span>
                        </p>
                        <p class="text-blue-200 text-xs">
                            <i class="fas fa-calendar-alt mr-1"></i>
                            Auto-refreshes every Monday at 8:00 AM
                        </p>
                    </div>
                </div>
                <div>
                    <p class="text-blue-100">Tracking 9 Company Pipelines with Streak CRM</p>
                </div>
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
                            <button onclick="switchView('promote')" id="tab-promote" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-bullhorn mr-2"></i>PROMOTE
                            </button>
                            <button onclick="switchView('network')" id="tab-network" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-users mr-2"></i>NETWORK
                            </button>
                            <button onclick="switchView('engage')" id="tab-engage" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-handshake mr-2"></i>ENGAGE
                            </button>
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- PROMOTE View (Coming Soon) -->
                <div id="view-promote" class="view-content hidden">
                    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-lg">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-bullhorn text-yellow-600 text-4xl mr-4"></i>
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">PROMOTE Section</h2>
                                <p class="text-gray-600 mt-2">Marketing campaigns and promotional activities coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NETWORK View -->
                <div id="view-network" class="view-content hidden">
                    <div id="network-content">
                        <!-- Network content will be populated by JavaScript -->
                    </div>
                </div>

                <!-- ENGAGE View (formerly Overview) --><div id="view-engage" class="view-content">
                <!-- Campaign Performance Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Total Leads Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Total Leads</p>
                                <p id="total-boxes" class="text-3xl font-bold text-gray-800 mt-1">0</p>
                            </div>
                            <div class="bg-blue-100 rounded-full p-3">
                                <i class="fas fa-users text-blue-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Campaign Duration Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Campaign Duration</p>
                                <p id="campaign-months" class="text-3xl font-bold text-indigo-600 mt-1">0</p>
                                <p class="text-xs text-gray-500 mt-1">months running</p>
                            </div>
                            <div class="bg-indigo-100 rounded-full p-3">
                                <i class="fas fa-calendar-alt text-indigo-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Average Leads per Month Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Avg Leads/Month</p>
                                <p id="avg-leads" class="text-3xl font-bold text-green-600 mt-1">0.0</p>
                                <p class="text-xs text-gray-500 mt-1">new leads/month</p>
                            </div>
                            <div class="bg-green-100 rounded-full p-3">
                                <i class="fas fa-chart-line text-green-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Objective Achievement Card -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm font-medium">Objective Achievement</p>
                                <p id="objective-percentage" class="text-3xl font-bold text-purple-600 mt-1">0%</p>
                                <p class="text-xs text-gray-500 mt-1">of 10 leads/month</p>
                            </div>
                            <div id="objective-icon" class="bg-purple-100 rounded-full p-3">
                                <i class="fas fa-bullseye text-purple-600 text-2xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                            By Stage
                        </h3>
                        <canvas id="stageChart"></canvas>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar mr-2 text-red-600"></i>
                            By FIT
                        </h3>
                        <canvas id="fitChart"></canvas>
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
                        <i class="fas fa-exclamation-circle mr-2 text-red-600"></i>
                        High FIT/INTEREST Opportunities
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">FIT</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">INTEREST</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody id="recent-boxes" class="bg-white divide-y divide-gray-200"></tbody>
                        </table>
                    </div>
                </div>
                </div>
                <!-- End ENGAGE View -->

                <!-- Print Report View -->
                <div id="view-print" class="view-content hidden">
                    <div class="bg-white rounded-lg shadow p-8">
                        <div class="flex justify-between items-center mb-6 no-print">
                            <h2 class="text-2xl font-bold text-gray-800">
                                <i class="fas fa-file-alt mr-2 text-blue-600"></i>
                                Complete Pipeline Report
                            </h2>
                            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow flex items-center">
                                <i class="fas fa-print mr-2"></i>
                                Print Report
                            </button>
                        </div>

                        <!-- Print Header -->
                        <div class="print-header mb-8 pb-4 border-b-2 border-gray-200">
                            <h1 id="print-company-name" class="text-3xl font-bold text-gray-900 mb-2">Company Pipeline Report</h1>
                            <p class="text-gray-600">Generated on <span id="print-date"></span></p>
                        </div>

                        <!-- Campaign Summary Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                                Campaign Performance Summary
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Total Leads</p>
                                    <p id="print-total-leads" class="text-2xl font-bold text-gray-900 mt-1">0</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Campaign Duration</p>
                                    <p id="print-duration" class="text-2xl font-bold text-indigo-600 mt-1">0 months</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Avg Leads/Month</p>
                                    <p id="print-avg-leads" class="text-2xl font-bold text-green-600 mt-1">0.0</p>
                                </div>
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <p class="text-gray-600 text-sm font-medium">Objective Achievement</p>
                                    <p id="print-achievement" class="text-2xl font-bold text-purple-600 mt-1">0%</p>
                                </div>
                            </div>
                        </div>

                        <!-- Stage Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-layer-group mr-2 text-blue-600"></i>
                                Lead Distribution by Stage
                            </h3>
                            <div id="print-stage-table"></div>
                        </div>

                        <!-- FIT Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-check-circle mr-2 text-green-600"></i>
                                FIT Distribution
                            </h3>
                            <div id="print-fit-table"></div>
                        </div>

                        <!-- INTEREST Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-star mr-2 text-purple-600"></i>
                                INTEREST Distribution
                            </h3>
                            <div id="print-interest-table"></div>
                        </div>

                        <!-- Country Distribution Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-globe mr-2 text-blue-600"></i>
                                Geographic Distribution (Top 10)
                            </h3>
                            <div id="print-country-table"></div>
                        </div>

                        <!-- Monthly Performance Section -->
                        <div class="mb-8 page-break">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-alt mr-2 text-indigo-600"></i>
                                Monthly Performance (Last 12 Months)
                            </h3>
                            <div id="print-monthly-table"></div>
                        </div>

                        <!-- High Value Opportunities Section -->
                        <div class="mb-8">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-trophy mr-2 text-yellow-600"></i>
                                High Value Opportunities (Top 20)
                            </h3>
                            <div id="print-opportunities-table"></div>
                        </div>
                    </div>
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
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/total")
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
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/stage/Closing/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Negotiating</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/stage/Negotiating/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Nurtering</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/stage/Nurtering/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Proposal Sent</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/stage/Proposal Sent/count")
                                </code>
                            </div>
                        </div>
                    </div>

                    <!-- By FIT -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            By FIT
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/fit/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/fit/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/fit/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <!-- By INTEREST -->
                    <div class="bg-white rounded-lg p-6 shadow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-star text-purple-500 mr-2"></i>
                            By INTEREST
                        </h3>
                        <div class="space-y-3">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">High INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/interest/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/interest/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/interest/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Company-Specific Tracking (Dynamic) -->
                    <div class="bg-white rounded-lg p-6 shadow col-span-1 lg:col-span-2">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-building text-indigo-500 mr-2"></i>
                            <span id="sheets-company-title">Company Lead Tracking (10 Leads/Month Objective)</span>
                        </h3>
                        
                        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 rounded">
                            <p class="text-sm text-indigo-800">
                                <strong>Current Company:</strong> <span id="sheets-company-name" class="font-semibold"></span>
                            </p>
                            <p class="text-sm text-indigo-700 mt-1">
                                These formulas are specific to the currently selected company. Switch companies to see different formulas.
                            </p>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Total Leads Formula:</h4>
                        <div class="border-b pb-4 mb-4">
                            <p class="text-sm font-medium text-gray-700 mb-2">Get total number of leads for <span id="sheets-total-company"></span></p>
                            <code id="sheets-total-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                =IMPORTDATA("https://gershonscore.com/api/sheets/mabsilico/total")
                            </code>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Time-Based Tracking Formulas:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">📅 Campaign Duration</p>
                                <code id="sheets-duration-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/mabsilico/duration/total")
                                </code>
                                <p class="text-xs text-gray-500 mt-1">Returns months</p>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">🔥 Past Week</p>
                                <code id="sheets-week-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/mabsilico/week/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">January 2026</p>
                                <code id="sheets-jan-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/mabsilico/month/2026-01/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">December 2025</p>
                                <code id="sheets-dec-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://gershonscore.com/api/sheets/mabsilico/month/2025-12/count")
                                </code>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h4 class="text-sm font-semibold text-blue-900 mb-2">📋 Formula Patterns:</h4>
                            <div class="space-y-2 text-xs text-blue-800">
                                <p>• <strong>Total Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-1">COMPANY</span>/total</code></p>
                                <p>• <strong>Campaign Duration:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-4">COMPANY</span>/duration/total</code> (months)</p>
                                <p>• <strong>Weekly Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-2">COMPANY</span>/week/count</code></p>
                                <p>• <strong>Monthly Leads:</strong> <code class="bg-white px-2 py-1 rounded">/api/sheets/<span id="pattern-company-3">COMPANY</span>/month/YYYY-MM/count</code></p>
                                <p>• <strong>Achievement %:</strong> <code class="bg-white px-2 py-1 rounded">=IMPORTDATA(url)/10*100</code></p>
                            </div>
                        </div>
                        
                        <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                            <p class="text-xs text-green-800">
                                <strong>💡 Tip:</strong> Replace YYYY-MM with any month (e.g., 2026-02, 2025-11) to track different periods.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <div class="flex items-start">
                        <i class="fas fa-lightbulb text-yellow-600 text-lg mt-1 mr-3"></i>
                        <div>
                            <h4 class="font-semibold text-yellow-900 mb-2">Advanced Tips</h4>
                            <ul class="text-sm text-yellow-800 space-y-1">
                                <li>• <strong>Company Tracking:</strong> Use /api/sheets/COMPANY_NAME/total for any company</li>
                                <li>• <strong>Monthly Tracking:</strong> Use /api/sheets/COMPANY_NAME/month/YYYY-MM/count</li>
                                <li>• <strong>Objective:</strong> Track progress toward 10 leads/month goal per company</li>
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
            // Register Chart.js datalabels plugin
            Chart.register(ChartDataLabels);
            
            let stageChart, fitChart;
            let currentData = null;
            let currentCompany = 'mabsilico'; // Default company

            // Company configuration
            const COMPANIES = {
                'mabsilico': {
                    name: 'MabSilico',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw'
                },
                'finance-montreal': {
                    name: 'Finance Montreal (Steve)',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgI7YkpykCQw'
                },
                'finance-montreal-noza': {
                    name: 'Finance Montreal (Noza)',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWVvvDkCgw'
                },
                'apm-music': {
                    name: 'APM Music',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgIClnNb8gwsM'
                },
                'ducrocq': {
                    name: 'Ducrocq',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgNaSl4OGCww'
                },
                'milvue': {
                    name: 'Milvue',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEhhXb3JrZmxvdxiAgMX-7baZCgw'
                },
                'seekyo': {
                    name: 'Seekyo Therapeutics',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgLnYo_uUCww'
                },
                'altavia': {
                    name: 'Altavia',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICFz_elmwgM'
                },
                'valos': {
                    name: 'Valos',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyRAsSDE9yZ2FuaXphdGlvbiIdYWluYS5hbmRyaWFtYW5nYXNvbkBnbWFpbC5jb20MCxIIV29ya2Zsb3cYgICF5ei7lgkM'
                },
                'dab-embedded': {
                    name: 'DAB-Embedded',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgKWyqIboCww'
                }
            };

            // Switch to a different company
            function switchCompany(companyKey) {
                currentCompany = companyKey;
                console.log('Switching to company:', COMPANIES[companyKey].name);
                
                // Show loading state
                document.getElementById('dashboard').classList.add('hidden');
                document.getElementById('loading').classList.remove('hidden');
                document.getElementById('error').classList.add('hidden');
                
                // Update Google Sheets formulas for this company
                updateSheetsFormulas();
                
                // Fetch new company data
                fetchCompanyData(companyKey);
            }

            // Refresh current dashboard
            function refreshDashboard() {
                switchCompany(currentCompany);
            }

            // Fetch data for a specific company
            async function fetchCompanyData(companyKey) {
                try {
                    const company = COMPANIES[companyKey];
                    const response = await fetch(\`/api/analytics?company=\${companyKey}\`);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch company data');
                    }
                    
                    const data = await response.json();
                    currentData = data;
                    
                    // Update page title with company name
                    document.querySelector('h1').innerHTML = \`
                        <i class="fas fa-chart-line mr-3"></i>
                        \${company.name} - Pipeline Report
                    \`;
                    
                    // Hide loading, show dashboard
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('dashboard').classList.remove('hidden');
                    updateTimestamp();
                    
                    // Update summary cards and charts
                    updateDashboard(data);
                    
                } catch (error) {
                    console.error('Error fetching company data:', error);
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('error').classList.remove('hidden');
                    document.getElementById('error-message').textContent = error.message;
                }
            }

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
                if (currentData) {
                    if (viewName === 'print') {
                        renderPrintView(currentData);
                    } else if (viewName === 'network' || viewName === 'stage' || viewName === 'fit' || viewName === 'interest') {
                        renderView(viewName, currentData);
                    }
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

            // Render print view with all data
            function renderPrintView(data) {
                // Set company name and date
                const companyName = COMPANIES[currentCompany]?.name || 'Company';
                document.getElementById('print-company-name').textContent = companyName + ' - Pipeline Report';
                document.getElementById('print-date').textContent = new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                });
                
                // Campaign summary
                document.getElementById('print-total-leads').textContent = data.totalBoxes || '0';
                document.getElementById('print-duration').textContent = (data.campaignDurationMonths || 0) + ' months';
                document.getElementById('print-avg-leads').textContent = data.averageLeadsPerMonth || '0.0';
                document.getElementById('print-achievement').textContent = (data.averagePercentage || 0) + '%';
                
                // Stage distribution table
                let stageHTML = '<table class="print-table"><thead><tr><th>Stage</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                const totalBoxes = data.totalBoxes || 1;
                Object.keys(data.stageDistribution || {}).sort((a, b) => (data.stageDistribution[b] || 0) - (data.stageDistribution[a] || 0)).forEach(stage => {
                    const count = data.stageDistribution[stage] || 0;
                    const pct = ((count / totalBoxes) * 100).toFixed(1);
                    stageHTML += '<tr><td>' + stage + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                stageHTML += '</tbody></table>';
                document.getElementById('print-stage-table').innerHTML = stageHTML;
                
                // FIT distribution table
                let fitHTML = '<table class="print-table"><thead><tr><th>FIT Level</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                ['High', 'Medium', 'Low', 'Not Set'].forEach(level => {
                    const count = data.fitDistribution[level] || 0;
                    const pct = data.fitPercentages[level] || 0;
                    fitHTML += '<tr><td>' + level + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                fitHTML += '</tbody></table>';
                document.getElementById('print-fit-table').innerHTML = fitHTML;
                
                // INTEREST distribution table
                let interestHTML = '<table class="print-table"><thead><tr><th>INTEREST Level</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                ['High', 'Medium', 'Low', 'Not Set'].forEach(level => {
                    const count = data.interestDistribution[level] || 0;
                    const pct = data.interestPercentages[level] || 0;
                    interestHTML += '<tr><td>' + level + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                interestHTML += '</tbody></table>';
                document.getElementById('print-interest-table').innerHTML = interestHTML;
                
                // Country distribution table (top 10)
                let countryHTML = '<table class="print-table"><thead><tr><th>Country</th><th>Count</th><th>Percentage</th></tr></thead><tbody>';
                const countries = Object.keys(data.countryDistribution || {})
                    .sort((a, b) => (data.countryDistribution[b] || 0) - (data.countryDistribution[a] || 0))
                    .slice(0, 10);
                countries.forEach(country => {
                    const count = data.countryDistribution[country] || 0;
                    const pct = ((count / totalBoxes) * 100).toFixed(1);
                    countryHTML += '<tr><td>' + country + '</td><td>' + count + '</td><td>' + pct + '%</td></tr>';
                });
                countryHTML += '</tbody></table>';
                document.getElementById('print-country-table').innerHTML = countryHTML;
                
                // Monthly performance table
                let monthlyHTML = '<table class="print-table"><thead><tr><th>Month</th><th>Leads</th><th>Objective</th><th>Achievement</th><th>Status</th></tr></thead><tbody>';
                (data.monthlyLeads || []).forEach(month => {
                    const status = month.count >= 10 ? '✓ Achieved' : '○ Pending';
                    monthlyHTML += '<tr><td>' + month.monthName + '</td><td>' + month.count + '</td><td>10</td><td>' + month.percentage + '%</td><td>' + status + '</td></tr>';
                });
                monthlyHTML += '</tbody></table>';
                document.getElementById('print-monthly-table').innerHTML = monthlyHTML;
                
                // High value opportunities table (top 20)
                let oppHTML = '<table class="print-table"><thead><tr><th>Name</th><th>Stage</th><th>FIT</th><th>INTEREST</th><th>Country</th></tr></thead><tbody>';
                (data.recentBoxes || []).slice(0, 20).forEach(box => {
                    oppHTML += '<tr><td>' + box.name + '</td><td>' + box.stage + '</td><td>' + (box.fit || 'N/A') + '</td><td>' + (box.interest || 'N/A') + '</td><td>' + (box.country || 'N/A') + '</td></tr>';
                });
                oppHTML += '</tbody></table>';
                document.getElementById('print-opportunities-table').innerHTML = oppHTML;
            }
            
            // Render view-specific content
            function renderView(viewName, data) {
                const contentId = viewName + '-content';
                const contentDiv = document.getElementById(contentId);
                
                if (viewName === 'stage') {
                    contentDiv.innerHTML = renderStageView(data);
                } else if (viewName === 'fit') {
                    contentDiv.innerHTML = renderFitView(data);
                } else if (viewName === 'interest') {
                    contentDiv.innerHTML = renderInterestView(data);
                } else if (viewName === 'network') {
                    contentDiv.innerHTML = renderNetworkView(data);
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
                                            <p class="text-sm text-gray-500">opportunities</p>
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

            function renderFitView(data) {
                const fitLevels = [
                    { name: 'High', key: 'High', color: 'green', icon: 'fa-check-circle' },
                    { name: 'Medium', key: 'Medium', color: 'yellow', icon: 'fa-adjust' },
                    { name: 'Low', key: 'Low', color: 'red', icon: 'fa-times-circle' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        \${fitLevels.map(fit => {
                            const count = data.fitDistribution[fit.key] || 0;
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 bg-\${fit.color}-100 rounded-full mb-4">
                                        <i class="fas \${fit.icon} text-\${fit.color}-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">\${fit.name} FIT</h3>
                                    <p class="text-5xl font-bold text-\${fit.color}-600 mb-2">\${count}</p>
                                    <p class="text-sm text-gray-500">\${percentage}% of total</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderInterestView(data) {
                const interestLevels = [
                    { name: 'High', key: 'High', color: 'purple', icon: 'fa-star' },
                    { name: 'Medium', key: 'Medium', color: 'blue', icon: 'fa-star-half-alt' },
                    { name: 'Low', key: 'Low', color: 'gray', icon: 'fa-star-o' }
                ];
                return \`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        \${interestLevels.map(interest => {
                            const count = data.interestDistribution[interest.key] || 0;
                            const percentage = ((count / data.totalBoxes) * 100).toFixed(1);
                            return \`
                                <div class="bg-white rounded-lg shadow p-8 text-center">
                                    <div class="inline-flex items-center justify-center w-16 h-16 bg-\${interest.color}-100 rounded-full mb-4">
                                        <i class="fas \${interest.icon} text-\${interest.color}-600 text-2xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800 mb-2">\${interest.name} INTEREST</h3>
                                    <p class="text-5xl font-bold text-\${interest.color}-600 mb-2">\${count}</p>
                                    <p class="text-sm text-gray-500">\${percentage}% of total</p>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                \`;
            }

            function renderNetworkView(data) {
                const network = data.networkData;
                
                if (!network || !network.allData || network.allData.length === 0) {
                    return \`
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-lg">
                            <div class="flex items-center">
                                <i class="fas fa-info-circle text-blue-600 text-4xl mr-4"></i>
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-800">Network Data Not Available</h2>
                                    <p class="text-gray-600 mt-2">LinkedIn networking data will appear here once available.</p>
                                </div>
                            </div>
                        </div>
                    \`;
                }
                
                return \`
                    <!-- Network Performance Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <!-- Average Acceptance Rate Card (Most Important) -->
                        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <p class="text-green-100 text-sm font-medium mb-1">AVERAGE ACCEPTANCE RATE</p>
                                    <p class="text-5xl font-bold">\${network.avgAcceptanceRate}%</p>
                                    <p class="text-sm text-green-100 mt-2">LinkedIn connections</p>
                                </div>
                                <div class="bg-white bg-opacity-20 rounded-full p-4">
                                    <i class="fas fa-user-check text-4xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Objective Achievement Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Objective Achievement</p>
                                    <p class="text-3xl font-bold text-purple-600 mt-1">\${network.objectiveAchievement}%</p>
                                    <p class="text-xs text-gray-500 mt-1">of \${network.networkObjective}% target</p>
                                </div>
                                <div class="bg-purple-100 rounded-full p-3">
                                    <i class="fas fa-bullseye text-purple-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Total Invitations Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Total Invitations</p>
                                    <p class="text-3xl font-bold text-blue-600 mt-1">\${network.totalInvitations}</p>
                                    <p class="text-xs text-gray-500 mt-1">sent</p>
                                </div>
                                <div class="bg-blue-100 rounded-full p-3">
                                    <i class="fas fa-paper-plane text-blue-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Total Accepted Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-500 text-sm font-medium">Accepted</p>
                                    <p class="text-3xl font-bold text-green-600 mt-1">\${network.totalAccepted}</p>
                                    <p class="text-xs text-gray-500 mt-1">connections</p>
                                </div>
                                <div class="bg-green-100 rounded-full p-3">
                                    <i class="fas fa-user-plus text-green-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Weekly Comparison -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <!-- This Week Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-day text-blue-600 mr-2"></i>
                                This Week
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Invitations Sent:</span>
                                    <span class="text-2xl font-bold text-blue-600">\${network.thisWeek.invitations}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Acceptance Rate:</span>
                                    <span class="text-2xl font-bold text-green-600">\${network.thisWeek.acceptance}%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Last Week Card -->
                        <div class="bg-white rounded-lg shadow p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-calendar-week text-indigo-600 mr-2"></i>
                                Last Week
                            </h3>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Invitations Sent:</span>
                                    <span class="text-2xl font-bold text-blue-600">\${network.lastWeek.invitations}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-600">Acceptance Rate:</span>
                                    <span class="text-2xl font-bold text-green-600">\${network.lastWeek.acceptance}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Weeks Performance -->
                    <div class="bg-white rounded-lg shadow p-6 mb-8">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">
                            <i class="fas fa-chart-line mr-2 text-purple-600"></i>
                            Recent Weeks Performance
                        </h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Week</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invitations</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Messages</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acceptance Rate</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opportunities</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    \${network.recentWeeks.map(week => {
                                        // Color based on 20% objective: green >= 20%, yellow >= 15%, red < 15%
                                        const rateColor = week.acceptance >= 20 ? 'text-green-600' : week.acceptance >= 15 ? 'text-yellow-600' : 'text-red-600';
                                        return \`
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">W\${week.week}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${week.from} - \${week.to}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.invitations}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.messages}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold \${rateColor}">\${week.acceptance}%</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${week.opportunities}</td>
                                            </tr>
                                        \`;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                \`;
            }




            async function loadDashboard() {
                // Use the new fetchCompanyData function instead
                fetchCompanyData(currentCompany);
            }
            
            // Update dashboard with new data
            function updateDashboard(data) {
                currentData = data;
                
                // Update campaign performance summary cards
                document.getElementById('total-boxes').textContent = data.totalBoxes;
                document.getElementById('campaign-months').textContent = data.campaignDurationMonths || 0;
                document.getElementById('avg-leads').textContent = data.averageLeadsPerMonth || '0.0';
                
                const objectivePercentage = data.averagePercentage || 0;
                document.getElementById('objective-percentage').textContent = objectivePercentage + '%';
                
                // Update objective icon color based on achievement
                const objectiveIcon = document.getElementById('objective-icon');
                const objectiveText = document.getElementById('objective-percentage');
                if (objectivePercentage >= 100) {
                    objectiveIcon.className = 'bg-green-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-check-circle text-green-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-green-600 mt-1';
                } else if (objectivePercentage >= 75) {
                    objectiveIcon.className = 'bg-yellow-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-yellow-600 mt-1';
                } else {
                    objectiveIcon.className = 'bg-red-100 rounded-full p-3';
                    objectiveIcon.innerHTML = '<i class="fas fa-times-circle text-red-600 text-2xl"></i>';
                    objectiveText.className = 'text-3xl font-bold text-red-600 mt-1';
                }

                    // Create stage distribution chart - ALL stages sorted by count
                    const stageEntries = Object.entries(data.stageDistribution || {}).sort((a, b) => b[1] - a[1]);
                    const stageLabels = stageEntries.map(e => e[0]);
                    const stageValues = stageEntries.map(e => e[1]);
                    
                    // Generate colors for all stages
                    const baseColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#14B8A6'];
                    const stageColors = stageLabels.map((_, i) => baseColors[i % baseColors.length]);
                    
                    const stageCtx = document.getElementById('stageChart').getContext('2d');
                    if (stageChart) stageChart.destroy();
                    stageChart = new Chart(stageCtx, {
                        type: 'bar',
                        data: {
                            labels: stageLabels,
                            datasets: [{
                                label: 'Opportunities',
                                data: stageValues,
                                backgroundColor: stageColors.slice(0, stageLabels.length),
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                borderRadius: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const total = stageValues.reduce((a, b) => a + b, 0);
                                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                                            return context.parsed.y + ' opportunities (' + percentage + '%)';
                                        }
                                    }
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: function(value, context) {
                                        const total = stageValues.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return value + '\\n(' + percentage + '%)';
                                    },
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    },
                                    color: '#1F2937'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 10,
                                        font: { size: 12 }
                                    },
                                    grid: {
                                        color: '#E5E7EB'
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: { size: 11 },
                                        maxRotation: 45,
                                        minRotation: 45
                                    },
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }
                    });

                    // Create FIT distribution chart - Low, Medium, High, Not Set
                    const fitLabels = ['Low', 'Medium', 'High', 'Not Set'];
                    const fitKeys = ['Low', 'Medium', 'High', 'Not Set'];
                    const fitValues = fitKeys.map(key => data.fitDistribution[key] || 0);
                    const totalFit = fitValues.reduce((a, b) => a + b, 0);
                    
                    const fitCtx = document.getElementById('fitChart').getContext('2d');
                    if (fitChart) fitChart.destroy();
                    fitChart = new Chart(fitCtx, {
                        type: 'bar',
                        data: {
                            labels: fitLabels,
                            datasets: [{
                                label: 'Opportunities',
                                data: fitValues,
                                backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#9CA3AF'], // Red, Orange, Green, Gray
                                borderWidth: 2,
                                borderColor: '#ffffff',
                                borderRadius: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const percentage = ((context.parsed.y / totalFit) * 100).toFixed(1);
                                            return context.parsed.y + ' opportunities (' + percentage + '%)';
                                        }
                                    }
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'top',
                                    formatter: function(value, context) {
                                        const percentage = ((value / totalFit) * 100).toFixed(1);
                                        return value + '\\n(' + percentage + '%)';
                                    },
                                    font: {
                                        weight: 'bold',
                                        size: 12
                                    },
                                    color: '#1F2937'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 10,
                                        font: { size: 12 }
                                    },
                                    grid: {
                                        color: '#E5E7EB'
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: { size: 13, weight: 'bold' }
                                    },
                                    grid: {
                                        display: false
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
                    // Show boxes with High FIT or High INTEREST
                    recentBoxes.innerHTML = data.recentBoxes.map(box => {
                        const fitColor = box.fit === 'High' ? 'bg-green-100 text-green-800' : 
                                        box.fit === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                        box.fit === 'Low' ? 'bg-red-100 text-red-800' : 
                                        'bg-gray-100 text-gray-600';
                        
                        const interestColor = box.interest === 'High' ? 'bg-purple-100 text-purple-800' : 
                                             box.interest === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                                             box.interest === 'Low' ? 'bg-gray-100 text-gray-800' : 
                                             'bg-gray-100 text-gray-600';
                        
                        return \`
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">\${box.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">\${box.stage}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 \${fitColor} rounded">\${box.fit}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span class="px-2 py-1 \${interestColor} rounded">\${box.interest}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                \${new Date(box.lastUpdated).toLocaleDateString()}
                            </td>
                        </tr>
                        \`;
                    }).join('');
            }
            
            // Update Google Sheets formulas based on current company
            function updateSheetsFormulas() {
                const companyName = COMPANIES[currentCompany].name;
                const baseUrl = window.location.origin;
                
                // Update company name displays
                document.getElementById('sheets-company-name').textContent = companyName;
                document.getElementById('sheets-company-title').textContent = companyName + ' Lead Tracking (10 Leads/Month Objective)';
                document.getElementById('sheets-total-company').textContent = companyName;
                
                // Update pattern placeholders
                document.getElementById('pattern-company-1').textContent = currentCompany;
                document.getElementById('pattern-company-2').textContent = currentCompany;
                document.getElementById('pattern-company-3').textContent = currentCompany;
                document.getElementById('pattern-company-4').textContent = currentCompany;
                
                // Update formulas
                document.getElementById('sheets-total-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/total")';
                
                document.getElementById('sheets-duration-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/duration/total")';
                
                document.getElementById('sheets-week-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/week/count")';
                    
                document.getElementById('sheets-jan-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/month/2026-01/count")';
                    
                document.getElementById('sheets-dec-formula').textContent = 
                    '=IMPORTDATA("' + baseUrl + '/api/sheets/' + currentCompany + '/month/2025-12/count")';
            }

            // Load dashboard on page load and setup auto-refresh
            updateSheetsFormulas(); // Initialize Google Sheets formulas
            loadDashboard();
            setupAutoRefresh();
        </script>
    </body>
    </html>
  `)
})

export default app
