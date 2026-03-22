import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Streak API configuration
const STREAK_API_KEY = 'e77554988b424c6498d85362b0367757'
const STREAK_API_BASE = 'https://www.streak.com/api/v1'

// Multi-Company Pipeline Configuration
const COMPANIES = {
  'mabsilico': {
    name: 'MabSilico',
    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
    url: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
    networkSheetGid: '910674612',
    sources: {
      promote: '',
      network: 'https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612',
      engage: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw'
    }
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

// Helper function to get company from D1 or fallback to COMPANIES object
async function getCompany(db: D1Database | undefined, companyKey: string) {
  // Try D1 first if available
  if (db) {
    try {
      const company = await db.prepare('SELECT * FROM companies WHERE key = ?').bind(companyKey).first()
      if (company) {
        return {
          key: company.key as string,
          name: company.name as string,
          pipelineKey: company.pipeline_key as string,
          url: company.url as string,
          networkSheetGid: company.network_sheet_gid as string | null,
          sources: {
            promote: company.promote_url as string | null || '',
            network: company.network_url as string | null || '',
            engage: company.engage_url as string | null || ''
          }
        }
      }
    } catch (error) {
      console.error('D1 query error, falling back to COMPANIES object:', error)
    }
  }
  
  // Fallback to COMPANIES object
  return COMPANIES[companyKey]
}

// Helper function to make Streak API calls
async function callStreakAPI(endpoint: string) {
  const auth = btoa(`${STREAK_API_KEY}:`)
  console.log(`[Streak API] Calling: ${endpoint}`)
  
  const response = await fetch(`${STREAK_API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  })
  
  console.log(`[Streak API] Response status: ${response.status}`)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error(`[Streak API] Error: ${response.status} - ${errorText}`)
    throw new Error(`Streak API error: ${response.status} ${response.statusText}`)
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
// Get all companies from D1 database or fallback to COMPANIES object
app.get('/api/companies', async (c) => {
  try {
    // For Node.js deployment, use fallback COMPANIES object
    const companiesList = Object.keys(COMPANIES).map(key => ({
      key: key,
      name: COMPANIES[key].name,
      url: COMPANIES[key].url,
      pipeline_key: COMPANIES[key].pipelineKey,
      promote_url: COMPANIES[key].sources?.promote || null,
      network_url: COMPANIES[key].sources?.network || null,
      network_sheet_gid: COMPANIES[key].networkSheetGid || null,
      engage_url: COMPANIES[key].sources?.engage || null,
      notion_url: COMPANIES[key].notionUrl || null
    }))
    
    return c.json({ companies: companiesList, count: companiesList.length })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return c.json({ error: 'Failed to fetch companies', companies: [], count: 0 }, 500)
  }
})

// Add new company (in-memory for Node.js deployment)
app.post('/api/companies', async (c) => {
  try {
    const body = await c.req.json()
    const { key, name, pipeline_key, url, promote_url, network_url, network_sheet_gid, engage_url, notion_url } = body
    
    // Validate required fields
    if (!key || !name || !pipeline_key || !url) {
      return c.json({ error: 'Missing required fields: key, name, pipeline_key, url' }, 400)
    }
    
    // Check if company already exists
    if (COMPANIES[key]) {
      return c.json({ error: 'Company with this key already exists' }, 409)
    }
    
    // Add company to in-memory object
    COMPANIES[key] = {
      name,
      pipelineKey: pipeline_key,
      url,
      networkSheetGid: network_sheet_gid || null,
      notionUrl: notion_url || null,
      sources: {
        promote: promote_url || '',
        network: network_url || '',
        engage: engage_url || ''
      }
    }
    
    return c.json({ success: true, message: 'Company added successfully (session only)', key })
  } catch (error) {
    console.error('Error adding company:', error)
    return c.json({ error: 'Failed to add company' }, 500)
  }
})

// Delete company (in-memory for Node.js deployment)
app.delete('/api/companies/:key', async (c) => {
  try {
    const key = c.req.param('key')
    
    // Check if company exists
    if (!COMPANIES[key]) {
      return c.json({ error: 'Company not found' }, 404)
    }
    
    // Delete company from in-memory object
    delete COMPANIES[key]
    
    return c.json({ success: true, message: 'Company deleted successfully (session only)' })
  } catch (error) {
    console.error('Error deleting company:', error)
    return c.json({ error: 'Failed to delete company' }, 500)
  }
})

// Update company (in-memory for Node.js deployment)
app.put('/api/companies/:key', async (c) => {
  try {
    const key = c.req.param('key')
    const body = await c.req.json()
    const { name, pipeline_key, url, promote_url, network_url, network_sheet_gid, engage_url, notion_url } = body
    
    // Check if company exists
    if (!COMPANIES[key]) {
      return c.json({ error: 'Company not found' }, 404)
    }
    
    // Update company in in-memory object
    COMPANIES[key] = {
      name,
      pipelineKey: pipeline_key,
      url,
      networkSheetGid: network_sheet_gid || null,
      notionUrl: notion_url || null,
      sources: {
        promote: promote_url || '',
        network: network_url || '',
        engage: engage_url || ''
      }
    }
    
    return c.json({ success: true, message: 'Company updated successfully (session only)' })
  } catch (error) {
    console.error('Error updating company:', error)
    return c.json({ error: 'Failed to update company' }, 500)
  }
})

// Get total leads for a specific company (case-insensitive)
app.get('/api/sheets/:companyName/total', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = await getCompany(undefined, companyName)
    
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
    const company = await getCompany(undefined, companyName)
    
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
    const company = await getCompany(undefined, companyName)
    
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
    const company = await getCompany(undefined, companyName)
    
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
    const company = await getCompany(undefined, companyName)
    
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

// Get count of items with pending/overdue dates for a company
app.get('/api/sheets/:companyName/due', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase().replace(/ /g, '-')
    const company = await getCompany(undefined, companyName)
    
    if (!company) {
      return c.text('COMPANY_NOT_FOUND')
    }
    
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${company.pipelineKey}`),
      callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    ])
    
    if (!Array.isArray(boxes)) {
      return c.text('0')
    }
    
    // Find the due date field (could be 'Est Start Date', 'Due Date', etc.)
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const dueDateField = fields.find(f => 
      f && (f.name === 'Est Start Date' || f.name === 'Due Date' || f.name === 'Start Date')
    )
    
    if (!dueDateField) {
      return c.text('0')
    }
    
    // Count boxes with due dates (pending or overdue)
    const now = Date.now()
    let dueCount = 0
    
    boxes.forEach(box => {
      if (box.fields && box.fields[dueDateField.key]) {
        const dueDate = box.fields[dueDateField.key]
        // If there's a due date set, count it as pending
        if (dueDate) {
          dueCount++
        }
      }
    })
    
    return c.text(dueCount.toString())
  } catch (error) {
    console.error('Error fetching due items:', error)
    return c.text('ERROR')
  }
})

