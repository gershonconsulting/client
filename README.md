# Gershon CRM - Client Dashboard v1.0.0

## Project Overview
- **Name**: Gershon CRM Client Dashboard
- **Version**: 1.0.0
- **Domain**: https://client.gershoncrm.com
- **Goal**: Multi-company pipeline tracking with three sections: PROMOTE, NETWORK (LinkedIn), and ENGAGE (Streak CRM)
- **Companies**: 10+ tracked companies with individual pipelines and 10 leads/month objective
- **Database**: Cloudflare D1 (SQLite) for persistent multi-user company management

## 🌐 Subdomain Architecture

This is part of a multi-app ecosystem on gershoncrm.com:

- **client.gershoncrm.com** - THIS APP: Client pipeline tracking and analytics
- **finance.gershoncrm.com** - Future: Financial analytics dashboard
- **Main domain** can host other services

## 📊 Tracked Companies (10)

| Company | Key | Total Leads | Duration | Achievement |
|---------|-----|-------------|----------|-------------|
| MabSilico | `mabsilico` | 1,299 | 58 months | 159% ✅ |
| Finance Montreal (Steve) | `finance-montreal` | 475 | - | 120% ✅ |
| Finance Montreal (Noza) | `finance-montreal-noza` | 161 | 18 months | - |
| Ducrocq | `ducrocq` | 745 | 39 months | 209% ✅ |
| Seekyo Therapeutics | `seekyo` | 335 | - | 198% ✅ |
| Altavia | `altavia` | 53 | - | 44% |
| Valos | `valos` | 109 | - | 91% |
| APM Music | `apm-music` | 9 | 4 months | 8% |
| Milvue | `milvue` | 23 | - | 19% |
| DAB-Embedded | `dab-embedded` | 7 | - | 6% |

**Objective**: 10 leads per month per company

## 🌐 URLs
- **Production**: https://client.gershoncrm.com
- **Sandbox**: https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai

## ✅ Features

### Three Main Sections
1. **PROMOTE** - Marketing campaigns and promotional activities (coming soon)
2. **NETWORK** - LinkedIn networking metrics with Google Sheets integration
   - Average acceptance rate tracking
   - 20% objective achievement
   - Weekly trends and comparisons
3. **ENGAGE** - Streak CRM pipeline data
   - Campaign performance summary
   - Stage distribution
   - FIT/INTEREST analysis
   - High-value opportunities

### Network Section (LinkedIn Data)
- **Average Acceptance Rate**: Calculated from Google Sheets data
- **Objective Tracking**: 20% acceptance rate target
- **Weekly Metrics**: This week vs last week comparison
- **Recent Performance**: Last 4 weeks with color-coded rates

### Dashboard Features
- **Company Selector**: Switch between 10+ companies
- **Real-time Analytics**: Live data from Streak API
- **Google Sheets Integration**: IMPORTDATA formulas for all metrics
- **Print Report**: One-click PDF export
- **Admin Panel**: Add/edit/delete companies with persistent database storage
- **Settings Tab**: Configure source URLs (PROMOTE/NETWORK/ENGAGE) per company
- **Onboarding Tab**: Track Notion.so integration status per company

## 💾 Database Architecture

### Cloudflare D1 Database
- **Name**: `gershoncrm-companies`
- **Type**: SQLite (globally distributed edge database)
- **Purpose**: Persistent multi-user company management
- **Location**: Local dev (`/.wrangler/state/v3/d1/`), Production (Cloudflare D1)

### Companies Table Schema
```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,              -- Company identifier (lowercase)
  name TEXT NOT NULL,                     -- Display name
  pipeline_key TEXT NOT NULL,             -- Streak pipeline identifier
  url TEXT NOT NULL,                      -- Main Streak URL
  promote_url TEXT,                       -- PROMOTE section URL
  network_url TEXT,                       -- NETWORK section Google Sheets URL
  network_sheet_gid TEXT,                 -- Google Sheets tab GID
  engage_url TEXT,                        -- ENGAGE section Streak URL
  notion_url TEXT,                        -- Notion onboarding page URL
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### D1 Development Commands
```bash
# Local development
npm run db:migrate:local    # Apply migrations to local D1
npm run db:seed             # Seed database with initial companies
npm run db:reset            # Reset local database
npm run db:console:local    # Execute SQL on local D1

# Production
npm run db:migrate:prod     # Apply migrations to production D1
npm run db:console:prod     # Execute SQL on production D1
```

## 🔌 API Endpoints

### Company Management (D1 Database)
```bash
# Get all companies
GET /api/companies
# Returns: { companies: [...], count: 10 }

