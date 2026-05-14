import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  COMPANIES_KV: KVNamespace
  STREAK_API_KEY?: string
  ENCRYPTION_KEY: string
  GOOGLE_CLIENT_ID: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Load Streak API key: try KV (encrypted) first, fall back to env var
app.use('*', async (c, next) => {
  try {
    const encryptedKey = await c.env.COMPANIES_KV.get('__streak_api_key__')
    if (encryptedKey && c.env.ENCRYPTION_KEY) {
      streakApiKey = await decryptApiKey(encryptedKey, c.env.ENCRYPTION_KEY)
    } else if (c.env.STREAK_API_KEY) {
      streakApiKey = c.env.STREAK_API_KEY
    }
  } catch (e) {
    // Fall back to env var if decryption fails
    if (c.env.STREAK_API_KEY) {
      streakApiKey = c.env.STREAK_API_KEY
    }
  }
  await next()
})

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Streak API configuration
let streakApiKey: string = ''
const STREAK_API_BASE = 'https://www.streak.com/api/v1'

// Authorized admin emails
const ADMIN_EMAILS = [
  'oattia@gmail.com',
  'aina.andriamangason@gmail.com',
  'winnielauren3@gmail.com',
  'zakaria.omahdi@mabsilico.com',
]

// --- Encryption helpers (AES-GCM via Web Crypto API) ---

async function deriveKey(encryptionKey: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.digest('SHA-256', enc.encode(encryptionKey))
  return crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
}

async function encryptApiKey(key: string, encryptionKey: string): Promise<string> {
  const enc = new TextEncoder()
  const cryptoKey = await deriveKey(encryptionKey)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, enc.encode(key))
  const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length)
  combined.set(iv)
  combined.set(new Uint8Array(ciphertext), iv.length)
  let binary = ''
  for (let i = 0; i < combined.length; i++) {
    binary += String.fromCharCode(combined[i])
  }
  return btoa(binary)
}

async function decryptApiKey(encrypted: string, encryptionKey: string): Promise<string> {
  const binary = atob(encrypted)
  const combined = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    combined[i] = binary.charCodeAt(i)
  }
  const iv = combined.slice(0, 12)
  const ciphertext = combined.slice(12)
  const cryptoKey = await deriveKey(encryptionKey)
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, ciphertext)
  return new TextDecoder().decode(decrypted)
}

// --- Google token verification ---

async function verifyGoogleToken(token: string, clientId: string): Promise<{email: string, name: string} | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token))
    if (!response.ok) return null
    const data = await response.json() as Record<string, string>
    if (data.aud !== clientId) return null
    if (!data.email || data.email_verified !== 'true') return null
    return { email: data.email, name: data.name || data.email }
  } catch {
    return null
  }
}

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

