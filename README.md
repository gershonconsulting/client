# Gershon Consulting - Multi-Company Pipeline Report

## Project Overview
- **Name**: Gershon Consulting Multi-Company Pipeline Report
- **Goal**: Comprehensive dashboard tracking 9 company pipelines in Streak CRM with real-time analytics and Google Sheets integration
- **Key Feature**: Each company has its own dedicated Streak pipeline with individual tracking and 10 leads/month objective

## 📊 Tracked Companies (9)

| Company | Key | Total Leads | Avg/Month | Achievement |
|---------|-----|-------------|-----------|-------------|
| MabSilico | `mabsilico` | 1,299 | 15.9 | 159% ✅ |
| Finance Montreal (Steve) | `finance-montreal` | 475 | 12.0 | 120% ✅ |
| Ducrocq | `ducrocq` | 745 | 20.9 | 209% ✅ |
| Seekyo Therapeutics | `seekyo` | 335 | 19.8 | 198% ✅ |
| Altavia | `altavia` | 53 | 4.4 | 44% |
| Valos | `valos` | 109 | 9.1 | 91% |
| APM Music | `apm-music` | 9 | 0.8 | 8% |
| Milvue | `milvue` | 23 | 1.9 | 19% |
| DAB-Embedded | `dab-embedded` | 7 | 0.6 | 6% |

**Objective**: 10 leads per month per company

## 🌐 URLs
- **Live Dashboard**: https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai
- **API Base**: https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api
- **GitHub**: (To be deployed)

## ✅ Features

### Dashboard Features
- **Summary Cards** (3 cards): 
  - Total boxes count
  - High FIT percentage
  - High INTEREST percentage
- **Multiple Views**:
  - **By Stage**: Shows number of opportunities per stage
  - **By FIT**: Displays FIT levels (High, Medium, Low, Not Set)
  - **By INTEREST**: Displays INTEREST levels (High, Medium, Low, Not Set)
  - **By Country**: Table view with country distribution
  - **By Language**: Cards showing language distribution
  - **By Freshness**: Activity-based segmentation (High >0.5, Medium 0.2-0.5, Low <0.2)
- **High Value Opportunities**: Shows boxes with High FIT or High INTEREST
- **Monthly Lead Tracking**: 10 leads/month objective with 12-month history and achievement percentages

### Multi-Company Tracking
- **Individual Pipeline Support**: Each company has its own Streak pipeline
- **Google Sheets Integration**: IMPORTDATA formulas for each company
- **Company-Specific Endpoints**: Total leads, monthly leads, and full statistics per company
- **Real-time Analytics**: Live data from Streak API for all 9 companies

## 🔌 API Endpoints

### Company Management
```bash
GET /api/companies
# Returns list of all tracked companies with keys and names
```

### Company-Specific Endpoints

#### Total Leads
```bash
GET /api/sheets/{companyKey}/total
# Example: /api/sheets/mabsilico/total
# Returns: Total number of leads for the company
```

#### Monthly Leads
```bash
GET /api/sheets/{companyKey}/month/{YYYY-MM}/count
# Example: /api/sheets/finance-montreal/month/2026-01/count
# Returns: Number of leads created in specified month
```

#### Monthly Statistics
```bash
GET /api/sheets/{companyKey}/monthly-stats
# Example: /api/sheets/ducrocq/monthly-stats
# Returns: Full 12-month statistics with objective tracking
```

### MabSilico Pipeline Endpoints (Default)
```bash
GET /api/pipeline          # Full pipeline configuration
GET /api/boxes            # All boxes with details
GET /api/boxes/:boxKey    # Single box details
GET /api/analytics        # Complete analytics for MabSilico
```

### Google Sheets Endpoints (MabSilico)
```bash
GET /api/sheets/total                    # Total boxes
GET /api/sheets/stage/:stageName/count   # By stage
GET /api/sheets/fit/:level/count        # By FIT (high/medium/low/not-set)
GET /api/sheets/interest/:level/count   # By INTEREST (high/medium/low/not-set)
GET /api/sheets/country/:country/count  # By country
GET /api/sheets/freshness/:level/count  # By freshness (high/medium/low)
```

## 📈 Google Sheets Integration Examples

### For MabSilico
```
=IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/mabsilico/total")
```

### For Finance Montreal
```
=IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/finance-montreal/total")
```

