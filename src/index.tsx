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
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw'
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
  }
}

// Default pipeline for backward compatibility
const PIPELINE_KEY = COMPANIES['mabsilico'].pipelineKey
const PIPELINE_NAME = COMPANIES['mabsilico'].name
const FIT_FIELD = 'Fit'
const INTEREST_FIELD = 'Interest'

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
    
    return c.json({
      company: company.name,
      companyKey: companyKey,
      totalBoxes,
      campaignDurationMonths,
      firstLeadDate: firstLeadDate ? firstLeadDate.toISOString() : null,
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
                            <button onclick="switchView('overview')" id="tab-overview" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-chart-line mr-2"></i>Overview
                            </button>
                            <button onclick="switchView('stage')" id="tab-stage" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-layer-group mr-2"></i>By Stage
                            </button>
                            <button onclick="switchView('fit')" id="tab-fit" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-check-circle mr-2"></i>By FIT
                            </button>
                            <button onclick="switchView('interest')" id="tab-interest" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-star mr-2"></i>By INTEREST
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
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Overview View --><div id="view-overview" class="view-content">
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
                <!-- End Overview View -->

                <!-- By Stage View -->
                <div id="view-stage" class="view-content hidden">
                    <div id="stage-content"></div>
                </div>

                <!-- By FIT View -->
                <div id="view-fit" class="view-content hidden">
                    <div id="fit-content"></div>
                </div>
                
                <!-- By INTEREST View -->
                <div id="view-interest" class="view-content hidden">
                    <div id="interest-content"></div>
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/total")
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/stage/Closing/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Negotiating</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/stage/Negotiating/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Nurtering</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/stage/Nurtering/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Proposal Sent</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/stage/Proposal Sent/count")
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/fit/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/fit/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/fit/low/count")
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/interest/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/interest/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/interest/low/count")
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/country/France/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">USA</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/country/USA/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Canada</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/country/Canada/count")
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
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/freshness/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium Activity (0.2-0.5)</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/freshness/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low Activity (<0.2)</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/freshness/low/count")
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Company-Specific Tracking -->
                    <div class="bg-white rounded-lg p-6 shadow col-span-1 lg:col-span-2">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-building text-indigo-500 mr-2"></i>
                            Multi-Company Lead Tracking (10 Leads/Month Objective)
                        </h3>
                        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 rounded">
                            <p class="text-sm text-indigo-800 mb-2">
                                <strong>9 Companies Tracked:</strong> MabSilico, Finance Montreal, APM Music, Ducrocq, Milvue, Seekyo Therapeutics, Altavia, Valos, DAB-Embedded
                            </p>
                            <p class="text-sm text-indigo-700">
                                Each company has its own Streak pipeline. Use the company key in URLs (lowercase, hyphenated).
                            </p>
                        </div>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <h4 class="text-sm font-semibold text-blue-900 mb-2">Company Keys Reference:</h4>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                <div><code class="bg-white px-2 py-1 rounded">mabsilico</code> → MabSilico</div>
                                <div><code class="bg-white px-2 py-1 rounded">finance-montreal</code> → Finance Montreal</div>
                                <div><code class="bg-white px-2 py-1 rounded">apm-music</code> → APM Music</div>
                                <div><code class="bg-white px-2 py-1 rounded">ducrocq</code> → Ducrocq</div>
                                <div><code class="bg-white px-2 py-1 rounded">milvue</code> → Milvue</div>
                                <div><code class="bg-white px-2 py-1 rounded">seekyo</code> → Seekyo Therapeutics</div>
                                <div><code class="bg-white px-2 py-1 rounded">altavia</code> → Altavia</div>
                                <div><code class="bg-white px-2 py-1 rounded">valos</code> → Valos</div>
                                <div><code class="bg-white px-2 py-1 rounded">dab-embedded</code> → DAB-Embedded</div>
                            </div>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">All Companies - Total Leads Formulas:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">MabSilico</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/mabsilico/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Finance Montreal</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/finance-montreal/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">APM Music</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/apm-music/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Ducrocq</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/ducrocq/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Milvue</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/milvue/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Seekyo Therapeutics</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/seekyo/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Altavia</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/altavia/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Valos</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/valos/total")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">DAB-Embedded</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/dab-embedded/total")
                                </code>
                            </div>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Monthly Tracking Examples:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">MabSilico - January 2026</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/mabsilico/month/2026-01/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Ducrocq - December 2025</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/ducrocq/month/2025-12/count")
                                </code>
                            </div>
                        </div>
                        <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                            <p class="text-xs text-green-800">
                                <strong>💡 Tip:</strong> To calculate % of objective: <code>=IMPORTDATA(url)/10*100</code> or use the monthly-stats endpoint for full statistics.
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
                    } else if (viewName !== 'overview') {
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

                    // Create stage distribution chart - specific stages in order
                    const stageOrder = ['Proposal Sent', 'Nurtering', 'Negotiating', 'Closing'];
                    const stageLabels = [];
                    const stageValues = [];
                    const stageColors = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6']; // Green, Orange, Red, Purple
                    
                    stageOrder.forEach(stageName => {
                        if (data.stageDistribution[stageName]) {
                            stageLabels.push(stageName);
                            stageValues.push(data.stageDistribution[stageName]);
                        }
                    });
                    
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

            // Load dashboard on page load and setup auto-refresh
            loadDashboard();
            setupAutoRefresh();
        </script>
    </body>
    </html>
  `)
})

export default app