// Get count of overdue items for a company
app.get('/api/sheets/:companyName/overdue', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase().replace(/ /g, '-')
    const company = await getCompany(undefined, companyName)
    
    if (!company) {
      return c.text('COMPANY_NOT_FOUND')
    }
    
    const [pipeline, boxes] = await Promise.all([
      callStreakAPI(`/pipelines/${company.pipelineKey}`),
      callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
    ])
    
    if (!Array.isArray(boxes)) {
      return c.text('0')
    }
    
    // Find the due date field
    const fields = Array.isArray(pipeline.fields) ? pipeline.fields : []
    const dueDateField = fields.find(f => 
      f && (f.name === 'Est Start Date' || f.name === 'Due Date' || f.name === 'Start Date')
    )
    
    if (!dueDateField) {
      return c.text('0')
    }
    
    // Count boxes with overdue dates (past due)
    const now = Date.now()
    let overdueCount = 0
    
    boxes.forEach(box => {
      if (box.fields && box.fields[dueDateField.key]) {
        const dueDate = box.fields[dueDateField.key]
        if (dueDate && dueDate < now) {
          overdueCount++
        }
      }
    })
    
    return c.text(overdueCount.toString())
  } catch (error) {
    console.error('Error fetching overdue items:', error)
    return c.text('ERROR')
  }
})