# Add new company
POST /api/companies
Content-Type: application/json
{
  "key": "company-key",
  "name": "Company Name",
  "pipeline_key": "streak-pipeline-key",
  "url": "https://www.streak.com/...",
  "promote_url": "https://...",         // optional
  "network_url": "https://docs.google.com/...",  // optional
  "network_sheet_gid": "123456",        // optional
  "engage_url": "https://www.streak.com/...",    // optional
  "notion_url": "https://notion.so/..."  // optional
}

# Update company
PUT /api/companies/:key
Content-Type: application/json
{
  "name": "Updated Name",
  "pipeline_key": "...",
  "url": "...",
  "promote_url": "...",
  "network_url": "...",
  "network_sheet_gid": "...",
  "engage_url": "...",
  "notion_url": "..."
}

# Delete company
DELETE /api/companies/:key
# Returns: { success: true, message: "Company deleted successfully" }
```

### Company-Specific Endpoints

#### Total Leads
```bash
GET /api/sheets/{companyKey}/total
# Example: /api/sheets/mabsilico/total
# Returns: Total number of leads
```

#### Campaign Duration
```bash
GET /api/sheets/{companyKey}/duration/total
# Example: /api/sheets/mabsilico/duration/total
# Returns: Campaign duration in months
```

#### Weekly Leads
```bash
GET /api/sheets/{companyKey}/week/count
# Example: /api/sheets/apm-music/week/count
# Returns: Leads created in past 7 days
```

#### Monthly Leads
```bash
GET /api/sheets/{companyKey}/month/{YYYY-MM}/count
# Example: /api/sheets/finance-montreal/month/2026-01/count
# Returns: Leads created in specified month
```

#### Full Analytics
```bash
GET /api/analytics?company={companyKey}
# Example: /api/analytics?company=ducrocq
# Returns: Complete analytics including networkData
```

### By Stage/FIT/INTEREST
```bash
GET /api/sheets/stage/:stageName/count
GET /api/sheets/fit/:level/count          # high/medium/low
GET /api/sheets/interest/:level/count     # high/medium/low
```

## 📈 Google Sheets Integration

### Total Leads (All Companies)
```
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/finance-montreal/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/finance-montreal-noza/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/apm-music/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/ducrocq/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/milvue/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/seekyo/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/altavia/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/valos/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/dab-embedded/total")
```

### Campaign Duration
```
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/duration/total")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/ducrocq/duration/total")
```

### Weekly Leads
```
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/mabsilico/week/count")
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/apm-music/week/count")
```

### Monthly Leads
```
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/ducrocq/month/2026-01/count")
```

### Calculate Achievement %
```
=IMPORTDATA("https://client.gershoncrm.com/api/sheets/seekyo/total")/10*100
```

## 🗂️ Data Architecture

### Per-Company Configuration (from D1 Database)
Each company has:
- **Pipeline Key**: Unique Streak pipeline identifier
- **Network Sheet GID**: Google Sheets tab for LinkedIn data
- **Source URLs**: PROMOTE, NETWORK, ENGAGE section URLs
- **Notion URL**: Onboarding tracking page
- **Independent Data**: Separate tracking and objectives
- **Individual Formulas**: Auto-generated per company
- **Multi-User Support**: All users see the same companies from D1 database

### NETWORK Data (from Google Sheets)
- **Source**: CSV export from Google Sheets
- **Metrics**: Invitations sent, messages, acceptance rate, opportunities
- **Calculation**: Average acceptance rate, objective achievement (20% target)
- **Updates**: Real-time when dashboard loads

### ENGAGE Data (from Streak API)
- **FIT**: Dropdown (High, Medium, Low, Not Set)
- **INTEREST**: Dropdown (High, Medium, Low, Not Set)
- **Stage**: All pipeline stages
- **Campaign Duration**: Auto-calculated from first lead date

## 🚀 Deployment

### Local Development with D1
```bash
cd /home/user/webapp

# First time setup - create and seed D1 database
npm run db:migrate:local    # Create tables
npm run db:seed             # Load initial 10 companies

# Install dependencies and build
npm install
npm run build

# Start dev server with D1
npm run dev:sandbox
# OR use PM2 for background process
pm2 start ecosystem.config.cjs
```

### Build & Deploy to Production
```bash
cd /home/user/webapp

# Apply migrations to production D1 (first time only)
npm run db:migrate:prod

# Build and deploy
npm run build
npm run deploy:prod