// Helper function to make Streak API calls
async function callStreakAPI(endpoint: string) {
  const auth = btoa(`${streakApiKey}:`)
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
// Parse a Google Sheets URL to extract sheetId and gid
function parseSheetUrl(urlOrGid: string): { sheetId: string, gid: string } {
  // If it looks like a full URL, extract sheet ID and gid
  if (urlOrGid.includes('docs.google.com')) {
    const sheetIdMatch = urlOrGid.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
    const gidMatch = urlOrGid.match(/[?&#]gid=(\d+)/)
    const sheetId = sheetIdMatch ? sheetIdMatch[1] : GOOGLE_SHEET_ID
    const gid = gidMatch ? gidMatch[1] : '0'
    return { sheetId, gid }
  }
  // Otherwise treat as a raw GID using default sheet
  return { sheetId: GOOGLE_SHEET_ID, gid: urlOrGid }
}

async function fetchNetworkData(urlOrGid: string) {
  try {
    const { sheetId, gid } = parseSheetUrl(urlOrGid)
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Google Sheets error: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    const lines = csvText.split('\n').filter(line => line.trim())

    // Parse CSV — auto-detect column layout from header row
    // Format A (9+ cols): W, From, To, Invitations, Messages, Inmails, Follow ups, Acceptance, Opportunities
    // Format B (8 cols):  From, To, Invitations, Messages, Inmails, Follow ups, Acceptance, Opportunities
    const data = []
    if (lines.length < 2) return { totalInvitations: 0, totalAccepted: 0, avgAcceptanceRate: 0, thisWeek: { invitations: 0, acceptance: 0 }, lastWeek: { invitations: 0, acceptance: 0 }, recentWeeks: [], allData: [] }

    const headerCols = lines[0].split(',').map(h => h.trim().toLowerCase())
    const hasWeekCol = headerCols[0] === 'w' || headerCols[0] === 'week'
    const offset = hasWeekCol ? 0 : -1  // shift column indices when W column is missing

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      const cols = line.split(',')

      // Invitations is at index 3 (with W) or 2 (without W)
      const invIdx = 3 + offset
      const msgIdx = 4 + offset
      const accIdx = 7 + offset
      const oppIdx = 8 + offset
      const fromIdx = 1 + offset
      const toIdx = 2 + offset

      if (cols.length >= (hasWeekCol ? 9 : 8) && cols[invIdx] && cols[invIdx].trim()) {
        const invitations = parseInt(cols[invIdx]) || 0
        const messages = parseInt(cols[msgIdx]) || 0
        const acceptance = cols[accIdx] ? cols[accIdx].replace('%', '').trim() : '0'
        const acceptanceRate = parseFloat(acceptance) || 0

        data.push({
          week: hasWeekCol ? cols[0] : String(i),
          from: cols[fromIdx],
          to: cols[toIdx],
          invitations,
          messages,
          acceptance: acceptanceRate,
          opportunities: (oppIdx < cols.length) ? (parseInt(cols[oppIdx]) || 0) : 0
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

// Helper: look up a single company by key — checks hardcoded first, then KV
// Auto-extract pipeline key from Streak URL, or fix if user pasted a strk_ API key
function resolvePipelineKey(pipelineKey: string, engageUrl?: string): string {
  // If pipelineKey looks like a Streak API key (strk_...) instead of a pipeline key,
  // try to extract the real pipeline key from the engage URL
  if (pipelineKey && pipelineKey.startsWith('strk_') && engageUrl) {
    const match = engageUrl.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/)
    if (match) return match[1]
  }
  // If pipelineKey is a full URL, extract the key part
  if (pipelineKey && pipelineKey.includes('/pipelines/')) {
    const match = pipelineKey.match(/\/pipelines\/([a-zA-Z0-9_-]{20,})/)
    if (match) return match[1]
  }
  return pipelineKey
}

async function getCompany(kv: KVNamespace, key: string): Promise<any | null> {
  // Hardcoded companies have priority (they may be overridden via KV)
  const kvRaw = await kv.get(`company:${key}`)
  if (kvRaw) return JSON.parse(kvRaw)
  if (COMPANIES[key]) {
    const c = COMPANIES[key]
    return { key, name: c.name, pipelineKey: c.pipelineKey, url: c.url || '', networkSheetGid: c.networkSheetGid || '', sources: c.sources || {} }
  }
  return null
}

// Helper: load all companies (hardcoded defaults + KV overrides)
async function getAllCompanies(kv: KVNamespace, includeArchived = false) {
  const merged: Record<string, any> = {}

  // Start with hardcoded defaults
  for (const key of Object.keys(COMPANIES)) {
    const c = COMPANIES[key]
    merged[key] = { key, name: c.name, pipelineKey: c.pipelineKey, url: c.url || '', networkSheetGid: c.networkSheetGid || '', sources: c.sources || {}, archived: false }
  }

  // Overlay with KV entries (new companies or overrides, including archived flag)
  const kvList = await kv.list({ prefix: 'company:' })
  for (const item of kvList.keys) {
    const raw = await kv.get(item.name)
    if (raw) {
      const company = JSON.parse(raw)
      merged[company.key] = company
    }
  }

  const all = Object.values(merged)
  return includeArchived ? all : all.filter((c: any) => !c.archived)
}

app.get('/api/companies', async (c) => {
  const includeArchived = c.req.query('includeArchived') === 'true'
  const companiesList = await getAllCompanies(c.env.COMPANIES_KV, includeArchived)
  return c.json({ companies: companiesList, count: companiesList.length })
})

app.post('/api/companies', async (c) => {
  try {
    const body = await c.req.json()
    const { name, pipelineKey, networkUrl, promoteUrl, engageUrl, notionUrl, networkGid, key: providedKey, googleChatUrl, googleChatWebhookUrl, messages } = body

    if (!name || !pipelineKey) {
      return c.json({ error: 'name and pipelineKey are required' }, 400)
    }

    // Use provided key or auto-generate from name
    const key = providedKey || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    // Auto-fix pipeline key if user pasted a strk_ API key or full URL
    const resolvedPipelineKey = resolvePipelineKey(pipelineKey, engageUrl)

    const company: any = {
      key,
      name,
      pipelineKey: resolvedPipelineKey,
      url: engageUrl || `https://www.streak.com/a/pipelines/${pipelineKey}`,
      sources: {
        promote: promoteUrl || '',
        network: networkUrl || '',
        engage: engageUrl || `https://www.streak.com/a/pipelines/${pipelineKey}`,
        notion: notionUrl || ''
      }
    }
    if (networkGid) company.networkSheetGid = networkGid
    if (googleChatUrl) company.googleChatUrl = googleChatUrl
    if (googleChatWebhookUrl) company.googleChatWebhookUrl = googleChatWebhookUrl
    if (messages && messages.length > 0) company.messages = messages

    await c.env.COMPANIES_KV.put(`company:${key}`, JSON.stringify(company))
    return c.json({ success: true, company })
  } catch (err) {
    return c.json({ error: 'Failed to save company' }, 500)
  }
})

// --- Google Chat Scheduled Messages ---
// Resolve dynamic variables like [leads:Lead], [leads:Contacted] in message text
async function resolveMessageVariables(text: string, pipelineKey: string): Promise<string> {
  // Find all [leads:StageName] patterns
  const pattern = /\[leads:([^\]]+)\]/gi
  const matches = [...text.matchAll(pattern)]
  if (matches.length === 0) return text

  // Fetch pipeline and boxes once
  const [pipeline, boxes] = await Promise.all([
    callStreakAPI(`/pipelines/${pipelineKey}`),
    callStreakAPI(`/pipelines/${pipelineKey}/boxes`)
  ])

  // Build stage name map
  const stageOrder = pipeline.stageOrder || []
  const stages: Record<string, string> = {}
  for (const key of stageOrder) {
    stages[key] = pipeline.stages?.[key]?.name || 'Unknown'
  }

  // Replace each variable with the count
  let resolved = text
  for (const match of matches) {
    const stageName = match[1]
    const count = Array.isArray(boxes)
      ? boxes.filter((box: any) => {
          const boxStage = stages[box.stageKey] || ''
          return boxStage.toLowerCase() === stageName.toLowerCase()
        }).length
      : 0
    resolved = resolved.replace(match[0], count.toString())
  }
  return resolved
}

// Get current day of week in EST
function getCurrentDayEST(): string {
  const now = new Date()
  // Convert to EST (UTC-5)
  const estOffset = -5 * 60
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const estMinutes = utcMinutes + estOffset
  const estDate = new Date(now)
  estDate.setUTCMinutes(estDate.getUTCMinutes() + estOffset)
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[estDate.getUTCDay()]
}

// Send all scheduled messages that match the current day (called by external cron)
app.get('/api/chat/send-messages', async (c) => {
  try {
    const results: any[] = []
    const companies = await getAllCompanies(c.env.COMPANIES_KV)
    const today = getCurrentDayEST()

    for (const company of companies) {
      if (!company.googleChatWebhookUrl || !company.messages || !company.pipelineKey) continue

      // Filter messages scheduled for today that are enabled
      const todayMessages = company.messages.filter((msg: any) =>
        msg.enabled && msg.dayOfWeek === today
      )

      for (const msg of todayMessages) {
        try {
          const resolvedText = await resolveMessageVariables(msg.text, company.pipelineKey)

          const webhookRes = await fetch(company.googleChatWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ text: resolvedText })
          })

          results.push({
            company: company.name,
            messageId: msg.id,
            sent: webhookRes.ok,
            status: webhookRes.status,
            resolvedText
          })
        } catch (msgErr: any) {
          results.push({
            company: company.name,
            messageId: msg.id,
            error: msgErr.message,
            sent: false
          })
        }
      }
    }

    return c.json({ success: true, day: today, results, timestamp: new Date().toISOString() })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// Legacy endpoint: send the default lead reminder to all companies
app.get('/api/chat/weekly-reminder', async (c) => {
  try {
    const results: any[] = []
    const companies = await getAllCompanies(c.env.COMPANIES_KV)

    for (const company of companies) {
      if (!company.googleChatWebhookUrl || !company.pipelineKey) continue

      try {
        const [pipeline, boxes] = await Promise.all([
          callStreakAPI(`/pipelines/${company.pipelineKey}`),
          callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`)
        ])

        const stageOrder = pipeline.stageOrder || []
        const stages: Record<string, string> = {}
        for (const key of stageOrder) {
          stages[key] = pipeline.stages?.[key]?.name || 'Unknown'
        }

        const leadCount = Array.isArray(boxes)
          ? boxes.filter((box: any) => {
              const stageName = stages[box.stageKey] || ''
              return stageName.toLowerCase() === 'lead'
            }).length
          : 0

        const message = `As a reminder, you still have ${leadCount} leads in your Streak that are still at the stage of LEAD, they should be CONTACTED or better. Also, a FIT would be important to share for future campaigns. Thanks.`

        const webhookRes = await fetch(company.googleChatWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ text: message })
        })

        results.push({ company: company.name, leadCount, sent: webhookRes.ok, status: webhookRes.status })
      } catch (companyErr: any) {
        results.push({ company: company.name, error: companyErr.message, sent: false })
      }
    }

    return c.json({ success: true, results, timestamp: new Date().toISOString() })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// Send messages for a specific company (for testing)
app.get('/api/chat/send-messages/:companyKey', async (c) => {
  try {
    const companyKey = c.req.param('companyKey').toLowerCase()
    const company = await getCompany(c.env.COMPANIES_KV, companyKey)

    if (!company) {
      return c.json({ error: 'Company not found' }, 404)
    }
    if (!company.googleChatWebhookUrl) {
      return c.json({ error: `No Google Chat webhook configured for ${company.name}` }, 400)
    }
    if (!company.pipelineKey) {
      return c.json({ error: `No pipeline key configured for ${company.name}` }, 400)
    }
    if (!company.messages || company.messages.length === 0) {
      return c.json({ error: `No messages configured for ${company.name}` }, 400)
    }

    const results: any[] = []
    for (const msg of company.messages) {
      if (!msg.enabled) continue
      try {
        const resolvedText = await resolveMessageVariables(msg.text, company.pipelineKey)
        const webhookRes = await fetch(company.googleChatWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ text: resolvedText })
        })
        results.push({ messageId: msg.id, dayOfWeek: msg.dayOfWeek, time: msg.time, sent: webhookRes.ok, resolvedText })
      } catch (msgErr: any) {
        results.push({ messageId: msg.id, error: msgErr.message, sent: false })
      }
    }

    return c.json({
      success: true,
      company: company.name,
      results,
      timestamp: new Date().toISOString()
    })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

app.delete('/api/companies/:key', async (c) => {
  try {
    const key = c.req.param('key')
    // Only allow deleting KV-stored companies (not hardcoded defaults)
    await c.env.COMPANIES_KV.delete(`company:${key}`)
    return c.json({ success: true })
  } catch (err) {
    return c.json({ error: 'Failed to delete company' }, 500)
  }
})

app.put('/api/companies/:key', async (c) => {
  try {
    const key = c.req.param('key')
    const body = await c.req.json()
    const { name, pipelineKey, networkUrl, promoteUrl, engageUrl, networkGid, googleChatUrl, googleChatWebhookUrl, messages } = body

    // Load existing company (include archived so we can restore)
    const all = await getAllCompanies(c.env.COMPANIES_KV, true)
    const existing = all.find((co: any) => co.key === key)
    if (!existing) {
      return c.json({ error: 'Company not found' }, 404)
    }

    const { archived } = body
    // Auto-fix pipeline key if user pasted a strk_ API key or full URL
    const resolvedPK = pipelineKey ? resolvePipelineKey(pipelineKey, engageUrl || existing.url) : existing.pipelineKey
    const updated: any = {
      ...existing,
      key,
      name: name || existing.name,
      pipelineKey: resolvedPK,
      sources: {
        promote: promoteUrl !== undefined ? promoteUrl : (existing.sources?.promote || ''),
        network: networkUrl !== undefined ? networkUrl : (existing.sources?.network || ''),
        engage: engageUrl !== undefined ? engageUrl : (existing.sources?.engage || existing.url || ''),
      }
    }
    if (networkGid !== undefined) {
      if (networkGid) updated.networkSheetGid = networkGid
      else delete updated.networkSheetGid
    }
    if (engageUrl) updated.url = engageUrl
    if (archived !== undefined) updated.archived = archived
    if (googleChatUrl !== undefined) updated.googleChatUrl = googleChatUrl
    if (googleChatWebhookUrl !== undefined) updated.googleChatWebhookUrl = googleChatWebhookUrl
    if (messages !== undefined) updated.messages = messages

    await c.env.COMPANIES_KV.put(`company:${key}`, JSON.stringify(updated))
    return c.json({ success: true, company: updated })
  } catch (err) {
    return c.json({ error: 'Failed to update company' }, 500)
  }
})

// Get total leads for a specific company (case-insensitive)
app.get('/api/sheets/:companyName/total', async (c) => {
  try {
    const companyName = c.req.param('companyName').toLowerCase()
    const company = await getCompany(c.env.COMPANIES_KV, companyName)
    
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
    const company = await getCompany(c.env.COMPANIES_KV, companyName)
    
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
    const company = await getCompany(c.env.COMPANIES_KV, companyName)
    
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
    const company = await getCompany(c.env.COMPANIES_KV, companyName)
    
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
    const company = await getCompany(c.env.COMPANIES_KV, companyName)
    
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
    const company = await getCompany(c.env.COMPANIES_KV, companyKey)
    
    if (!company) {
      return c.json({ error: 'Invalid company key' }, 400)
    }
    
    const pipelineKey = company.pipelineKey
    if (!pipelineKey) {
      return c.json({ error: `No Streak pipeline key configured for "${company.name}". Please set it in the Admin Panel.` }, 400)
    }
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
    // Priority: networkSheetGid (raw GID) → sources.network (full URL with any sheet)
    let networkData = null
    const networkSource = company.networkSheetGid || company.sources?.network
    if (networkSource) {
      networkData = await fetchNetworkData(networkSource)
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

// ── Promote Data ─────────────────────────────────────────────────────────────
async function fetchPromoteData(promoteUrl: string) {
  const { sheetId, gid } = parseSheetUrl(promoteUrl)
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`
  const response = await fetch(csvUrl)
  if (!response.ok) throw new Error(`Google Sheets error: ${response.statusText}`)

  const csvText = await response.text()
  const lines = csvText.split('\n').filter(l => l.trim())
  if (lines.length < 2) return { platforms: {} }

  // Parse header row
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'))
  const idx = (name: string) => headers.indexOf(name)

  const rows: any[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',')
    if (cols.length < 5) continue
    rows.push({
      date:        cols[idx('date')]?.trim() || '',
      platform:    (cols[idx('platform')]?.trim() || 'linkedin').toLowerCase(),
      followers:   parseInt(cols[idx('follower_count')]) || 0,
      impressions: parseFloat(cols[idx('impressions')]) || 0,
      reach:       parseInt(cols[idx('reach')]) || 0,
      likes:       parseInt(cols[idx('like_count')]) || 0,
      comments:    parseInt(cols[idx('comment_count')]) || 0,
      shares:      parseInt(cols[idx('share_count')]) || 0,
      clicks:      parseInt(cols[idx('click_count')]) || 0,
      engagements: parseInt(cols[idx('overall_engagements')]) || 0,
      engRate:     parseFloat(cols[idx('engagement_rate')]) || 0,
      netGrowth:   parseInt(cols[idx('net_audience_growth')]) || 0,
      posts:       parseInt(cols[idx('post_count')]) || 0,
    })
  }

  // Group by platform
  const byPlatform: Record<string, any[]> = {}
  rows.forEach(r => {
    if (!byPlatform[r.platform]) byPlatform[r.platform] = []
    byPlatform[r.platform].push(r)
  })

  const result: Record<string, any> = {}

  for (const [platform, data] of Object.entries(byPlatform)) {
    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date))
    const followersStart = sorted[0].followers
    const followersEnd   = sorted[sorted.length - 1].followers
    const followersGrowth = followersEnd - followersStart
    const followersGrowthPct = followersStart > 0
      ? +((followersGrowth / followersStart) * 100).toFixed(1) : 0

    const totalPosts       = sorted.reduce((s, r) => s + r.posts, 0)
    const totalImpressions = Math.round(sorted.reduce((s, r) => s + r.impressions, 0))
    const totalReach       = sorted.reduce((s, r) => s + r.reach, 0)
    const totalEngagements = sorted.reduce((s, r) => s + r.engagements, 0)
    const totalLikes       = sorted.reduce((s, r) => s + r.likes, 0)
    const totalComments    = sorted.reduce((s, r) => s + r.comments, 0)
    const totalShares      = sorted.reduce((s, r) => s + r.shares, 0)

    // Avg engagement rate — skip zero-impression days
    const validRates = sorted.filter(r => r.impressions > 0 && r.engRate > 0).map(r => r.engRate)
    const avgEngRate = validRates.length > 0
      ? +(validRates.reduce((a, b) => a + b, 0) / validRates.length * 100).toFixed(2) : 0

    // Weekly breakdown — ISO week starting Monday
    const weeksMap: Record<string, any> = {}
    sorted.forEach(r => {
      const d = new Date(r.date)
      const day = d.getDay()
      const monday = new Date(d)
      monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
      const wk = monday.toISOString().split('T')[0]
      if (!weeksMap[wk]) weeksMap[wk] = { week: wk, posts: 0, impressions: 0, engagements: 0, reach: 0, netGrowth: 0 }
      weeksMap[wk].posts       += r.posts
      weeksMap[wk].impressions += Math.round(r.impressions)
      weeksMap[wk].engagements += r.engagements
      weeksMap[wk].reach       += r.reach
      weeksMap[wk].netGrowth   += r.netGrowth
    })
    const weeklyBreakdown = Object.values(weeksMap).sort((a: any, b: any) => a.week.localeCompare(b.week))
    const weeksCount = weeklyBreakdown.length || 1
    const avgPostsPerWeek = +(totalPosts / weeksCount).toFixed(1)

    // Daily series for charts
    const dailyData = sorted.map(r => ({
      date: r.date, followers: r.followers, posts: r.posts,
      impressions: Math.round(r.impressions), engagements: r.engagements, reach: r.reach
    }))

    result[platform] = {
      followersStart, followersEnd, followersGrowth, followersGrowthPct,
      totalPosts, avgPostsPerWeek, totalImpressions, totalReach,
      totalEngagements, totalLikes, totalComments, totalShares,
      avgEngRate, weeklyBreakdown, dailyData,
      dateRange: { from: sorted[0].date, to: sorted[sorted.length - 1].date }
    }
  }

  return { platforms: result }
}

app.get('/api/promote', async (c) => {
  try {
    const companyKey = c.req.query('company') || 'mabsilico'
    const company = await getCompany(c.env.COMPANIES_KV, companyKey)
    if (!company) return c.json({ error: 'Company not found' }, 404)
    const promoteUrl = company.sources?.promote || ''
    if (!promoteUrl) return c.json({ error: 'No promote URL configured for this company' }, 404)
    const data = await fetchPromoteData(promoteUrl)
    return c.json(data)
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

// Overview API — stats for ALL companies with comparison data
app.get('/api/overview', async (c) => {
  try {
    const period = c.req.query('period') || 'this-month'
    const now = Date.now()
    const nowDate = new Date()

    // Calculate period boundaries
    function getPeriodRange(p: string) {
      let start = 0, end = now
      if (p === 'week') {
        start = now - 7 * 24 * 60 * 60 * 1000
      } else if (p === 'last-month') {
        start = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1).getTime()
        end = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime()
      } else if (p === 'this-month') {
        start = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime()
      } else if (p === 'year') {
        start = new Date(nowDate.getFullYear(), 0, 1).getTime()
      }
      return { start, end }
    }

    // Comparison period ranges
    const weekRange = { start: now - 7 * 24 * 60 * 60 * 1000, end: now }
    const lastMonthRange = {
      start: new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, 1).getTime(),
      end: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime()
    }

    const currentRange = getPeriodRange(period)
    const companiesList = await getAllCompanies(c.env.COMPANIES_KV)

    const results = await Promise.all(
      companiesList.map(async (company: any) => {
        try {
          // Fetch Streak, Promote, and Network data in parallel
          const promoteUrl = company.sources?.promote || ''
          const networkGid = company.networkSheetGid || (company.sources?.network || '')

          const [boxes, promoteData, networkData] = await Promise.all([
            callStreakAPI(`/pipelines/${company.pipelineKey}/boxes`).catch(() => []),
            promoteUrl ? fetchPromoteData(promoteUrl).catch(() => ({ platforms: {} })) : Promise.resolve({ platforms: {} }),
            networkGid ? fetchNetworkData(networkGid).catch(() => ({ avgAcceptanceRate: 0, totalInvitations: 0 })) : Promise.resolve({ avgAcceptanceRate: 0, totalInvitations: 0 })
          ])

          const allBoxes = Array.isArray(boxes) ? boxes : []
          const totalLeads = allBoxes.length

          // Count leads in each period
          function countInRange(start: number, end: number) {
            return allBoxes.filter((box: any) => {
              const ts = box.creationTimestamp || 0
              return ts >= start && ts < end
            }).length
          }

          const periodLeads = countInRange(currentRange.start, currentRange.end)
          const weekLeads = countInRange(weekRange.start, weekRange.end)
          const lastMonthLeads = countInRange(lastMonthRange.start, lastMonthRange.end)

          // Stage distribution
          const stages: Record<string, number> = {}
          allBoxes.forEach((box: any) => {
            const stage = box.stageKey || 'Unknown'
            stages[stage] = (stages[stage] || 0) + 1
          })

          // Recent activity (last 7 days)
          const recentActivity = allBoxes.filter((box: any) => {
            const ts = box.lastUpdatedTimestamp || 0
            return ts >= weekRange.start
          }).length

          // Scale goal (10 leads/month) to the period
          const monthlyGoal = 10
          let periodGoal = monthlyGoal
          if (period === 'week') periodGoal = Math.round((monthlyGoal / 30) * 7)
          else if (period === 'year') periodGoal = monthlyGoal * 12
          else if (period === 'all') {
            const timestamps = allBoxes.map((b: any) => b.creationTimestamp).filter(Boolean)
            if (timestamps.length > 0) {
              const earliest = new Date(Math.min(...timestamps))
              const months = (nowDate.getFullYear() - earliest.getFullYear()) * 12
                + (nowDate.getMonth() - earliest.getMonth()) + 1
              periodGoal = monthlyGoal * Math.max(months, 1)
            }
          }

          // --- KPI: Promote — posts per day (target: 1/day) ---
          let promotePostsPerDay = 0
          let promoteConfigured = false
          if (promoteUrl && promoteData.platforms) {
            promoteConfigured = true
            // Sum across all platforms
            let totalPosts = 0, totalDays = 0
            for (const plat of Object.values(promoteData.platforms) as any[]) {
              totalPosts += plat.totalPosts || 0
              if (plat.dailyData && plat.dailyData.length > totalDays) totalDays = plat.dailyData.length
            }
            promotePostsPerDay = totalDays > 0 ? Math.round((totalPosts / totalDays) * 10) / 10 : 0
          }

          // --- KPI: Network — acceptance rate ---
          const networkAcceptanceRate = (networkData as any).avgAcceptanceRate || 0
          const networkConfigured = !!networkGid

          // --- KPI: Engage — % of 10 meetings/month ---
          // Count leads created this month as proxy for meetings
          const thisMonthStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime()
          const thisMonthLeads = allBoxes.filter((box: any) => (box.creationTimestamp || 0) >= thisMonthStart).length
          const engageMeetingsPct = Math.round((thisMonthLeads / 10) * 100)

          return {
            key: company.key,
            name: company.name,
            periodLeads,
            totalLeads,
            weekLeads,
            lastMonthLeads,
            recentActivity,
            stageCount: Object.keys(stages).length,
            goalPct: periodGoal > 0 ? Math.round((periodLeads / periodGoal) * 100) : 0,
            // New KPIs
            promotePostsPerDay,
            promoteConfigured,
            networkAcceptanceRate,
            networkConfigured,
            engageMeetingsPct,
            engageThisMonthLeads: thisMonthLeads,
            error: false
          }
        } catch (_err) {
          return { key: company.key, name: company.name, periodLeads: 0, totalLeads: 0, weekLeads: 0, lastMonthLeads: 0, recentActivity: 0, stageCount: 0, goalPct: 0, promotePostsPerDay: 0, promoteConfigured: false, networkAcceptanceRate: 0, networkConfigured: false, engageMeetingsPct: 0, engageThisMonthLeads: 0, error: true }
        }
      })
    )

    results.sort((a, b) => b.periodLeads - a.periodLeads)

    // Compute averages across all clients for comparison
    const activeCount = results.filter(r => !r.error).length || 1
    const avgWeekLeads = Math.round(results.reduce((s, r) => s + r.weekLeads, 0) / activeCount * 10) / 10
    const avgLastMonthLeads = Math.round(results.reduce((s, r) => s + r.lastMonthLeads, 0) / activeCount * 10) / 10
    const avgPeriodLeads = Math.round(results.reduce((s, r) => s + r.periodLeads, 0) / activeCount * 10) / 10
    const avgTotalLeads = Math.round(results.reduce((s, r) => s + r.totalLeads, 0) / activeCount * 10) / 10
    const avgRecentActivity = Math.round(results.reduce((s, r) => s + r.recentActivity, 0) / activeCount * 10) / 10

    return c.json({
      period,
      totalPeriodLeads: results.reduce((s, r) => s + r.periodLeads, 0),
      totalAllLeads: results.reduce((s, r) => s + r.totalLeads, 0),
      totalWeekLeads: results.reduce((s, r) => s + r.weekLeads, 0),
      totalLastMonthLeads: results.reduce((s, r) => s + r.lastMonthLeads, 0),
      averages: { weekLeads: avgWeekLeads, lastMonthLeads: avgLastMonthLeads, periodLeads: avgPeriodLeads, totalLeads: avgTotalLeads, recentActivity: avgRecentActivity },
      companies: results
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// --- Admin API endpoints ---

// Verify Google token and check authorization
app.post('/api/admin/verify-google', async (c) => {
  try {
    const body = await c.req.json() as { token: string }
    if (!body.token) {
      return c.json({ authorized: false, error: 'No token provided' }, 400)
    }
    const user = await verifyGoogleToken(body.token, c.env.GOOGLE_CLIENT_ID)
    if (!user) {
      return c.json({ authorized: false, error: 'Invalid token' }, 401)
    }
    const authorized = ADMIN_EMAILS.includes(user.email.toLowerCase())
    return c.json({ authorized, email: user.email, name: user.name })
  } catch {
    return c.json({ authorized: false, error: 'Verification failed' }, 500)
  }
})

// Check if Streak API key is configured
app.get('/api/admin/streak-key/status', async (c) => {
  try {
    const encryptedKey = await c.env.COMPANIES_KV.get('__streak_api_key__')
    if (encryptedKey && c.env.ENCRYPTION_KEY) {
      const decrypted = await decryptApiKey(encryptedKey, c.env.ENCRYPTION_KEY)
      const masked = decrypted.length > 8
        ? decrypted.substring(0, 4) + '****' + decrypted.substring(decrypted.length - 4)
        : '****'
      return c.json({ configured: true, maskedKey: masked })
    } else if (c.env.STREAK_API_KEY) {
      const key = c.env.STREAK_API_KEY
      const masked = key.length > 8
        ? key.substring(0, 4) + '****' + key.substring(key.length - 4)
        : '****'
      return c.json({ configured: true, maskedKey: masked, source: 'env' })
    }
    return c.json({ configured: false, maskedKey: null })
  } catch {
    return c.json({ configured: false, maskedKey: null, error: 'Failed to check status' })
  }
})

// Save encrypted Streak API key
app.post('/api/admin/streak-key', async (c) => {
  try {
    const body = await c.req.json() as { token: string, key: string }
    if (!body.token || !body.key) {
      return c.json({ success: false, error: 'Token and key are required' }, 400)
    }
    const user = await verifyGoogleToken(body.token, c.env.GOOGLE_CLIENT_ID)
    if (!user) {
      return c.json({ success: false, error: 'Invalid Google token' }, 401)
    }
    if (!ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      return c.json({ success: false, error: 'Unauthorized email' }, 403)
    }
    if (!c.env.ENCRYPTION_KEY) {
      return c.json({ success: false, error: 'Encryption key not configured on server' }, 500)
    }
    const encrypted = await encryptApiKey(body.key, c.env.ENCRYPTION_KEY)
    await c.env.COMPANIES_KV.put('__streak_api_key__', encrypted)
    return c.json({ success: true, message: 'Streak API key saved successfully' })
  } catch (e) {
    return c.json({ success: false, error: 'Failed to save key' }, 500)
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
                        <span class="text-sm text-gray-600">Version <strong>${__APP_VERSION__}</strong></span>
                        <a href="/" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                            <i class="fas fa-arrow-left mr-2"></i>
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Google Sign-In + Streak API Key Management -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-red-500">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-key text-red-600 mr-3"></i>
                    Streak API Key Management
                </h2>
                <p class="text-gray-600 mb-4">Sign in with Google to manage the Streak API key. Only authorized admins can update it.</p>

                <!-- Google Sign-In -->
                <div id="google-signin-section">
                    <div id="g_id_onload"
                        data-client_id="${c.env.GOOGLE_CLIENT_ID || '122652289881-c1tl6o48nvebuskflujembp28qfgvv36.apps.googleusercontent.com'}"
                        data-callback="handleGoogleSignIn"
                        data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="left">
                    </div>
                    <div id="signin-status" class="mt-3 text-sm text-gray-500"></div>
                </div>

                <!-- Key Management (hidden until signed in) -->
                <div id="streak-key-section" style="display: none;" class="mt-6 pt-6 border-t border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-700">Current Key Status</h3>
                        <div id="streak-key-status">
                            <span class="text-gray-400">Checking...</span>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <input type="password" id="streak-key-input" placeholder="Enter new Streak API key (e.g., strk_...)"
                            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-sm" />
                        <button id="streak-key-save" onclick="saveStreakKey()"
                            class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
                            <i class="fas fa-save mr-2"></i>Save Key
                        </button>
                    </div>
                    <div id="streak-key-message" class="mt-2 text-sm"></div>
                </div>
            </div>

            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <script>
                var googleIdToken = null;

                function handleGoogleSignIn(response) {
                    googleIdToken = response.credential;
                    var statusEl = document.getElementById('signin-status');
                    statusEl.innerHTML = '<span class="text-yellow-600"><i class="fas fa-spinner fa-spin mr-1"></i>Verifying...</span>';

                    fetch('/api/admin/verify-google', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: googleIdToken })
                    })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        if (data.authorized) {
                            statusEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Signed in as ' + data.email + '</span>';
                            document.getElementById('streak-key-section').style.display = 'block';
                            loadStreakKeyStatus();
                        } else {
                            statusEl.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Access denied for ' + (data.email || 'this account') + '</span>';
                            googleIdToken = null;
                        }
                    })
                    .catch(function() {
                        statusEl.innerHTML = '<span class="text-red-600">Verification failed. Try again.</span>';
                        googleIdToken = null;
                    });
                }

                function loadStreakKeyStatus() {
                    fetch('/api/admin/streak-key/status')
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        var el = document.getElementById('streak-key-status');
                        if (data.configured) {
                            var sourceNote = data.source === 'env' ? ' <span class="text-yellow-600 text-xs">(env var)</span>' : ' <span class="text-green-600 text-xs">(encrypted in KV)</span>';
                            el.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Configured</span>' + sourceNote + '<br/><span class="text-gray-500 font-mono text-sm mt-1 inline-block">' + data.maskedKey + '</span>';
                        } else {
                            el.innerHTML = '<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"><i class="fas fa-times mr-1"></i>Not configured</span>';
                        }
                    })
                    .catch(function() {
                        document.getElementById('streak-key-status').innerHTML = '<span class="text-red-600">Failed to check</span>';
                    });
                }

                function saveStreakKey() {
                    if (!googleIdToken) { alert('Please sign in with Google first.'); return; }
                    var keyInput = document.getElementById('streak-key-input');
                    var key = keyInput.value.trim();
                    if (!key) { alert('Please enter a Streak API key.'); return; }
                    var msgEl = document.getElementById('streak-key-message');
                    var saveBtn = document.getElementById('streak-key-save');
                    saveBtn.disabled = true;
                    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
                    msgEl.innerHTML = '';

                    fetch('/api/admin/streak-key', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: googleIdToken, key: key })
                    })
                    .then(function(r) { return r.json(); })
                    .then(function(data) {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Key';
                        if (data.success) {
                            msgEl.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Key saved and encrypted successfully!</span>';
                            keyInput.value = '';
                            loadStreakKeyStatus();
                        } else {
                            msgEl.innerHTML = '<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>' + (data.error || 'Unknown error') + '</span>';
                        }
                    })
                    .catch(function() {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Key';
                        msgEl.innerHTML = '<span class="text-red-600">Network error. Please try again.</span>';
                    });
                }
            </script>

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
                    <div class="md:col-span-2">
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

                    <!-- Streak Pipeline Key (ENGAGE) -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-handshake text-green-600 mr-1"></i>
                            ENGAGE — Streak API Key <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            id="pipeline-key"
                            rows="2"
                            placeholder="e.g., agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlh..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                            required
                        ></textarea>
                    </div>

                    <!-- NETWORK URL -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-users text-blue-600 mr-1"></i>
                            NETWORK — Google Sheets Link
                        </label>
                        <input
                            type="url"
                            id="network-url"
                            placeholder="https://docs.google.com/spreadsheets/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                    </div>

                    <!-- PROMOTE URL -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-bullhorn text-yellow-600 mr-1"></i>
                            PROMOTE URL
                        </label>
                        <input
                            type="url"
                            id="promote-url"
                            placeholder="https://..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                        />
                    </div>

                    <!-- Notion OnBoarding -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-book text-purple-600 mr-1"></i>
                            OnBoarding — Notion Link
                        </label>
                        <input
                            type="url"
                            id="notion-url"
                            placeholder="https://notion.so/..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
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
                    const response = await fetch('/api/companies?includeArchived=true');
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

            function companyCard(company, isArchived) {
                const sources = company.sources || {};
                const cardStyle = isArchived ? 'border-gray-200 bg-gray-50 opacity-75' : 'border-gray-200 hover:shadow-lg';
                const nameBadge = isArchived ? '<span class="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-normal">Archived</span>' : '';
                const iconColor = isArchived ? 'text-gray-400' : 'text-blue-600';
                return \`
                <div class="border rounded-lg p-6 transition-all \${cardStyle}">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-800 mb-3">
                                <i class="fas fa-building \${iconColor} mr-2"></i>
                                \${company.name}\${nameBadge}
                            </h3>
                            <div class="mb-3">
                                <span class="text-gray-600 font-medium text-sm">Key:</span>
                                <code class="ml-2 bg-gray-100 px-2 py-1 rounded text-xs font-mono">\${company.key}</code>
                            </div>
                            <div class="space-y-2 mt-4">
                                <h4 class="text-sm font-semibold text-gray-700 mb-2">Data Sources:</h4>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-bullhorn text-yellow-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">PROMOTE:</span>
                                        \${sources.promote ? \`<a href="\${sources.promote}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.promote.substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-users text-blue-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">NETWORK:</span>
                                        \${sources.network ? \`<a href="\${sources.network}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${sources.network.substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                        \${company.networkSheetGid ? \`<span class="text-gray-500 text-xs ml-2">(GID: \${company.networkSheetGid})</span>\` : ''}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-handshake text-green-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">ENGAGE:</span>
                                        \${sources.engage || company.url ? \`<a href="\${sources.engage || company.url}" target="_blank" class="text-blue-600 hover:underline text-xs ml-2 break-all">\${(sources.engage || company.url).substring(0,50)}...</a>\` : '<span class="text-gray-400 text-xs ml-2">Not configured</span>'}
                                    </div>
                                </div>
                                <div class="flex items-start space-x-2 text-sm">
                                    <i class="fas fa-key text-purple-600 mt-0.5"></i>
                                    <div class="flex-1"><span class="font-medium text-gray-700">Pipeline Key:</span>
                                        <code class="text-xs ml-2 bg-gray-100 px-2 py-1 rounded break-all">\${company.pipelineKey || 'Not set'}</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ml-6 flex flex-col space-y-2">
                            \${!isArchived ? \`
                            <a href="/?company=\${company.key}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm text-center whitespace-nowrap">
                                <i class="fas fa-external-link-alt mr-1"></i>View
                            </a>
                            <button onclick="openEditModal('\${company.key}')" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-pencil-alt mr-1"></i>Edit
                            </button>
                            <button onclick="archiveCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-archive mr-1"></i>Archive
                            </button>
                            \` : \`
                            <button onclick="openEditModal('\${company.key}')" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-pencil-alt mr-1"></i>Edit
                            </button>
                            <button onclick="restoreCompany('\${company.key}', '\${company.name}')" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm whitespace-nowrap">
                                <i class="fas fa-undo mr-1"></i>Restore
                            </button>
                            \`}
                        </div>
                    </div>
                </div>\`;
            }

            function displayCompanies(companiesList) {
                const container = document.getElementById('companies-list');
                const active = companiesList.filter(c => !c.archived);
                const archived = companiesList.filter(c => c.archived);

                let html = '';

                if (active.length === 0 && archived.length === 0) {
                    container.innerHTML = '<p class="text-gray-500 text-center py-8">No companies found</p>';
                    return;
                }

                // Active section
                html += \`<div class="mb-2">
                    <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        <i class="fas fa-circle text-green-500 mr-2 text-xs"></i>Active Clients (\${active.length})
                    </h3>
                    <div class="space-y-4">\${active.map(c => companyCard(c, false)).join('')}</div>
                </div>\`;

                // Archived section (collapsible)
                if (archived.length > 0) {
                    html += \`<div class="mt-8">
                        <button onclick="toggleArchived()" class="flex items-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 hover:text-gray-700">
                            <i class="fas fa-circle text-gray-400 mr-2 text-xs"></i>
                            Archived Clients (\${archived.length})
                            <i id="archived-chevron" class="fas fa-chevron-down ml-2 text-xs transition-transform"></i>
                        </button>
                        <div id="archived-section" class="hidden space-y-4">
                            \${archived.map(c => companyCard(c, true)).join('')}
                        </div>
                    </div>\`;
                }

                container.innerHTML = html;
            }

            function toggleArchived() {
                const section = document.getElementById('archived-section');
                const chevron = document.getElementById('archived-chevron');
                const hidden = section.classList.toggle('hidden');
                chevron.style.transform = hidden ? '' : 'rotate(180deg)';
            }

            // Archive Company Function
            async function archiveCompany(companyKey, companyName) {
                if (!confirm(\`Archive "\${companyName}"?\\n\\nThe client will be hidden from the dashboard and overview but all data is preserved. You can restore them at any time.\`)) return;
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ archived: true })
                    });
                    const data = await response.json();
                    if (data.success) {
                        // Update local state immediately — do NOT re-fetch from KV
                        // (KV has eventual consistency and would return stale data)
                        if (companies[companyKey]) companies[companyKey].archived = true;
                        displayCompanies(Object.values(companies));
                        // Auto-expand the archived section so user sees the move
                        const section = document.getElementById('archived-section');
                        const chevron = document.getElementById('archived-chevron');
                        if (section && section.classList.contains('hidden')) {
                            section.classList.remove('hidden');
                            if (chevron) chevron.style.transform = 'rotate(180deg)';
                        }
                        showMessage('success', \`"\${companyName}" archived. Visible in the Archived section below — data fully preserved.\`);
                    } else {
                        showMessage('error', data.error || 'Failed to archive company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
                }
            }

            // Restore Company Function
            async function restoreCompany(companyKey, companyName) {
                try {
                    const response = await fetch(\`/api/companies/\${companyKey}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ archived: false })
                    });
                    const data = await response.json();
                    if (data.success) {
                        // Update local state immediately — do NOT re-fetch from KV
                        if (companies[companyKey]) companies[companyKey].archived = false;
                        displayCompanies(Object.values(companies));
                        showMessage('success', \`"\${companyName}" restored and now visible in the dashboard and overview.\`);
                    } else {
                        showMessage('error', data.error || 'Failed to restore company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
                }
            }

            // Handle form submission
            document.getElementById('add-company-form').addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('company-name').value.trim();
                const pipelineKey = document.getElementById('pipeline-key').value.trim();
                const networkUrl = document.getElementById('network-url').value.trim();
                const promoteUrl = document.getElementById('promote-url').value.trim();
                const notionUrl = document.getElementById('notion-url').value.trim();

                try {
                    const response = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, notionUrl })
                    });
                    const data = await response.json();
                    if (data.success) {
                        showMessage('success', \`Company "\${name}" added successfully!\`);
                        loadCompanies();
                        e.target.reset();
                        document.getElementById('form-message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } else {
                        showMessage('error', data.error || 'Failed to add company');
                    }
                } catch (err) {
                    showMessage('error', 'Network error: ' + err.message);
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

            // ── Edit Company Modal ──────────────────────────────────────────
            function openEditModal(companyKey) {
                const company = companies[companyKey];
                if (!company) return;
                const sources = company.sources || {};

                document.getElementById('edit-modal-title').textContent = company.name;
                document.getElementById('modal-edit-name').value = company.name || '';
                document.getElementById('modal-edit-pipeline').value = company.pipelineKey || '';
                document.getElementById('modal-edit-promote').value = sources.promote || '';
                document.getElementById('modal-edit-network').value = sources.network || '';
                document.getElementById('modal-edit-engage').value = sources.engage || company.url || '';
                document.getElementById('modal-edit-key').value = companyKey;
                document.getElementById('modal-msg').classList.add('hidden');
                document.getElementById('edit-modal').classList.remove('hidden');
            }

            function closeEditModal() {
                document.getElementById('edit-modal').classList.add('hidden');
            }

            async function saveEditModal(e) {
                e.preventDefault();
                const key = document.getElementById('modal-edit-key').value;
                const name = document.getElementById('modal-edit-name').value.trim();
                const pipelineKey = document.getElementById('modal-edit-pipeline').value.trim();
                const promoteUrl = document.getElementById('modal-edit-promote').value.trim();
                const networkUrl = document.getElementById('modal-edit-network').value.trim();
                const engageUrl = document.getElementById('modal-edit-engage').value.trim();
                const btn = document.getElementById('modal-save-btn');
                btn.disabled = true;
                btn.textContent = 'Saving...';
                try {
                    const res = await fetch(\`/api/companies/\${key}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, promoteUrl, networkUrl, engageUrl })
                    });
                    const data = await res.json();
                    if (data.success) {
                        companies[key] = { ...companies[key], name, pipelineKey, sources: { promote: promoteUrl, network: networkUrl, engage: engageUrl } };
                        displayCompanies(Object.values(companies));
                        closeEditModal();
                        showMessage('success', \`"\${name}" updated successfully.\`);
                    } else {
                        const msgEl = document.getElementById('modal-msg');
                        msgEl.textContent = data.error || 'Failed to save';
                        msgEl.classList.remove('hidden');
                    }
                } catch (err) {
                    const msgEl = document.getElementById('modal-msg');
                    msgEl.textContent = 'Network error: ' + err.message;
                    msgEl.classList.remove('hidden');
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Save Changes';
                }
            }

            // Load on page load
            loadCompanies();
        </script>

        <!-- Edit Company Modal — placed after script so onclick handlers can reference functions defined above -->
        <div id="edit-modal" onclick="if(event.target===this)closeEditModal()" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div class="flex items-center justify-between px-6 py-4 border-b">
                    <h3 class="text-lg font-bold text-gray-800 flex items-center">
                        <i class="fas fa-pencil-alt text-indigo-600 mr-2"></i>
                        Edit: <span id="edit-modal-title" class="ml-2"></span>
                    </h3>
                    <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
                </div>
                <form onsubmit="saveEditModal(event)" class="px-6 py-5 space-y-4">
                    <input type="hidden" id="modal-edit-key" />
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                        <input id="modal-edit-name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">
                            <i class="fas fa-key text-purple-500 mr-1"></i>Streak Pipeline Key
                        </label>
                        <input id="modal-edit-pipeline" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-400" placeholder="agxzfm1haWxmb29n..." />
                        <p class="text-xs text-gray-500 mt-1">Found in your Streak pipeline URL. Required for CRM data to load.</p>
                    </div>
                    <div class="border-t pt-3">
                        <p class="text-xs font-semibold text-gray-500 uppercase mb-3">Data Source URLs</p>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-bullhorn text-yellow-500 mr-1"></i>PROMOTE URL</label>
                                <input id="modal-edit-promote" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-yellow-400" placeholder="https://docs.google.com/spreadsheets/..." />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-users text-blue-500 mr-1"></i>NETWORK URL</label>
                                <input id="modal-edit-network" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-400" placeholder="https://docs.google.com/spreadsheets/..." />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1"><i class="fas fa-handshake text-green-500 mr-1"></i>ENGAGE URL</label>
                                <input id="modal-edit-engage" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-green-400" placeholder="https://..." />
                            </div>
                        </div>
                    </div>
                    <p id="modal-msg" class="hidden text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2"></p>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" onclick="closeEditModal()" class="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                        <button type="submit" id="modal-save-btn" class="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
    </html>
  `)
})

// Overview Page — all clients at a glance
app.get('/overview', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Overview — Gershon CRM</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            .skeleton { animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite; background-color: #e5e7eb; border-radius: 0.375rem; }
            @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
            .period-btn { transition: all 0.15s ease; cursor: pointer; }
            .period-btn.active { background: white; color: #4338ca; box-shadow: 0 1px 4px rgba(0,0,0,0.15); font-weight: 700; }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8 max-w-7xl">

            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-xl p-8 mb-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-4xl font-bold mb-4">
                            <i class="fas fa-th-large mr-3"></i>
                            Gershon CRM — Client Overview
                        </h1>
                        <div class="flex items-center space-x-3">
                            <a href="/" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-arrow-left mr-2"></i>Dashboard
                            </a>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="inline-block bg-white text-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-md tracking-wide mb-3">
                            v${__APP_VERSION__}
                        </span>
                        <p class="text-blue-100 text-sm">
                            <i class="fas fa-building mr-1"></i>All active client pipelines
                        </p>
                    </div>
                </div>
            </div>

            <!-- Period filter bar -->
            <div class="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center gap-3">
                <span class="text-gray-500 text-sm font-medium">
                    <i class="fas fa-calendar-alt mr-1"></i>Period:
                </span>
                <div class="flex bg-gray-100 rounded-lg p-1 gap-1">
                    <button class="period-btn active px-4 py-2 rounded-md text-sm" data-period="week">Last Week</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="last-month">Last Month</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="this-month">This Month</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="year">This Year</button>
                    <button class="period-btn px-4 py-2 rounded-md text-sm text-gray-600" data-period="all">All Time</button>
                </div>
                <button onclick="loadOverview(currentPeriod)" class="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    <i class="fas fa-sync-alt mr-2"></i>Refresh
                </button>
            </div>

            <!-- Summary row -->
            <div id="summary-row" class="bg-white rounded-lg shadow p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex gap-8">
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                    <div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div>
                </div>
            </div>

            <!-- Cards grid -->
            <div id="cards-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
                <div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-3 w-2/3 mb-4"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>
            </div>

            <!-- Error state -->
            <div id="error-state" class="hidden bg-red-50 border border-red-200 rounded-lg p-6 mt-4">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mr-3"></i>
                    <div>
                        <h3 class="text-red-800 font-semibold">Error Loading Overview</h3>
                        <p id="error-message" class="text-red-600 text-sm mt-1"></p>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let currentPeriod = 'week';

            document.querySelectorAll('.period-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.period-btn').forEach(b => {
                        b.classList.remove('active');
                        b.classList.add('text-gray-600');
                    });
                    btn.classList.add('active');
                    btn.classList.remove('text-gray-600');
                    currentPeriod = btn.dataset.period;
                    loadOverview(currentPeriod);
                });
            });

            function goalColor(pct) {
                if (pct >= 100) return { bar: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-700 border-green-200' };
                if (pct >= 50)  return { bar: 'bg-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
                return { bar: 'bg-red-400', text: 'text-red-600', badge: 'bg-red-100 text-red-600 border-red-200' };
            }

            function periodLabel(p) {
                return { week:'Last Week', 'last-month':'Last Month', 'this-month':'This Month', year:'This Year', all:'All Time' }[p] || p;
            }

            function renderSummary(data) {
                var avg = data.averages || {};
                document.getElementById('summary-row').innerHTML = '<div class="flex flex-wrap gap-8">'
                    + '<div>'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Leads — ' + periodLabel(data.period) + '</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.totalPeriodLeads + '</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Last 7 Days</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + (data.totalWeekLeads || 0) + '</p>'
                    + '<p class="text-xs text-gray-400">avg ' + (avg.weekLeads || 0) + '/client</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Last Month</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + (data.totalLastMonthLeads || 0) + '</p>'
                    + '<p class="text-xs text-gray-400">avg ' + (avg.lastMonthLeads || 0) + '/client</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">All-Time</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.totalAllLeads + '</p>'
                    + '</div>'
                    + '<div class="border-l border-gray-200 pl-8">'
                    + '<p class="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Active Clients</p>'
                    + '<p class="text-4xl font-extrabold text-gray-900">' + data.companies.length + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<p class="text-xs text-gray-400 mt-2 sm:mt-0">'
                    + '<i class="fas fa-clock mr-1"></i>Updated ' + new Date().toLocaleTimeString()
                    + '</p>';
            }

            function compareBadge(val, avg) {
                if (avg === 0) return '<span class="text-xs text-gray-400">—</span>';
                var diff = Math.round(((val - avg) / avg) * 100);
                if (diff > 0) return '<span class="text-xs text-green-600 font-semibold">+' + diff + '% vs avg</span>';
                if (diff < 0) return '<span class="text-xs text-red-500 font-semibold">' + diff + '% vs avg</span>';
                return '<span class="text-xs text-gray-500">= avg</span>';
            }

            var overviewAverages = {};

            function renderCards(companies) {
                var grid = document.getElementById('cards-grid');
                if (!companies.length) {
                    grid.innerHTML = '<p class="col-span-3 text-center text-gray-400 py-16 text-lg">No company data available.</p>';
                    return;
                }
                var avg = overviewAverages;
                grid.innerHTML = companies.map(function(co) {
                    var errBadge = co.error ? '<span class="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">API Error</span>' : '';

                    // KPI colors
                    function kpiColor(val, target) {
                        var pct = target > 0 ? (val / target) * 100 : 0;
                        if (pct >= 100) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', icon: 'text-green-500' };
                        if (pct >= 50)  return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', icon: 'text-yellow-500' };
                        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', bar: 'bg-red-400', icon: 'text-red-500' };
                    }

                    // Promote KPI: posts/day vs target 1/day
                    var promoteVal = co.promotePostsPerDay || 0;
                    var promoteC = kpiColor(promoteVal, 1);
                    var promotePct = Math.min(Math.round(promoteVal * 100), 100);
                    var promoteLabel = co.promoteConfigured ? promoteVal + '/day' : 'N/A';

                    // Network KPI: acceptance rate (target ~20%)
                    var networkVal = co.networkAcceptanceRate || 0;
                    var networkC = kpiColor(networkVal, 20);
                    var networkPct = Math.min(Math.round((networkVal / 20) * 100), 100);
                    var networkLabel = co.networkConfigured ? networkVal + '%' : 'N/A';

                    // Engage KPI: % of 10 meetings/month
                    var engageVal = co.engageThisMonthLeads || 0;
                    var engageC = kpiColor(engageVal, 10);
                    var engagePct = Math.min(co.engageMeetingsPct || 0, 100);
                    var engageLabel = engageVal + '/10';

                    return '<div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">'
                        + '<div class="flex items-start justify-between mb-4">'
                        + '<h3 class="text-lg font-bold text-gray-800 leading-tight">' + co.name + errBadge + '</h3>'
                        + '</div>'
                        // 3 KPI cards row
                        + '<div class="grid grid-cols-3 gap-3 mb-4">'
                        // Promote
                        + '<div class="' + promoteC.bg + ' border ' + promoteC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-bullhorn mr-1 ' + promoteC.icon + '"></i>Promote</p>'
                        + '<p class="text-xl font-extrabold ' + promoteC.text + '">' + promoteLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + promoteC.bar + ' h-1.5 rounded-full" style="width:' + promotePct + '%"></div></div>'
                        + '</div>'
                        // Network
                        + '<div class="' + networkC.bg + ' border ' + networkC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-users mr-1 ' + networkC.icon + '"></i>Network</p>'
                        + '<p class="text-xl font-extrabold ' + networkC.text + '">' + networkLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + networkC.bar + ' h-1.5 rounded-full" style="width:' + networkPct + '%"></div></div>'
                        + '</div>'
                        // Engage
                        + '<div class="' + engageC.bg + ' border ' + engageC.border + ' rounded-lg p-3 text-center">'
                        + '<p class="text-xs text-gray-500 font-semibold uppercase mb-1"><i class="fas fa-handshake mr-1 ' + engageC.icon + '"></i>Engage</p>'
                        + '<p class="text-xl font-extrabold ' + engageC.text + '">' + engageLabel + '</p>'
                        + '<div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="' + engageC.bar + ' h-1.5 rounded-full" style="width:' + engagePct + '%"></div></div>'
                        + '</div>'
                        + '</div>'
                        // Total leads summary
                        + '<p class="text-sm text-gray-500 mb-4"><i class="fas fa-database mr-1 text-gray-300"></i>' + co.totalLeads + ' total leads all time</p>'
                        + '<div class="mt-auto">'
                        + '<a href="/?company=' + co.key + '" class="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-all shadow">'
                        + '<i class="fas fa-chart-line mr-2"></i>View Dashboard'
                        + '</a>'
                        + '</div>'
                        + '</div>';
                }).join('');
            }

            async function loadOverview(period) {
                document.getElementById('error-state').classList.add('hidden');
                document.getElementById('summary-row').innerHTML = '<div class="flex gap-8"><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div><div><div class="skeleton h-4 w-32 mb-2"></div><div class="skeleton h-8 w-16"></div></div></div>';
                document.getElementById('cards-grid').innerHTML = '<div class="bg-white rounded-lg shadow p-6"><div class="skeleton h-6 w-3/4 mb-4"></div><div class="skeleton h-14 w-20 mb-3"></div><div class="skeleton h-3 w-full mb-2"></div><div class="skeleton h-2 w-full mb-4"></div><div class="skeleton h-10 w-full"></div></div>'.repeat(6);
                try {
                    const res = await fetch('/api/overview?period=' + period);
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    const data = await res.json();
                    overviewAverages = data.averages || {};
                    renderSummary(data);
                    renderCards(data.companies);
                } catch (err) {
                    document.getElementById('error-message').textContent = err.message;
                    document.getElementById('error-state').classList.remove('hidden');
                    document.getElementById('summary-row').innerHTML = '';
                    document.getElementById('cards-grid').innerHTML = '';
                }
            }

            loadOverview(currentPeriod);
        </script>
    </body>
    </html>
  `)
})

// Default route - redirect to overview unless ?company= specified
app.get('/', (c) => {
  const companyKey = c.req.query('company')
  if (!companyKey) {
    return c.redirect('/overview')
  }
  // Show dashboard for selected company
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
                        <h1 id="dashboard-title" class="text-4xl font-bold mb-3">
                            <i class="fas fa-chart-line mr-3"></i>
                            Gershon CRM - Client Dashboard
                        </h1>
                        <!-- Company Selector -->
                        <div class="flex items-center space-x-3">
                            <label for="company-selector" class="text-blue-100 text-sm font-medium">
                                <i class="fas fa-building mr-2"></i>Select Company:
                            </label>
                            <select id="company-selector" onchange="switchCompany(this.value)" class="bg-white text-gray-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md">
                                <!-- Populated dynamically from /api/companies (excludes archived) -->
                            </select>
                            <button onclick="refreshDashboard()" class="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-sync-alt mr-2"></i>Refresh
                            </button>
                            <a href="/overview" class="bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-th-large mr-2"></i>Overview
                            </a>
                            <a href="/admin" class="bg-purple-500 hover:bg-purple-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md">
                                <i class="fas fa-shield-alt mr-2"></i>Admin Panel
                            </a>
                            <a id="open-chat-btn" href="#" target="_blank" class="bg-green-500 hover:bg-green-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors shadow-md hidden">
                                <i class="fas fa-comments mr-2"></i>Open Chat
                            </a>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="mb-3">
                            <span class="inline-block bg-white text-indigo-700 font-bold text-sm px-3 py-1 rounded-full shadow-md tracking-wide">
                                v${__APP_VERSION__}
                            </span>
                        </div>
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
                            <button onclick="switchView('onboarding')" id="tab-onboarding" class="view-tab active border-b-2 border-blue-500 py-4 px-6 text-sm font-medium text-blue-600">
                                <i class="fas fa-rocket mr-2"></i>Onboarding
                            </button>
                            <button onclick="switchView('promote')" id="tab-promote" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-bullhorn mr-2"></i>PROMOTE
                            </button>
                            <button onclick="switchView('network')" id="tab-network" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-users mr-2"></i>NETWORK
                            </button>
                            <button onclick="switchView('engage')" id="tab-engage" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-handshake mr-2"></i>ENGAGE
                            </button>
                            <button onclick="switchView('print')" id="tab-print" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-print mr-2"></i>Print Report
                            </button>
                            <button onclick="switchView('settings')" id="tab-settings" class="view-tab border-b-2 border-transparent py-4 px-6 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <i class="fas fa-cog mr-2"></i>Settings
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- PROMOTE View -->
                <div id="view-promote" class="view-content hidden">
                    <!-- Platform tabs -->
                    <div class="flex space-x-2 mb-6">
                        <button onclick="switchPlatform('linkedin')" id="ptab-linkedin"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-blue-600 bg-blue-600 text-white transition-all">
                            <i class="fab fa-linkedin mr-2"></i>LinkedIn
                        </button>
                        <button onclick="switchPlatform('twitter')" id="ptab-twitter"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-300 text-gray-400 bg-white cursor-not-allowed transition-all" disabled>
                            <i class="fab fa-x-twitter mr-2"></i>Twitter / X
                            <span class="ml-2 text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                        </button>
                        <button onclick="switchPlatform('gmb')" id="ptab-gmb"
                            class="platform-tab flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-300 text-gray-400 bg-white cursor-not-allowed transition-all" disabled>
                            <i class="fab fa-google mr-2"></i>Google My Business
                            <span class="ml-2 text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                        </button>
                    </div>

                    <!-- Loading / Error states -->
                    <div id="promote-loading" class="hidden text-center py-16">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                        <p class="text-gray-500">Loading promote data...</p>
                    </div>
                    <div id="promote-error" class="hidden bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                        <p class="font-semibold text-red-800"><i class="fas fa-exclamation-circle mr-2"></i>Could not load promote data</p>
                        <p id="promote-error-msg" class="text-red-600 text-sm mt-1"></p>
                        <p class="text-xs text-red-500 mt-2">Make sure the PROMOTE URL is set in Settings for this company.</p>
                    </div>

                    <!-- LinkedIn content -->
                    <div id="promote-linkedin" class="hidden">
                        <!-- KPI highlight cards -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <!-- Followers -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-blue-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Followers Now</p>
                                <p id="p-followers-now" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-followers-growth" class="text-sm text-green-600 font-medium mt-1">—</p>
                                <p id="p-followers-start" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                            <!-- Posts / week -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-yellow-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Avg Posts / Week</p>
                                <p id="p-posts-per-week" class="text-3xl font-bold text-gray-800">—</p>
                                <div id="p-posts-goal-bar" class="mt-2"></div>
                                <p id="p-posts-total" class="text-xs text-gray-400 mt-1">—</p>
                            </div>
                            <!-- Engagement rate -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-purple-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Avg Engagement</p>
                                <p id="p-eng-rate" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-eng-total" class="text-sm text-gray-500 mt-1">—</p>
                                <p id="p-eng-breakdown" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                            <!-- Impressions -->
                            <div class="bg-white rounded-xl shadow p-5 border-t-4 border-green-500">
                                <p class="text-xs font-semibold text-gray-500 uppercase mb-1">Total Impressions</p>
                                <p id="p-impressions" class="text-3xl font-bold text-gray-800">—</p>
                                <p id="p-reach" class="text-sm text-gray-500 mt-1">—</p>
                                <p id="p-date-range" class="text-xs text-gray-400 mt-0.5">—</p>
                            </div>
                        </div>

                        <!-- Charts row 1 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <!-- Followers growth -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-user-plus text-blue-500 mr-2"></i>Follower Growth
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-followers"></canvas>
                                </div>
                            </div>
                            <!-- Weekly posts vs goal -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-1 flex items-center">
                                    <i class="fas fa-calendar-check text-yellow-500 mr-2"></i>Weekly Posts vs Goal
                                    <span class="ml-auto text-xs font-normal text-gray-400">Goal: 5/week</span>
                                </h3>
                                <div class="relative h-48 mt-3">
                                    <canvas id="p-chart-posts"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Charts row 2 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <!-- Weekly engagements -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-heart text-purple-500 mr-2"></i>Weekly Engagements
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-engagements"></canvas>
                                </div>
                            </div>
                            <!-- Weekly impressions -->
                            <div class="bg-white rounded-xl shadow p-5">
                                <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-eye text-green-500 mr-2"></i>Weekly Impressions &amp; Reach
                                </h3>
                                <div class="relative h-48">
                                    <canvas id="p-chart-impressions"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Weekly posting consistency table -->
                        <div class="bg-white rounded-xl shadow p-5">
                            <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                <i class="fas fa-table text-indigo-500 mr-2"></i>Weekly Publishing Consistency
                                <span class="ml-auto text-xs font-normal text-gray-400">
                                    <span class="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>≥5
                                    <span class="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1 ml-2"></span>3–4
                                    <span class="inline-block w-3 h-3 rounded-full bg-red-400 mr-1 ml-2"></span>&lt;3
                                </span>
                            </h3>
                            <div id="p-weekly-table" class="overflow-x-auto"></div>
                        </div>
                    </div>
                </div>

                <!-- NETWORK View -->
                <div id="view-network" class="view-content hidden">
                    <div id="network-content">
                        <!-- Network content will be populated by JavaScript -->
                    </div>
                </div>

                <!-- ENGAGE View (formerly Overview) --><div id="view-engage" class="view-content hidden">
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
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-bullhorn text-yellow-600 mr-2"></i>PROMOTE Data Source</span>
                                <span id="status-promote" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-users text-blue-600 mr-2"></i>NETWORK Data Source</span>
                                <span id="status-network" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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
                                    <label class="text-sm font-medium text-gray-700">Sheet GID (optional — extracted from URL automatically):</label>
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
                                    LinkedIn networking data from Google Sheets — paste the full URL, GID is auto-extracted
                                </p>
                            </div>
                        </div>

                        <!-- ENGAGE Source -->
                        <div class="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-handshake text-green-600 mr-2"></i>ENGAGE Data Source</span>
                                <span id="status-engage" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>URL saved</span>
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

                        <!-- GOOGLE CHAT Integration -->
                        <div class="p-6 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-comments text-indigo-600 mr-2"></i>Google Chat Integration</span>
                                <span id="status-googlechat" class="hidden text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"><i class="fas fa-check-circle mr-1"></i>Configured</span>
                            </h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Chat Space URL:</label>
                                    <input
                                        type="url"
                                        id="edit-googlechat-url"
                                        placeholder="https://chat.google.com/app/chat/AAAA-..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-external-link-alt mr-1"></i>
                                        Link to the Google Chat space — used for the "Open Chat" button
                                    </p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-700">Webhook URL:</label>
                                    <input
                                        type="url"
                                        id="edit-googlechat-webhook"
                                        placeholder="https://chat.googleapis.com/v1/spaces/..."
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                    />
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-robot mr-1"></i>
                                        Webhook endpoint for automated messages (weekly reminders)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- SCHEDULED MESSAGES -->
                        <div class="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
                                <span><i class="fas fa-paper-plane text-orange-600 mr-2"></i>Scheduled Messages</span>
                                <button type="button" onclick="addMessageRow()" class="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition-colors">
                                    <i class="fas fa-plus mr-1"></i>Add Message
                                </button>
                            </h3>
                            <p class="text-xs text-gray-600 mb-4">
                                <i class="fas fa-info-circle mr-1"></i>
                                Configure automated messages sent to this company's Google Chat. Use dynamic variables: <code class="bg-orange-100 px-1 rounded">[leads:Lead]</code>, <code class="bg-orange-100 px-1 rounded">[leads:Contacted]</code>, <code class="bg-orange-100 px-1 rounded">[leads:Qualified]</code> etc. to insert live Streak counts.
                            </p>
                            <div id="messages-list" class="space-y-4">
                                <!-- Messages populated dynamically -->
                            </div>
                            <div id="no-messages" class="text-center py-6 text-gray-400">
                                <i class="fas fa-envelope-open text-3xl mb-2"></i>
                                <p class="text-sm">No scheduled messages yet. Click "Add Message" to create one.</p>
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

                            <!-- Google Chat Webhook URL (Optional) -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-comments text-indigo-600 mr-2"></i>
                                    Google Chat Space URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="new-googlechat-url"
                                    placeholder="https://chat.google.com/app/chat/AAAA-..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Link to the Google Chat space for this company</p>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-robot text-indigo-600 mr-2"></i>
                                    Google Chat Webhook URL
                                    <span class="text-gray-400 text-xs ml-2">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="new-googlechat-webhook"
                                    placeholder="https://chat.googleapis.com/v1/spaces/..."
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                                />
                                <p class="text-xs text-gray-500 mt-1">Webhook endpoint for sending automated messages</p>
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
            <div id="view-onboarding" class="view-content">
                <div class="bg-white rounded-lg shadow p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="fas fa-rocket text-green-600 mr-3"></i>
                        <span><span id="onboarding-company-name">Company</span> Onboarding Status</span>
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

            // Company configuration
            const COMPANIES = {
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
                // Reset promote cache so new company loads fresh data
                promoteDataCache = null;
                Object.values(promoteCharts).forEach((c) => c.destroy());
                promoteCharts = {};

                // Immediately update header title from dropdown text (before data loads)
                const selector = document.getElementById('company-selector');
                selector.value = companyKey;
                const selectedOption = selector.options[selector.selectedIndex];
                const displayName = selectedOption ? selectedOption.textContent.trim() : companyKey;
                document.getElementById('dashboard-title').innerHTML = \`
                    <i class="fas fa-chart-line mr-3"></i>
                    \${displayName} - Pipeline Report
                \`;

                // Show loading state
                document.getElementById('dashboard').classList.add('hidden');
                document.getElementById('loading').classList.remove('hidden');
                document.getElementById('error').classList.add('hidden');

                // Update Google Sheets formulas for this company
                updateSheetsFormulas();

                // Update Open Chat button visibility
                updateOpenChatButton();

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
                        // Surface the actual server error (Streak API issue, missing pipeline key, etc.)
                        let detail = 'Failed to fetch company data';
                        try {
                            const errData = await response.json();
                            detail = errData.error || detail;
                        } catch (_) {}
                        throw new Error(detail);
                    }

                    const data = await response.json();
                    currentData = data;

                    // Use company name from API response (works for both hardcoded and KV companies)
                    const companyName = data.company || (COMPANIES[companyKey] && COMPANIES[companyKey].name) || companyKey;

                    // Update page title with company name
                    document.getElementById('dashboard-title').innerHTML = \`
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
                    } else if (viewName === 'promote') {
                        loadPromoteData();
                    }
                }
            }

            // ── PROMOTE Section ───────────────────────────────────────────────
            let promoteCharts = {};
            let currentPlatform = 'linkedin';
            let promoteDataCache = null;

            function switchPlatform(platform) {
                currentPlatform = platform;
                // Update tab styles
                ['linkedin','twitter','gmb'].forEach(p => {
                    const tab = document.getElementById('ptab-' + p);
                    if (!tab) return;
                    if (p === platform) {
                        tab.classList.add('border-blue-600','bg-blue-600','text-white');
                        tab.classList.remove('border-gray-300','text-gray-400','bg-white');
                    } else {
                        tab.classList.remove('border-blue-600','bg-blue-600','text-white');
                        tab.classList.add('border-gray-300','text-gray-400','bg-white');
                    }
                });
                if (promoteDataCache) renderPromoteData(promoteDataCache);
            }

            async function loadPromoteData() {
                if (promoteDataCache) { renderPromoteData(promoteDataCache); return; }
                document.getElementById('promote-loading').classList.remove('hidden');
                document.getElementById('promote-error').classList.add('hidden');
                document.getElementById('promote-linkedin').classList.add('hidden');
                try {
                    const res = await fetch(\`/api/promote?company=\${currentCompany}\`);
                    if (!res.ok) {
                        const e = await res.json();
                        throw new Error(e.error || 'Failed to load');
                    }
                    promoteDataCache = await res.json();
                    renderPromoteData(promoteDataCache);
                } catch(err) {
                    document.getElementById('promote-loading').classList.add('hidden');
                    document.getElementById('promote-error').classList.remove('hidden');
                    document.getElementById('promote-error-msg').textContent = err.message;
                }
            }

            function fmtNum(n) {
                if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
                if (n >= 1000) return (n/1000).toFixed(1) + 'K';
                return n.toString();
            }

            function renderPromoteData(data) {
                document.getElementById('promote-loading').classList.add('hidden');
                const pd = data.platforms && data.platforms[currentPlatform];

                if (!pd) {
                    document.getElementById('promote-linkedin').classList.add('hidden');
                    document.getElementById('promote-error').classList.remove('hidden');
                    document.getElementById('promote-error-msg').textContent =
                        currentPlatform === 'linkedin'
                        ? 'No LinkedIn data in this sheet.'
                        : 'No data available for this platform yet.';
                    return;
                }

                document.getElementById('promote-error').classList.add('hidden');
                document.getElementById('promote-linkedin').classList.remove('hidden');

                // KPI cards
                const growthSign = pd.followersGrowth >= 0 ? '+' : '';
                document.getElementById('p-followers-now').textContent = fmtNum(pd.followersEnd);
                document.getElementById('p-followers-growth').innerHTML =
                    \`<i class="fas fa-\${pd.followersGrowth >= 0 ? 'arrow-up text-green-600' : 'arrow-down text-red-500'}"></i> \${growthSign}\${pd.followersGrowth} (\${growthSign}\${pd.followersGrowthPct}%)\`;
                document.getElementById('p-followers-start').textContent =
                    \`Started at \${fmtNum(pd.followersStart)} · \${pd.dateRange.from} → \${pd.dateRange.to}\`;

                const postColor = pd.avgPostsPerWeek >= 5 ? 'text-green-600' : pd.avgPostsPerWeek >= 3 ? 'text-yellow-600' : 'text-red-500';
                document.getElementById('p-posts-per-week').innerHTML =
                    \`<span class="\${postColor}">\${pd.avgPostsPerWeek}</span><span class="text-base font-normal text-gray-400"> / 5</span>\`;
                const goalPct = Math.min(100, (pd.avgPostsPerWeek / 5) * 100);
                const barColor = pd.avgPostsPerWeek >= 5 ? 'bg-green-500' : pd.avgPostsPerWeek >= 3 ? 'bg-yellow-400' : 'bg-red-400';
                document.getElementById('p-posts-goal-bar').innerHTML =
                    \`<div class="w-full bg-gray-100 rounded-full h-2"><div class="\${barColor} h-2 rounded-full" style="width:\${goalPct}%"></div></div>\`;
                document.getElementById('p-posts-total').textContent = \`\${pd.totalPosts} posts total · \${pd.weeklyBreakdown.length} weeks\`;

                document.getElementById('p-eng-rate').textContent = pd.avgEngRate + '%';
                document.getElementById('p-eng-total').textContent = fmtNum(pd.totalEngagements) + ' total engagements';
                document.getElementById('p-eng-breakdown').textContent =
                    \`\${fmtNum(pd.totalLikes)} likes · \${fmtNum(pd.totalComments)} comments · \${fmtNum(pd.totalShares)} shares\`;

                document.getElementById('p-impressions').textContent = fmtNum(pd.totalImpressions);
                document.getElementById('p-reach').textContent = fmtNum(pd.totalReach) + ' unique reach';
                document.getElementById('p-date-range').textContent = \`\${pd.dateRange.from} → \${pd.dateRange.to}\`;

                // Destroy old charts
                Object.values(promoteCharts).forEach((c) => c.destroy());
                promoteCharts = {};

                const weeks = pd.weeklyBreakdown;
                const weekLabels = weeks.map((w) => {
                    const d = new Date(w.week);
                    return \`\${d.getDate()}/\${d.getMonth()+1}\`;
                });

                // Chart 1 — Follower Growth
                const followerDates = pd.dailyData.map((d) => {
                    const dt = new Date(d.date);
                    return \`\${dt.getDate()}/\${dt.getMonth()+1}\`;
                });
                promoteCharts.followers = new Chart(document.getElementById('p-chart-followers'), {
                    type: 'line',
                    data: {
                        labels: followerDates,
                        datasets: [{
                            label: 'Followers',
                            data: pd.dailyData.map((d) => d.followers),
                            borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)',
                            fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { maxTicksLimit: 8, font: { size: 10 } }, grid: { display: false } },
                            y: { ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 2 — Weekly Posts vs Goal
                const postColors = weeks.map((w) =>
                    w.posts >= 5 ? 'rgba(34,197,94,0.8)' : w.posts >= 3 ? 'rgba(234,179,8,0.8)' : 'rgba(239,68,68,0.8)');
                promoteCharts.posts = new Chart(document.getElementById('p-chart-posts'), {
                    type: 'bar',
                    data: {
                        labels: weekLabels,
                        datasets: [
                            {
                                label: 'Posts',
                                data: weeks.map((w) => w.posts),
                                backgroundColor: postColors, borderRadius: 4
                            },
                            {
                                label: 'Goal (5)',
                                data: weeks.map(() => 5),
                                type: 'line',
                                borderColor: '#ef4444', borderDash: [6,3],
                                borderWidth: 2, pointRadius: 0,
                                backgroundColor: 'transparent'
                            }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 3 — Weekly Engagements
                promoteCharts.eng = new Chart(document.getElementById('p-chart-engagements'), {
                    type: 'bar',
                    data: {
                        labels: weekLabels,
                        datasets: [{
                            label: 'Engagements',
                            data: weeks.map((w) => w.engagements),
                            backgroundColor: 'rgba(168,85,247,0.7)', borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, datalabels: { display: false } },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Chart 4 — Impressions & Reach
                promoteCharts.imp = new Chart(document.getElementById('p-chart-impressions'), {
                    type: 'line',
                    data: {
                        labels: weekLabels,
                        datasets: [
                            {
                                label: 'Impressions',
                                data: weeks.map((w) => w.impressions),
                                borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)',
                                fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2
                            },
                            {
                                label: 'Reach',
                                data: weeks.map((w) => w.reach),
                                borderColor: '#f59e0b', backgroundColor: 'transparent',
                                tension: 0.3, pointRadius: 3, borderWidth: 2, borderDash: [4,3]
                            }
                        ]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } },
                            datalabels: { display: false }
                        },
                        scales: {
                            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                        }
                    }
                });

                // Weekly consistency table
                const tableRows = weeks.map((w) => {
                    const dot = w.posts >= 5
                        ? '<span class="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"></span>'
                        : w.posts >= 3
                        ? '<span class="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>'
                        : '<span class="inline-block w-3 h-3 rounded-full bg-red-400 mr-2"></span>';
                    const bgRow = w.posts >= 5 ? 'bg-green-50' : w.posts >= 3 ? 'bg-yellow-50' : 'bg-red-50';
                    const d = new Date(w.week);
                    const weekLabel = \`Week of \${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}\`;
                    return \`<tr class="\${bgRow}">
                        <td class="px-4 py-2 text-sm font-medium text-gray-700">\${dot}\${weekLabel}</td>
                        <td class="px-4 py-2 text-center font-bold \${w.posts >= 5 ? 'text-green-700' : w.posts >= 3 ? 'text-yellow-700' : 'text-red-600'}">\${w.posts} / 5</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.impressions)}</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.engagements)}</td>
                        <td class="px-4 py-2 text-center text-sm text-gray-600">\${fmtNum(w.reach)}</td>
                    </tr>\`;
                }).join('');

                document.getElementById('p-weekly-table').innerHTML = \`
                    <table class="w-full text-left border-collapse text-sm">
                        <thead><tr class="border-b border-gray-200">
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Week</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Posts</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Impressions</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Engagements</th>
                            <th class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-center">Reach</th>
                        </tr></thead>
                        <tbody>\${tableRows}</tbody>
                    </table>\`;
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
            function saveNotionConfig() {
                const notionUrl = document.getElementById('notion-url').value.trim();
                
                if (!notionUrl) {
                    alert('Please enter a Notion.so URL');
                    return;
                }
                
                if (!notionUrl.includes('notion.so')) {
                    alert('Please enter a valid Notion.so URL');
                    return;
                }
                
                // Save to company
                const company = COMPANIES[currentCompany];
                company.notionUrl = notionUrl;
                
                // Show success message
                const statusDiv = document.getElementById('notion-status');
                statusDiv.innerHTML = \`
                    <div class="bg-green-50 border-l-4 border-green-500 p-4">
                        <p class="text-sm text-green-800">
                            <i class="fas fa-check-circle mr-2"></i>
                            <strong>Configuration Saved!</strong> Notion URL has been configured. Fetching data...
                        </p>
                    </div>
                \`;
                
                // In a real implementation, you would fetch data from Notion API here
                setTimeout(() => {
                    displayPlaceholderOnboardingData();
                }, 1000);
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

            // Update the green check badges for saved URLs
            function updateSourceStatusBadges(sources, company) {
                const badges = {
                    'status-promote': sources.promote,
                    'status-network': sources.network,
                    'status-engage': sources.engage || company.url
                };
                for (const [id, value] of Object.entries(badges)) {
                    const el = document.getElementById(id);
                    if (el) {
                        if (value) { el.classList.remove('hidden'); }
                        else { el.classList.add('hidden'); }
                    }
                }
            }

            // --- Scheduled Messages Management ---
            let messageCounter = 0;

            function addMessageRow(msg) {
                const list = document.getElementById('messages-list');
                const noMsg = document.getElementById('no-messages');
                if (noMsg) noMsg.classList.add('hidden');

                messageCounter++;
                const id = msg ? msg.id : \`msg_\${Date.now()}_\${messageCounter}\`;
                const text = msg ? msg.text : '';
                const day = msg ? msg.dayOfWeek : 'friday';
                const time = msg ? msg.time : '17:00';
                const enabled = msg ? msg.enabled !== false : true;

                const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
                const dayOptions = days.map(d => \`<option value="\${d}" \${d === day ? 'selected' : ''}>\${d.charAt(0).toUpperCase() + d.slice(1)}</option>\`).join('');

                const row = document.createElement('div');
                row.className = 'bg-white border border-orange-200 rounded-lg p-4 space-y-3';
                row.dataset.messageId = id;
                row.innerHTML = \`
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer msg-enabled" \${enabled ? 'checked' : ''}>
                                <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                            <span class="text-sm font-medium text-gray-700">\${enabled ? 'Active' : 'Paused'}</span>
                        </div>
                        <button type="button" onclick="removeMessageRow(this)" class="text-red-400 hover:text-red-600 transition-colors">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <textarea class="msg-text w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500" rows="3" placeholder="As a reminder, you still have [leads:Lead] leads at the stage of LEAD...">\${text}</textarea>
                    <div class="flex items-center space-x-3">
                        <div class="flex-1">
                            <label class="text-xs font-medium text-gray-600">Day</label>
                            <select class="msg-day w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500">
                                \${dayOptions}
                            </select>
                        </div>
                        <div class="flex-1">
                            <label class="text-xs font-medium text-gray-600">Time (EST)</label>
                            <input type="time" class="msg-time w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500" value="\${time}">
                        </div>
                    </div>
                \`;

                // Toggle label update
                const toggle = row.querySelector('.msg-enabled');
                toggle.addEventListener('change', function() {
                    this.closest('.flex').querySelector('span').textContent = this.checked ? 'Active' : 'Paused';
                });

                list.appendChild(row);
            }

            function removeMessageRow(btn) {
                const row = btn.closest('[data-message-id]');
                row.remove();
                const list = document.getElementById('messages-list');
                if (list.children.length === 0) {
                    document.getElementById('no-messages').classList.remove('hidden');
                }
            }

            function collectMessages() {
                const rows = document.querySelectorAll('#messages-list [data-message-id]');
                const messages = [];
                rows.forEach(row => {
                    messages.push({
                        id: row.dataset.messageId,
                        text: row.querySelector('.msg-text').value.trim(),
                        dayOfWeek: row.querySelector('.msg-day').value,
                        time: row.querySelector('.msg-time').value,
                        enabled: row.querySelector('.msg-enabled').checked
                    });
                });
                return messages;
            }

            function renderMessages(messages) {
                const list = document.getElementById('messages-list');
                const noMsg = document.getElementById('no-messages');
                list.innerHTML = '';
                if (!messages || messages.length === 0) {
                    noMsg.classList.remove('hidden');
                    return;
                }
                noMsg.classList.add('hidden');
                messages.forEach(msg => addMessageRow(msg));
            }

            function updateOpenChatButton() {
                const company = COMPANIES[currentCompany];
                const btn = document.getElementById('open-chat-btn');
                if (!btn) return;
                if (company && company.googleChatUrl) {
                    btn.href = company.googleChatUrl;
                    btn.classList.remove('hidden');
                } else {
                    btn.classList.add('hidden');
                }
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

                // Populate Google Chat fields
                document.getElementById('edit-googlechat-url').value = company.googleChatUrl || '';
                document.getElementById('edit-googlechat-webhook').value = company.googleChatWebhookUrl || '';

                // Show Google Chat status badge
                const gcBadge = document.getElementById('status-googlechat');
                if (company.googleChatUrl || company.googleChatWebhookUrl) {
                    gcBadge.classList.remove('hidden');
                } else {
                    gcBadge.classList.add('hidden');
                }

                // Render scheduled messages
                renderMessages(company.messages || []);

                // Show green badges for already-saved URLs
                updateSourceStatusBadges(sources, company);

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
                const googleChatUrl = document.getElementById('edit-googlechat-url').value.trim();
                const googleChatWebhookUrl = document.getElementById('edit-googlechat-webhook').value.trim();

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
                if (googleChatUrl && !isValidURL(googleChatUrl)) {
                    showEditMessage('error', 'Google Chat Space URL is not valid.');
                    return;
                }
                if (googleChatWebhookUrl && !isValidURL(googleChatWebhookUrl)) {
                    showEditMessage('error', 'Google Chat Webhook URL is not valid.');
                    return;
                }

                // Collect scheduled messages
                const messages = collectMessages();

                try {
                    const res = await fetch(\`/api/companies/\${currentCompany}\`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ promoteUrl, networkUrl, networkGid, engageUrl, googleChatUrl, googleChatWebhookUrl, messages })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Save failed');

                    // Update local object so dashboard reflects immediately
                    if (!company.sources) company.sources = {};
                    company.sources.promote = promoteUrl;
                    company.sources.network = networkUrl;
                    company.sources.engage = engageUrl || company.url;
                    if (networkGid) { company.networkSheetGid = networkGid; } else { delete company.networkSheetGid; }
                    if (engageUrl) company.url = engageUrl;
                    company.googleChatUrl = googleChatUrl || '';
                    company.googleChatWebhookUrl = googleChatWebhookUrl || '';
                    company.messages = messages;

                    // Refresh status badges
                    updateSourceStatusBadges(company.sources, company);
                    showEditMessage('success', \`Source URLs for \${company.name} saved and persisted successfully!\`);
                    loadDashboard();
                } catch (err) {
                    showEditMessage('error', \`Failed to save: \${err.message}\`);
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
            async function addNewCompany() {
                // Get form values
                const name = document.getElementById('new-company-name').value.trim();
                const key = document.getElementById('new-company-key').value.trim();
                const pipelineKey = document.getElementById('new-pipeline-key').value.trim();
                const engageUrl = document.getElementById('new-engage-url').value.trim();
                const networkUrl = document.getElementById('new-network-url').value.trim();
                const networkGid = document.getElementById('new-network-gid').value.trim();
                const promoteUrl = document.getElementById('new-promote-url').value.trim();
                const googleChatUrl = document.getElementById('new-googlechat-url').value.trim();
                const googleChatWebhookUrl = document.getElementById('new-googlechat-webhook').value.trim();

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

                // Add optional fields
                if (networkGid) newCompany.networkSheetGid = networkGid;
                if (googleChatUrl) newCompany.googleChatUrl = googleChatUrl;
                if (googleChatWebhookUrl) newCompany.googleChatWebhookUrl = googleChatWebhookUrl;

                try {
                    const res = await fetch('/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, pipelineKey, networkUrl, promoteUrl, engageUrl, networkGid, key, googleChatUrl, googleChatWebhookUrl })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Failed to add company');

                    // Add company to local COMPANIES object
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

                    updateSheetsFormulas();
                    updateSettingsView();
                    updateOpenChatButton();
                    loadDashboard();

                    showMessage('success', \`Company "\${name}" added and saved permanently!\`);
                    resetAddCompanyForm();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (err) {
                    showMessage('error', \`Failed to add company: \${err.message}\`);
                }
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
                document.getElementById('new-googlechat-url').value = '';
                document.getElementById('new-googlechat-webhook').value = '';
                
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

            // Load KV companies on startup and merge into COMPANIES + dropdown
            async function loadKVCompanies() {
                try {
                    const res = await fetch('/api/companies');
                    const data = await res.json();
                    if (!data.companies) return;
                    var selector = document.getElementById('company-selector');
                    // Clear any existing options
                    if (selector) selector.innerHTML = '';
                    data.companies.forEach(function(company) {
                        // Merge into COMPANIES object
                        if (!COMPANIES[company.key]) {
                            COMPANIES[company.key] = company;
                        } else {
                            // Override hardcoded entry with KV version (has saved URLs)
                            COMPANIES[company.key] = { ...COMPANIES[company.key], ...company };
                        }
                        // Always add to dropdown (all companies, not just KV-only)
                        if (selector) {
                            var option = document.createElement('option');
                            option.value = company.key;
                            option.textContent = company.name;
                            selector.appendChild(option);
                        }
                    });
                    // Sync currentCompany and dropdown to URL param
                    var urlParams = new URLSearchParams(window.location.search);
                    var urlCompany = urlParams.get('company');
                    if (urlCompany && COMPANIES[urlCompany]) {
                        currentCompany = urlCompany;
                        if (selector) selector.value = urlCompany;
                    } else if (selector && selector.options.length > 0) {
                        currentCompany = selector.options[0].value;
                    }
                } catch (e) {
                    console.warn('Could not load KV companies:', e);
                }
            }

            // Load dashboard on page load and setup auto-refresh
            loadKVCompanies().then(function() {
                updateSheetsFormulas();
                updateSettingsView();
                updateOnboardingView();
                updateOpenChatButton();
                loadDashboard();
            });
            setupAutoRefresh();
        </script>
    </body>
    </html>
  `)
})

export default app