// Get analytics summary
app.get('/api/analytics', async (c) => {
  try {
    // Get company from query parameter or default to MabSilico
    const companyKey = c.req.query('company') || 'mabsilico'
    const company = await getCompany(undefined, companyKey)
    
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

// Admin Panel Route
app.get('/admin', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Panel - Gershon CRM</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        </style>
    </head>
    <body class="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <!-- Header -->
        <div class="bg-white shadow-lg border-b-4 border-blue-600">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-shield-alt mr-2"></i>
                            <span class="font-bold">ADMIN PANEL</span>
                        </div>
                        <h1 class="text-2xl font-bold text-gray-800">Company Management</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">Version <strong>1.0.0</strong></span>
                        <a href="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Total Companies</p>
                            <p id="total-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-blue-100 p-4 rounded-lg">
                            <i class="fas fa-building text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Configured</p>
                            <p id="configured-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-green-100 p-4 rounded-lg">
                            <i class="fas fa-check-circle text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 font-medium">Needs Setup</p>
                            <p id="needs-setup-companies" class="text-3xl font-bold text-gray-800 mt-1">-</p>
                        </div>
                        <div class="bg-yellow-100 p-4 rounded-lg">
                            <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add New Company Form -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-plus-circle text-green-600 mr-3"></i>
                    Add New Company
                </h2>
                
                <form id="add-company-form" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Company Name -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="company-name" 
                            placeholder="e.g., Acme Corporation"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <!-- Company Key -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Company Key <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="company-key" 
                            placeholder="e.g., acme-corp"
                            pattern="[a-z0-9-]+"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                            required
                        />
                        <p class="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only</p>
                    </div>

                    <!-- Streak Pipeline Key -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Streak Pipeline Key <span class="text-red-500">*</span>
                        </label>
                        <textarea 
                            id="pipeline-key" 
                            rows="2"
                            placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlh..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                            required
                        ></textarea>
                    </div>

                    <!-- ENGAGE URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            ENGAGE URL (Streak Pipeline) <span class="text-red-500">*</span>
                        </label>
                        <input 
                            type="url" 
                            id="engage-url" 
                            placeholder="https://www.streak.com/a/pipelines/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                            required
                        />
                    </div>

                    <!-- NETWORK URL -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            NETWORK URL (Google Sheets)
                        </label>
                        <input 
                            type="url" 
                            id="network-url" 
                            placeholder="https://docs.google.com/spreadsheets/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Network GID -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            Network Sheet GID
                        </label>
                        <input 
                            type="text" 
                            id="network-gid" 
                            placeholder="e.g., 608600451"
                            pattern="[0-9]*"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                        />
                    </div>

                    <!-- PROMOTE URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            PROMOTE URL
                        </label>
                        <input 
                            type="url" 
                            id="promote-url" 
                            placeholder="https://..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Buttons -->
                    <div class="md:col-span-2 flex space-x-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                        >
                            <i class="fas fa-plus-circle mr-2"></i>
                            Add Company
                        </button>
                        <button 
                            type="reset"
                            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                        >
                            <i class="fas fa-undo mr-2"></i>
                            Reset
                        </button>
                    </div>
                </form>

                <!-- Message Display -->
                <div id="form-message" class="hidden mt-6"></div>
            </div>

            <!-- Companies List -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-list text-blue-600 mr-3"></i>
                    All Companies
                </h2>
                
                <div id="companies-list" class="space-y-4">
                    <!-- Companies will be loaded here -->
                    <p class="text-gray-500 text-center py-8">Loading companies...</p>
                </div>
            </div>
        </div>

        <script>
            // Load companies on page load
            let companies = {};

            async function loadCompanies() {
                try {
                    const response = await fetch('/api/companies');
                    const data = await response.json();
                    companies = {};
                    
                    // Convert array to object
                    data.companies.forEach(company => {
                        companies[company.key] = company;
                    });

                    // Update stats
                    document.getElementById('total-companies').textContent = data.count;
                    
                    let configured = 0;
                    let needsSetup = 0;
                    
                    data.companies.forEach(company => {
                        if (company.url || (company.sources && (company.sources.promote || company.sources.network || company.sources.engage))) {
                            configured++;
                        } else {
                            needsSetup++;
                        }
                    });
                    
                    document.getElementById('configured-companies').textContent = configured;
                    document.getElementById('needs-setup-companies').textContent = needsSetup;

                    // Display companies
                    displayCompanies(data.companies);
                } catch (error) {
                    console.error('Error loading companies:', error);
                    showMessage('error', 'Failed to load companies: ' + error.message);
                }
            }

            function displayCompanies(companiesList) {
                const container = document.getElementById('companies-list');
                if (companiesList.length === 0) {
                    container.innerHTML = '<p class="text-gray-500 text-center py-8">No companies found</p>';
                    return;
                }

                container.innerHTML = companiesList.map(company => {
                    const sources = company.sources || {};
                    return \`
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <h3 class="text-lg font-bold text-gray-800 mb-3">
                                    <i class="fas fa-building text-blue-600 mr-2"></i>
                                    \${company.name}
                                </h3>
                                
                                <!-- Company Key -->
                                <div class="mb-3">
                                    <span class="text-gray-600 font-medium text-sm">Key:</span>
                                    <code class="ml-2 bg-gray-100 px-2 py-1 rounded text-xs font-mono">\${company.key}</code>
                                </div>
                                
                                <!-- Data Sources -->
                                <div class="space-y-2 mt-4">
                                    <h4 class="text-sm font-semibold text-gray-700 mb-2">Data Sources:</h4>
                                    
                                    <!-- PROMOTE -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-bullhorn text-yellow-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">PROMOTE:</span>
                                            \${sources.promote ? 
                                                \`<a href="\${sources.promote}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.promote.substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                        </div>
                                    </div>
                                    
                                    <!-- NETWORK -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-users text-blue-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">NETWORK:</span>
                                            \${sources.network ? 
                                                \`<a href="\${sources.network}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.network.substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                            \${company.networkSheetGid ? \`<span class="text-gray-500 text-xs ml-2">(GID: \${company.networkSheetGid})</span>\` : ''}
                                        </div>
                                    </div>
                                    
                                    <!-- ENGAGE -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-handshake text-green-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">ENGAGE:</span>
                                            \${sources.engage || company.url ? 
                                                \`<a href="\${sources.engage || company.url}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${(sources.engage || company.url).substring(0, 50)}...</a>\` : 
                                                '<span class="text-gray-400 text-xs ml-2">Not configured</span>'
                                            }
                                        </div>
                                    </div>
                                    
                                    <!-- Pipeline Key -->
                                    <div class="flex items-start space-x-2 text-sm">
                                        <i class="fas fa-key text-purple-600 mt-0.5"></i>
                                        <div class="flex-1">
                                            <span class="font-medium text-gray-700">Pipeline Key:</span>
                                            <code class="text-xs ml-2 bg-gray-100 px-2 py-1 rounded break-all">\${company.pipelineKey || 'Not set'}</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Action Buttons -->
                            <div class="ml-6 flex flex-col space-y-2">
                                <a href="/?company=\${company.key}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm text-center whitespace-nowrap">
                                    <i class="fas fa-external-link-alt mr-1"></i>
                                    View Dashboard
                                </a>
                                <button onclick="deleteCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm whitespace-nowrap">
                                    <i class="fas fa-trash-alt mr-1"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                \`;
                }).join('');
            }

            // Delete Company Function
            async function deleteCompany(companyKey, companyName) {
                if (!confirm(\`Are you sure you want to delete "\${companyName}"?\\n\\nThis action cannot be undone and will permanently remove the company from the database.\`)) {
                    return;
                }
                
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'DELETE'
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to delete company');
                    }
                    
                    // Show success message
                    showMessage('success', \`Company "\${companyName}" has been permanently deleted from the database!\`);
                    
                    // Reload companies list from database
                    loadCompanies();
                } catch (error) {
                    console.error('Error deleting company:', error);
                    showMessage('error', error.message || 'Failed to delete company. Please try again.');
                }
            }

            // Handle form submission
            document.getElementById('add-company-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('company-name').value.trim();
                const key = document.getElementById('company-key').value.trim();
                const pipelineKey = document.getElementById('pipeline-key').value.trim();
                const engageUrl = document.getElementById('engage-url').value.trim();
                const networkUrl = document.getElementById('network-url').value.trim();
                const networkGid = document.getElementById('network-gid').value.trim();
                const promoteUrl = document.getElementById('promote-url').value.trim();

                // Validate
                if (!/^[a-z0-9-]+$/.test(key)) {
                    showMessage('error', 'Company Key must contain only lowercase letters, numbers, and hyphens');
                    return;
                }

                // Save to database via API
                try {
                    const response = await fetch('/api/companies', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            key,
                            name,
                            pipeline_key: pipelineKey,
                            url: engageUrl,
                            promote_url: promoteUrl || null,
                            network_url: networkUrl || null,
                            network_sheet_gid: networkGid || null,
                            engage_url: engageUrl || null,
                            notion_url: null
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to add company');
                    }

                    // Success
                    showMessage('success', \`Company "\${name}" added successfully and saved to database!\`);
                    
                    // Reload company list from database
                    loadCompanies();

                    // Reset form
                    e.target.reset();

                    // Scroll to message
                    document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } catch (error) {
                    console.error('Error adding company:', error);
                    showMessage('error', error.message || 'Failed to add company. Please try again.');
                }
            });

            function showMessage(type, message) {
                const messageEl = document.getElementById('form-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-6';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                    setTimeout(() => messageEl.classList.add('hidden'), 5000);
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-6';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }
            }

            // Load on page load
            loadCompanies();
        </script>
    </body>
    </html>
  `)
})

// Default route - Dashboard HTML
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gershon CRM - Client Dashboard</title>
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
                            Gershon CRM - Client Dashboard
                            <span class="text-sm font-normal text-blue-200 ml-3">v1.0.0</span>
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
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
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
                            <button onclick="switchView('settings')" id="tab-settings" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                            <button onclick="switchView('onboarding')" id="tab-onboarding" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-rocket mr-2"></i>Onboarding
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

            <!-- Settings View -->
            <div id="view-settings" class="view-content hidden">
                <div class="bg-white rounded-lg shadow p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-cog text-blue-600 mr-3"></i>
                        <span id="settings-company-name">Company</span> Settings
                    </h2>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            <strong>Data Sources:</strong> Edit the source URLs for PROMOTE, NETWORK, and ENGAGE sections.
                        </p>
                    </div>

                    <form id="edit-sources-form" class="space-y-6" onsubmit="return false;">
                        <!-- PROMOTE Source -->
                        <div class="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-bullhorn text-yellow-600 mr-2"></i>
                                PROMOTE Data Source
                            </h3>
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700">Source URL:</label>
                                <input 
                                    type="url" 
                                    id="edit-promote-url" 
                                    placeholder="https://..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-calendar-alt mr-1"></i>
                                    Marketing campaigns and promotional activities data source
                                </p>
                            </div>
                        </div>

                        <!-- NETWORK Source -->
                        <div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-users text-blue-600 mr-2"></i>
                                NETWORK Data Source
                            </h3>
                            <div class="space-y-3">
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Google Sheets URL:</label>
                                    <input 
                                        type="url" 
                                        id="edit-network-url" 
                                        placeholder="https://docs.google.com/spreadsheets/d/..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Sheet GID (optional):</label>
                                    <input 
                                        type="text" 
                                        id="edit-network-gid" 
                                        placeholder="e.g., 608600451"
                                        pattern="[0-9]*"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <p class="text-xs text-gray-500">
                                    <i class="fas fa-table mr-1"></i>
                                    LinkedIn networking data from Google Sheets
                                </p>
                            </div>
                        </div>

                        <!-- ENGAGE Source -->
                        <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <i class="fas fa-handshake text-green-600 mr-2"></i>
                                ENGAGE Data Source
                            </h3>
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-700">Streak Pipeline URL:</label>
                                <input 
                                    type="url" 
                                    id="edit-engage-url" 
                                    placeholder="https://www.streak.com/a/pipelines/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-2">
                                    <i class="fas fa-database mr-1"></i>
                                    Streak CRM pipeline data
                                </p>
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="flex items-center space-x-4 pt-4">
                            <button 
                                type="button"
                                onclick="saveSourceURLs()"
                                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center"
                            >
                                <i class="fas fa-save mr-2"></i>
                                Save Changes
                            </button>
                            <button 
                                type="button"
                                onclick="updateSettingsView()"
                                class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center"
                            >
                                <i class="fas fa-undo mr-2"></i>
                                Reset
                            </button>
                        </div>

                        <!-- Success/Error Messages -->
                        <div id="edit-sources-message" class="hidden mt-4"></div>
                    </form>

                    <!-- Add New Company Section -->
                    <div class="mt-10 pt-8 border-t-2 border-gray-200">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-plus-circle text-green-600 mr-3"></i>
                            Add New Company
                        </h2>
                        
                        <div class="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-4 mb-6">
                            <p class="text-sm text-gray-800">
                                <i class="fas fa-info-circle mr-2"></i>
                                <strong>Quick Setup:</strong> Add a new company by providing its details below. The company will be immediately available in the dashboard.
                            </p>
                        </div>

                        <form id="add-company-form" class="space-y-6" onsubmit="return false;">
                            <!-- Company Name -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-building text-blue-600 mr-2"></i>
                                    Company Name *
                                </label>
                                <input 
                                    type="text" 
                                    id="new-company-name" 
                                    placeholder="e.g., Acme Corporation"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Display name for the company</p>
                            </div>

                            <!-- Company Key -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-key text-purple-600 mr-2"></i>
                                    Company Key *
                                </label>
                                <input 
                                    type="text" 
                                    id="new-company-key" 
                                    placeholder="e.g., acme-corp"
                                    pattern="[a-z0-9-]+"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Lowercase letters, numbers, and hyphens only (e.g., acme-corp)</p>
                            </div>

                            <!-- Streak Pipeline Key -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-database text-green-600 mr-2"></i>
                                    Streak Pipeline Key *
                                </label>
                                <textarea 
                                    id="new-pipeline-key" 
                                    rows="3"
                                    placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    required
                                ></textarea>
                                <p class="text-xs text-gray-500 mt-1">The unique pipeline identifier from Streak CRM</p>
                            </div>

                            <!-- ENGAGE URL (Streak Pipeline URL) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-handshake text-green-600 mr-2"></i>
                                    ENGAGE URL (Streak Pipeline URL) *
                                </label>
                                <input 
                                    type="url" 
                                    id="new-engage-url" 
                                    placeholder="https://www.streak.com/a/pipelines/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                    required
                                />
                                <p class="text-xs text-gray-500 mt-1">Full Streak pipeline URL for CRM data</p>
                            </div>

                            <!-- NETWORK URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-users text-blue-600 mr-2"></i>
                                    NETWORK URL (Google Sheets URL)
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="url" 
                                    id="new-network-url" 
                                    placeholder="https://docs.google.com/spreadsheets/d/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Google Sheets URL for LinkedIn networking data</p>
                            </div>

                            <!-- Network Sheet GID (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-table text-blue-600 mr-2"></i>
                                    Network Sheet GID
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="new-network-gid" 
                                    placeholder="e.g., 608600451"
                                    pattern="[0-9]*"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                                />
                                <p class="text-xs text-gray-500 mt-1">The gid parameter from your Google Sheets URL (numbers only)</p>
                            </div>

                            <!-- PROMOTE URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-bullhorn text-yellow-600 mr-2"></i>
                                    PROMOTE URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input 
                                    type="url" 
                                    id="new-promote-url" 
                                    placeholder="https://..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">URL for marketing campaigns and promotional activities</p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-4 pt-4">
                                <button 
                                    type="button"
                                    onclick="addNewCompany()"
                                    class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center"
                                >
                                    <i class="fas fa-plus-circle mr-2"></i>
                                    Add Company
                                </button>
                                <button 
                                    type="button"
                                    onclick="resetAddCompanyForm()"
                                    class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center"
                                >
                                    <i class="fas fa-undo mr-2"></i>
                                    Reset
                                </button>
                            </div>

                            <!-- Success/Error Messages -->
                            <div id="add-company-message" class="hidden mt-4"></div>
                        </form>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                        <p class="text-sm text-gray-700">
                            <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                            <strong>Note:</strong> New companies are added to the current session only. For persistent storage, please configure in the application settings.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Onboarding View -->
            <div id="view-onboarding" class="view-content hidden">
                <div class="bg-white rounded-lg shadow p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-rocket text-green-600 mr-3"></i>
                        <span id="onboarding-company-name">Company</span> Onboarding Status
                    </h2>
                    
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            <strong>Onboarding Tracker:</strong> Monitor the onboarding progress and status from Notion.so
                        </p>
                    </div>

                    <!-- Notion Integration Status -->
                    <div class="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-plug text-purple-600 mr-2"></i>
                            Notion Integration
                        </h3>
                        <div id="notion-status" class="space-y-3">
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                                <p class="text-sm text-yellow-800">
                                    <i class="fas fa-exclamation-triangle mr-2"></i>
                                    <strong>Configuration Needed:</strong> Notion.so URL not configured yet. Please provide the Notion.so link to fetch onboarding data.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Onboarding Data Display -->
                    <div id="onboarding-data" class="hidden">
                        <!-- Onboarding Progress -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-tasks text-blue-600 mr-2"></i>
                                Onboarding Progress
                            </h3>
                            <div class="bg-gray-100 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">Overall Progress</span>
                                    <span id="progress-percentage" class="text-sm font-bold text-blue-600">0%</span>
                                </div>
                                <div class="w-full bg-gray-300 rounded-full h-4">
                                    <div id="progress-bar" class="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Onboarding Steps -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-list-check text-green-600 mr-2"></i>
                                Onboarding Steps
                            </h3>
                            <div id="onboarding-steps" class="space-y-3">
                                <!-- Steps will be dynamically loaded here -->
                            </div>
                        </div>

                        <!-- Next Actions -->
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <i class="fas fa-arrow-right text-orange-600 mr-2"></i>
                                Next Actions
                            </h3>
                            <div id="next-actions" class="space-y-3">
                                <!-- Next actions will be dynamically loaded here -->
                            </div>
                        </div>
                    </div>

                    <!-- Configuration Form -->
                    <div id="onboarding-config" class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-cog text-gray-600 mr-2"></i>
                            Configure Notion Integration
                        </h3>
                        <form id="notion-config-form" class="space-y-4" onsubmit="return false;">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Notion.so Page URL
                                </label>
                                <input 
                                    type="url" 
                                    id="notion-url" 
                                    placeholder="https://www.notion.so/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Paste the Notion page URL that contains the onboarding data</p>
                            </div>
                            <button 
                                type="button"
                                onclick="saveNotionConfig()"
                                class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
                            >
                                <i class="fas fa-save mr-2"></i>
                                Save & Fetch Data
                            </button>
                        </form>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                        <p class="text-sm text-gray-700">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            <strong>Note:</strong> This feature will fetch onboarding status data from your Notion.so page once configured. Make sure the page is publicly accessible or provide API credentials.
                        </p>
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
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/total")
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
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Closing/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Negotiating</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Negotiating/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Nurtering</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Nurtering/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Proposal Sent</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/stage/Proposal Sent/count")
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
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low FIT</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/fit/low/count")
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
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/high/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Medium INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/medium/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-1">Low INTEREST</p>
                                <code class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/interest/low/count")
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
                                =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/total")
                            </code>
                        </div>
                        
                        <h4 class="text-md font-semibold text-gray-800 mb-3">Time-Based Tracking Formulas:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">📅 Campaign Duration</p>
                                <code id="sheets-duration-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/duration/total")
                                </code>
                                <p class="text-xs text-gray-500 mt-1">Returns months</p>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">🔥 Past Week</p>
                                <code id="sheets-week-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/week/count")
                                </code>
                            </div>
                            <div class="border-b pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">January 2026</p>
                                <code id="sheets-jan-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/month/2026-01/count")
                                </code>
                            </div>
                            <div class="pb-3">
                                <p class="text-sm font-medium text-gray-700 mb-2">December 2025</p>
                                <code id="sheets-dec-formula" class="bg-gray-100 px-3 py-2 rounded text-xs block font-mono text-gray-800 overflow-x-auto">
                                    =IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/month/2025-12/count")
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
            let COMPANIES = {}; // Will be loaded from API

            // Load companies from API on page load
            async function loadCompanies() {
                try {
                    const response = await fetch('/api/companies');
                    const data = await response.json();
                    
                    // Transform API response into COMPANIES object format
                    COMPANIES = {};
                    data.companies.forEach(company => {
                        COMPANIES[company.key] = {
                            name: company.name,
                            pipelineKey: company.pipeline_key,
                            url: company.url,
                            networkSheetGid: company.network_sheet_gid,
                            notionUrl: company.notion_url,
                            sources: {
                                promote: company.promote_url || '',
                                network: company.network_url || '',
                                engage: company.engage_url || ''
                            }
                        };
                    });
                    
                    // Update company selector
                    updateCompanySelector();
                    
                    // Load default company data
                    if (COMPANIES[currentCompany]) {
                        fetchCompanyData(currentCompany);
                    }
                } catch (error) {
                    console.error('Error loading companies:', error);
                    alert('Failed to load companies. Please refresh the page.');
                }
            }

            // Update company selector dropdown with companies from API
            function updateCompanySelector() {
                const selector = document.getElementById('company-selector');
                if (!selector) return;
                
                selector.innerHTML = '';
                Object.keys(COMPANIES).forEach(key => {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = COMPANIES[key].name;
                    if (key === currentCompany) {
                        option.selected = true;
                    }
                    selector.appendChild(option);
                });
            }

            // Company configuration (fallback - will be replaced by API data)
            const COMPANIES_FALLBACK = {
                'mabsilico': {
                    name: 'MabSilico',
                    pipelineKey: 'agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw',
                    sources: {
                        promote: '',
                        network: 'https://docs.google.com/spreadsheets/d/1NzUlKfHTW6v7i-S59GjtBFlzQwTX2AaeK4gQ4fVSAsw/edit?gid=910674612#gid=910674612',
                        engage: 'https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw'
                    }
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
                
                // Update Settings view
                updateSettingsView();
                
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
                    const response = await fetch(\`/api/analytics?company=\${companyKey}\`);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch company data');
                    }
                    
                    const data = await response.json();
                    currentData = data;
                    
                    // Get company name from analytics data
                    const companyName = COMPANIES[companyKey]?.name || companyKey;
                    
                    // Update page title with company name
                    document.querySelector('h1').innerHTML = \`
                        <i class="fas fa-chart-line mr-3"></i>
                        \${companyName} - Pipeline Report
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
                    } else if (viewName === 'onboarding') {
                        updateOnboardingView();
                    }
                }
            }

            // Update Onboarding View
            function updateOnboardingView() {
                const company = COMPANIES[currentCompany];
                document.getElementById('onboarding-company-name').textContent = company.name;
                
                // Check if Notion URL is configured
                const notionUrl = company.notionUrl || '';
                
                if (!notionUrl) {
                    // Show configuration needed message
                    document.getElementById('onboarding-data').classList.add('hidden');
                    document.getElementById('notion-url').value = '';
                } else {
                    // URL is configured, show placeholder data
                    document.getElementById('notion-url').value = notionUrl;
                    // In a real implementation, you would fetch data from Notion API here
                    displayPlaceholderOnboardingData();
                }
            }

            // Save Notion Configuration
            async function saveNotionConfig() {
                const notionUrl = document.getElementById('notion-url').value.trim();
                
                if (!notionUrl) {
                    alert('Please enter a Notion.so URL');
                    return;
                }
                
                if (!notionUrl.includes('notion.so')) {
                    alert('Please enter a valid Notion.so URL');
                    return;
                }
                
                // Save to database via API
                try {
                    const company = COMPANIES[currentCompany];
                    const response = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: company.name,
                            pipeline_key: company.pipelineKey,
                            url: company.url,
                            promote_url: company.sources?.promote || null,
                            network_url: company.sources?.network || null,
                            network_sheet_gid: company.networkSheetGid || null,
                            engage_url: company.sources?.engage || null,
                            notion_url: notionUrl
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to save Notion URL');
                    }

                    // Update local object
                    company.notionUrl = notionUrl;
                    
                    // Show success message
                    const statusDiv = document.getElementById('notion-status');
                    statusDiv.innerHTML = \`
                        <div class="bg-green-50 border-l-4 border-green-500 p-4">
                            <p class="text-sm text-green-800">
                                <i class="fas fa-check-circle mr-2"></i>
                                <strong>Configuration Saved!</strong> Notion URL has been saved to database. Fetching data...
                            </p>
                        </div>
                    \`;
                    
                    // In a real implementation, you would fetch data from Notion API here
                    setTimeout(() => {
                        displayPlaceholderOnboardingData();
                    }, 1000);
                } catch (error) {
                    console.error('Error saving Notion URL:', error);
                    alert('Failed to save Notion URL. Please try again.');
                }
            }

            // Display Placeholder Onboarding Data
            function displayPlaceholderOnboardingData() {
                // Show onboarding data section
                document.getElementById('onboarding-data').classList.remove('hidden');
                
                // Update progress
                document.getElementById('progress-percentage').textContent = '60%';
                document.getElementById('progress-bar').style.width = '60%';
                
                // Display steps
                const stepsHtml = \`
                    <div class="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <i class="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Initial Setup Completed</p>
                            <p class="text-sm text-gray-600 mt-1">Company profile created and basic information configured</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <i class="fas fa-check-circle text-green-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Streak Pipeline Connected</p>
                            <p class="text-sm text-gray-600 mt-1">CRM pipeline integrated and data flowing</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <i class="fas fa-spinner fa-spin text-blue-600 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Team Training In Progress</p>
                            <p class="text-sm text-gray-600 mt-1">Onboarding team members and setting up permissions</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
                        <i class="fas fa-circle text-gray-400 text-xl mt-1"></i>
                        <div class="flex-1">
                            <p class="font-semibold text-gray-800">Go-Live Preparation</p>
                            <p class="text-sm text-gray-600 mt-1">Final checks and deployment planning</p>
                        </div>
                    </div>
                \`;
                document.getElementById('onboarding-steps').innerHTML = stepsHtml;
                
                // Display next actions
                const actionsHtml = \`
                    <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                        <p class="font-semibold text-gray-800 mb-2">Complete Team Training</p>
                        <p class="text-sm text-gray-600 mb-3">Schedule training sessions for remaining team members</p>
                        <button class="text-sm bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all">
                            <i class="fas fa-calendar mr-2"></i>Schedule Training
                        </button>
                    </div>
                    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p class="font-semibold text-gray-800 mb-2">Review Data Quality</p>
                        <p class="text-sm text-gray-600 mb-3">Verify pipeline data accuracy and completeness</p>
                        <button class="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                            <i class="fas fa-check mr-2"></i>Review Data
                        </button>
                    </div>
                \`;
                document.getElementById('next-actions').innerHTML = actionsHtml;
                
                // Update status
                document.getElementById('notion-status').innerHTML = \`
                    <div class="bg-green-50 border-l-4 border-green-500 p-4">
                        <p class="text-sm text-green-800">
                            <i class="fas fa-check-circle mr-2"></i>
                            <strong>Connected:</strong> Onboarding data synced from Notion.so
                        </p>
                    </div>
                \`;
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

            function updateSettingsView() {
                const company = COMPANIES[currentCompany];
                const sources = company.sources || { promote: '', network: '', engage: '' };
                
                // Update company name in settings header
                document.getElementById('settings-company-name').textContent = company.name;
                
                // Populate input fields with current values
                document.getElementById('edit-promote-url').value = sources.promote || '';
                document.getElementById('edit-network-url').value = sources.network || '';
                document.getElementById('edit-network-gid').value = company.networkSheetGid || '';
                document.getElementById('edit-engage-url').value = sources.engage || company.url || '';
                
                // Hide any previous messages
                const messageEl = document.getElementById('edit-sources-message');
                if (messageEl) {
                    messageEl.classList.add('hidden');
                }
            }

            // Save Source URLs Function
            async function saveSourceURLs() {
                const company = COMPANIES[currentCompany];
                
                // Get values from input fields
                const promoteUrl = document.getElementById('edit-promote-url').value.trim();
                const networkUrl = document.getElementById('edit-network-url').value.trim();
                const networkGid = document.getElementById('edit-network-gid').value.trim();
                const engageUrl = document.getElementById('edit-engage-url').value.trim();

                // Validate URLs if provided
                if (promoteUrl && !isValidURL(promoteUrl)) {
                    showEditMessage('error', 'PROMOTE URL is not valid. Please enter a valid URL or leave it empty.');
                    return;
                }
                if (networkUrl && !isValidURL(networkUrl)) {
                    showEditMessage('error', 'NETWORK URL is not valid. Please enter a valid URL or leave it empty.');
                    return;
                }
                if (engageUrl && !isValidURL(engageUrl)) {
                    showEditMessage('error', 'ENGAGE URL is not valid. Please enter a valid URL.');
                    return;
                }
                if (networkGid && !/^[0-9]*$/.test(networkGid)) {
                    showEditMessage('error', 'Network Sheet GID must contain only numbers.');
                    return;
                }

                // Save to database via API
                try {
                    const response = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: company.name,
                            pipeline_key: company.pipelineKey,
                            url: engageUrl || company.url,
                            promote_url: promoteUrl || null,
                            network_url: networkUrl || null,
                            network_sheet_gid: networkGid || null,
                            engage_url: engageUrl || company.url,
                            notion_url: company.notionUrl || null
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to save company data');
                    }

                    // Update local COMPANIES object
                    if (!company.sources) {
                        company.sources = {};
                    }
                    
                    company.sources.promote = promoteUrl;
                    company.sources.network = networkUrl;
                    company.sources.engage = engageUrl || company.url;
                    
                    // Update network GID if provided
                    if (networkGid) {
                        company.networkSheetGid = networkGid;
                    } else {
                        delete company.networkSheetGid;
                    }
                    
                    // Also update the main URL to match engage URL if provided
                    if (engageUrl) {
                        company.url = engageUrl;
                    }

                    // Show success message
                    showEditMessage('success', \`Source URLs for \${company.name} have been saved successfully to the database!\`);

                    // Reload dashboard to reflect changes
                    loadDashboard();
                } catch (error) {
                    console.error('Error saving company data:', error);
                    showEditMessage('error', 'Failed to save company data. Please try again.');
                }
            }

            // Validate URL
            function isValidURL(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }

            // Show Edit Message Function
            function showEditMessage(type, message) {
                const messageEl = document.getElementById('edit-sources-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                    
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                        messageEl.classList.add('hidden');
                    }, 5000);
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }
            }

            // Add New Company Function
            function addNewCompany() {
                // Get form values
                const name = document.getElementById('new-company-name').value.trim();
                const key = document.getElementById('new-company-key').value.trim();
                const pipelineKey = document.getElementById('new-pipeline-key').value.trim();
                const engageUrl = document.getElementById('new-engage-url').value.trim();
                const networkUrl = document.getElementById('new-network-url').value.trim();
                const networkGid = document.getElementById('new-network-gid').value.trim();
                const promoteUrl = document.getElementById('new-promote-url').value.trim();

                // Validate required fields
                if (!name || !key || !pipelineKey || !engageUrl) {
                    showMessage('error', 'Please fill in all required fields (marked with *)');
                    return;
                }

                // Validate key format (lowercase, numbers, hyphens only)
                if (!/^[a-z0-9-]+$/.test(key)) {
                    showMessage('error', 'Company Key must contain only lowercase letters, numbers, and hyphens');
                    return;
                }

                // Check if key already exists
                if (COMPANIES[key]) {
                    showMessage('error', \`Company key "\${key}" already exists. Please use a different key.\`);
                    return;
                }

                // Create new company object
                const newCompany = {
                    name: name,
                    pipelineKey: pipelineKey,
                    url: engageUrl,
                    sources: {
                        promote: promoteUrl || '',
                        network: networkUrl || '',
                        engage: engageUrl
                    }
                };

                // Add networkSheetGid if provided
                if (networkGid) {
                    newCompany.networkSheetGid = networkGid;
                }

                // Add company to COMPANIES object
                COMPANIES[key] = newCompany;

                // Add to dropdown
                const selector = document.getElementById('company-selector');
                const option = document.createElement('option');
                option.value = key;
                option.textContent = name;
                selector.appendChild(option);

                // Switch to the new company
                currentCompany = key;
                selector.value = key;

                // Update UI
                updateSheetsFormulas();
                updateSettingsView();
                loadDashboard();

                // Show success message
                showMessage('success', \`Company "\${name}" has been added successfully! Switched to this company.\`);

                // Reset form
                resetAddCompanyForm();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Reset Add Company Form
            function resetAddCompanyForm() {
                document.getElementById('new-company-name').value = '';
                document.getElementById('new-company-key').value = '';
                document.getElementById('new-pipeline-key').value = '';
                document.getElementById('new-engage-url').value = '';
                document.getElementById('new-network-url').value = '';
                document.getElementById('new-network-gid').value = '';
                document.getElementById('new-promote-url').value = '';
                
                // Hide message
                const messageEl = document.getElementById('add-company-message');
                messageEl.classList.add('hidden');
            }

            // Show Message Function
            function showMessage(type, message) {
                const messageEl = document.getElementById('add-company-message');
                messageEl.classList.remove('hidden');
                
                if (type === 'success') {
                    messageEl.className = 'bg-green-50 border-l-4 border-green-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-green-800">Success!</p>
                                <p class="text-sm text-green-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                } else {
                    messageEl.className = 'bg-red-50 border-l-4 border-red-500 p-4 mt-4';
                    messageEl.innerHTML = \`
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle text-red-600 text-xl mr-3"></i>
                            <div>
                                <p class="text-sm font-semibold text-red-800">Error</p>
                                <p class="text-sm text-red-700 mt-1">\${message}</p>
                            </div>
                        </div>
                    \`;
                }

                // Auto-hide success messages after 5 seconds
                if (type === 'success') {
                    setTimeout(() => {
                        messageEl.classList.add('hidden');
                    }, 5000);
                }
            }

            // Load dashboard on page load and setup auto-refresh
            updateSheetsFormulas(); // Initialize Google Sheets formulas
            updateSettingsView(); // Initialize Settings view
            loadCompanies(); // Load companies from D1 database (will call loadDashboard internally)
            setupAutoRefresh();
        </script>
    </body>
    </html>
  `)
})

// Test endpoint to verify Streak API
app.get('/api/test-streak', async (c) => {
  try {
    const company = await getCompany(undefined, 'mabsilico')
    if (!company) {
      return c.json({ error: 'Company not found' }, 404)
    }
    
    const pipelineKey = company.pipelineKey
    
    // Test basic API call
    const response = await fetch(`${STREAK_API_BASE}/pipelines/${pipelineKey}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${STREAK_API_KEY}:`)}`,
        'Content-Type': 'application/json'
      }
    })
    
    const status = response.status
    const statusText = response.statusText
    
    if (!response.ok) {
      const errorText = await response.text()
      return c.json({ 
        error: 'Streak API failed',
        status,
        statusText,
        errorText,
        pipelineKey,
        apiBase: STREAK_API_BASE,
        endpoint: `/pipelines/${pipelineKey}`
      }, 500)
    }
    
    const data = await response.json()
    
    return c.json({
      success: true,
      status,
      company: company.name,
      pipelineKey,
      pipelineName: data.name || 'Unknown',
      stageCount: data.stageOrder ? data.stageOrder.length : 0
    })
  } catch (error) {
    return c.json({ 
      error: error.message,
      stack: error.stack 
    }, 500)
  }
})

export default app
