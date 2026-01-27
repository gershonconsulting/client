# Gershon CRM - Client Dashboard

## Project Overview
- **Name**: Gershon CRM Client Dashboard
- **Domain**: https://client.gershoncrm.com
- **Goal**: Multi-company pipeline tracking with three sections: PROMOTE, NETWORK (LinkedIn), and ENGAGE (Streak CRM)
- **Companies**: 10 tracked companies with individual pipelines and 10 leads/month objective

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
- **Company Selector**: Switch between 10 companies
- **Real-time Analytics**: Live data from Streak API
- **Google Sheets Integration**: IMPORTDATA formulas for all metrics
- **Print Report**: One-click PDF export

## 🔌 API Endpoints

### Company Management
```bash
GET /api/companies
# Returns list of all 10 tracked companies
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

### Per-Company Configuration
Each company has:
- **Pipeline Key**: Unique Streak pipeline identifier
- **Network Sheet GID**: Google Sheets tab for LinkedIn data (MabSilico only currently)
- **Independent Data**: Separate tracking and objectives
- **Individual Formulas**: Auto-generated per company

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

### Build & Deploy
```bash
cd /home/user/webapp
npm install
npm run build

# Deploy to Cloudflare Pages
# Set custom domain: client.gershoncrm.com
```

### Wrangler Configuration
```jsonc
{
  "name": "gershoncrm-client",
  "compatibility_date": "2026-01-01",
  "pages_build_output_dir": "./dist"
}
```

### DNS Setup (for Hosted Deploy)
Add CNAME record:
```
client.gershoncrm.com → your-cloudflare-pages.pages.dev
```

## 💡 Usage Guide

### Dashboard Users
1. Open https://client.gershoncrm.com
2. Select company from dropdown (top right)
3. Choose section:
   - **PROMOTE**: Coming soon
   - **NETWORK**: LinkedIn networking stats
   - **ENGAGE**: Streak CRM pipeline data
4. View Google Sheets integration formulas (scroll down)

### Google Sheets Users
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
│   └── index.tsx          # Main app with 3 sections
├── public/
│   └── static/            # Static assets
├── dist/                  # Built application
├── ecosystem.config.cjs   # PM2 config (dev only)
├── wrangler.jsonc        # Cloudflare config
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔧 Tech Stack
- **Backend**: Hono (Cloudflare Workers)
- **Runtime**: Cloudflare Pages
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Charts**: Chart.js with datalabels
- **APIs**: 
  - Streak CRM REST API v1
  - Google Sheets CSV export
- **Deployment**: Cloudflare Pages with custom subdomain

## 📊 Network Metrics

### MabSilico Example
- **Average Acceptance Rate**: 42.5%
- **Objective**: 20%
- **Achievement**: 212.7% ✅ EXCEEDING
- **Total Invitations**: ~3,969
- **This Week**: 100% acceptance

## 🎯 Next Steps
- ✅ 10 companies tracked
- ✅ Three-section dashboard (PROMOTE/NETWORK/ENGAGE)
- ✅ Google Sheets integration
- ✅ Campaign duration endpoint
- ✅ Subdomain ready (client.gershoncrm.com)
- 📋 Add NETWORK data for other companies
- 📋 Implement PROMOTE section
- 📋 Deploy to production
- 📋 Set up finance.gershoncrm.com subdomain

## 📞 Deployment Notes

**Current Status**: Ready for production deployment
**Domain**: client.gershoncrm.com
**Git Commit**: 99fc771
**Build Size**: 126.13 kB

---
**Last Updated**: 2026-01-23  
**Status**: ✅ Production Ready  
**Subdomain**: client.gershoncrm.com