### Monthly Leads (any company)
```
=IMPORTDATA("https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/sheets/ducrocq/month/2026-01/count")
```

### Calculate Achievement %
```
=IMPORTDATA("https://.../api/sheets/seekyo/total")/10*100
```

## 🗂️ Data Architecture

### Per-Company Configuration
Each company has:
- **Pipeline Key**: Unique Streak pipeline identifier
- **Pipeline URL**: Direct link to Streak pipeline
- **Independent Data**: Separate boxes, stages, and fields
- **Individual Tracking**: Own 10 leads/month objective

### Tracked Fields (MabSilico)
- **FIT**: Dropdown (High, Medium, Low, Not Set)
- **INTEREST**: Dropdown (High, Medium, Low, Not Set)
- **Stage**: Pipeline stages
- **Origin**: Lead source
- **Country**: Geographic location
- **Language**: Communication language

## 🚀 Deployment

### Local Development
```bash
cd /home/user/webapp
npm install
npm run build
pm2 start ecosystem.config.cjs
```

### Testing Endpoints
```bash
# List all companies
curl http://localhost:3000/api/companies

# Get total leads for a company
curl http://localhost:3000/api/sheets/mabsilico/total

# Get monthly stats
curl http://localhost:3000/api/sheets/finance-montreal/monthly-stats
```

### Production Deployment
```bash
# Deploy to Cloudflare Pages
npm run deploy

# Or deploy with project name
npm run deploy:prod
```

## 💡 Usage Guide

### For Dashboard Users
1. Open the dashboard URL
2. View overall statistics for MabSilico (default view)
3. Use tabs to switch between different views (Stage, FIT, INTEREST, etc.)
4. Track high-value opportunities in the bottom table

### For Google Sheets Users
1. Copy any IMPORTDATA formula from the dashboard's "Google Sheets Integration" section
2. Paste into a Google Sheets cell
3. Data will automatically refresh when you reopen or refresh the sheet
4. Use company keys in URLs: `mabsilico`, `finance-montreal`, `ducrocq`, etc.

### For Developers
1. Use `/api/companies` to get list of all companies
2. Use `/api/sheets/{companyKey}/total` for quick counts
3. Use `/api/sheets/{companyKey}/monthly-stats` for comprehensive data
4. All endpoints return text (for IMPORTDATA) or JSON format

## 📋 Company Keys Reference

Use these keys in API URLs (lowercase, hyphenated):

- `mabsilico` → MabSilico
- `finance-montreal` → Finance Montreal (Steve)
- `apm-music` → APM Music
- `ducrocq` → Ducrocq
- `milvue` → Milvue
- `seekyo` → Seekyo Therapeutics
- `altavia` → Altavia
- `valos` → Valos
- `dab-embedded` → DAB-Embedded

## 🎯 Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main application with multi-company support
├── public/
│   └── static/
│       └── style.css      # Custom styles
├── dist/                  # Built application
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc        # Cloudflare configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Tech Stack
- **Backend**: Hono (Cloudflare Workers)
- **Runtime**: Cloudflare Pages
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Charts**: Chart.js with datalabels plugin
- **API**: Streak CRM REST API v1
- **Deployment**: Cloudflare Pages

## 📊 Performance Insights

### Top Performers (>150% objective)
1. **Ducrocq**: 209% (20.9 leads/month)
2. **Seekyo**: 198% (19.8 leads/month)
3. **MabSilico**: 159% (15.9 leads/month)

### Need Attention (<50% objective)
- **APM Music**: 8% (0.8 leads/month)
- **DAB-Embedded**: 6% (0.6 leads/month)
- **Milvue**: 19% (1.9 leads/month)
- **Altavia**: 44% (4.4 leads/month)

## 🎯 Next Steps
1. ✅ Multi-company tracking implemented
2. ✅ Individual pipeline support for 9 companies
3. ✅ Google Sheets integration per company
4. 📋 Add company comparison charts
5. 📋 Create consolidated dashboard view
6. 📋 Add company performance trends
7. 📋 Implement automated alerts for underperforming companies
8. 📋 Deploy to production Cloudflare Pages
9. 📋 Set up automated reports

## 📞 Support
For questions or issues, contact the development team.

---
**Last Updated**: 2026-01-04  
**Status**: ✅ Active - All 9 companies tracked  
**API Key**: Configured (e77554988b424c6498d85362b0367757)