# Set custom domain in Cloudflare Dashboard:
# client.gershoncrm.com → your-cloudflare-pages.pages.dev
```

### Wrangler Configuration
```jsonc
{
  "name": "gershoncrm-client",
  "compatibility_date": "2026-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "gershoncrm-companies",
      "database_id": "your-production-database-id"
    }
  ]
}
```

### DNS Setup (for Hosted Deploy)
Add CNAME record:
```
client.gershoncrm.com → your-cloudflare-pages.pages.dev
```

## 💡 Usage Guide

### For Dashboard Users
1. Open https://client.gershoncrm.com
2. Select company from dropdown (top right)
3. Choose section:
   - **PROMOTE**: Marketing campaigns (coming soon)
   - **NETWORK**: LinkedIn networking stats
   - **ENGAGE**: Streak CRM pipeline data
   - **Settings**: Configure source URLs
   - **Onboarding**: Track Notion onboarding status
4. View Google Sheets integration formulas (scroll down)

### For Administrators
1. Navigate to https://client.gershoncrm.com/admin
2. **Add New Company**:
   - Enter company name, key, and Streak pipeline key
   - Optionally configure PROMOTE, NETWORK, ENGAGE URLs
   - Changes save to D1 database immediately
   - All users will see the new company
3. **Delete Company**:
   - Click "Delete" button on company card
   - Confirm deletion
   - Company removed from database for all users
4. **View Company Data Sources**:
   - Each company card shows configured URLs
   - PROMOTE (yellow), NETWORK (blue), ENGAGE (green)

### For Google Sheets Users
1. Navigate to "Google Sheets Integration" section
2. Copy IMPORTDATA formulas for your company
3. Paste into Google Sheets
4. Data refreshes automatically

### Multi-App Setup
For other subdomains (e.g., finance.gershoncrm.com):
1. Create new app/project
2. Set up separate deployment
3. Configure DNS CNAME for subdomain
4. Deploy to Cloudflare Pages with subdomain

## 📋 Company Keys Reference

| Key | Company Name |
|-----|--------------|
| `mabsilico` | MabSilico |
| `finance-montreal` | Finance Montreal (Steve) |
| `finance-montreal-noza` | Finance Montreal (Noza) |
| `apm-music` | APM Music |
| `ducrocq` | Ducrocq |
| `milvue` | Milvue |
| `seekyo` | Seekyo Therapeutics |
| `altavia` | Altavia |
| `valos` | Valos |
| `dab-embedded` | DAB-Embedded |

## 🎯 Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main app with 3 sections + Admin Panel
├── public/
│   └── static/            # Static assets
├── migrations/            # D1 database migrations
│   └── 0001_create_companies.sql
├── dist/                  # Built application
├── seed.sql              # Initial company data
├── ecosystem.config.cjs   # PM2 config (dev only)
├── wrangler.jsonc        # Cloudflare config with D1 binding
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔧 Tech Stack
- **Backend**: Hono (Cloudflare Workers)
- **Runtime**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Charts**: Chart.js with datalabels
- **APIs**: 
  - Streak CRM REST API v1
  - Google Sheets CSV export
- **Deployment**: Cloudflare Pages with custom subdomain
- **Development**: PM2 for process management

## 📊 Network Metrics

### MabSilico Example
- **Average Acceptance Rate**: 42.5%
- **Objective**: 20%
- **Achievement**: 212.7% ✅ EXCEEDING
- **Total Invitations**: ~3,969
- **This Week**: 100% acceptance

## 🎯 Next Steps
- ✅ 10 companies tracked with D1 database
- ✅ Three-section dashboard (PROMOTE/NETWORK/ENGAGE)
- ✅ Google Sheets integration
- ✅ Campaign duration endpoint
- ✅ Subdomain ready (client.gershoncrm.com)
- ✅ Admin Panel with add/edit/delete functionality
- ✅ Settings tab for source URL configuration
- ✅ Onboarding tab for Notion integration
- ✅ Multi-user persistent storage with D1
- 📋 Add NETWORK data for other companies
- 📋 Implement PROMOTE section
- 📋 Deploy to production with D1 database
- 📋 Set up finance.gershoncrm.com subdomain

## 📞 Deployment Notes

**Current Status**: Production ready with D1 database integration
**Version**: v1.0.0
**Domain**: client.gershoncrm.com
**Database**: Cloudflare D1 (gershoncrm-companies)
**Git Commit**: 90fdd3f
**Build Size**: 204.99 kB
**Backup**: https://www.genspark.ai/api/files/s/99sV05Zj

---
**Last Updated**: 2026-03-12  
**Status**: ✅ Production Ready with D1 Database  
**Subdomain**: client.gershoncrm.com
