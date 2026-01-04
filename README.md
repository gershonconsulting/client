# MabSilico Pipeline Report

## Project Overview
- **Name**: MabSilico Pipeline Report
- **Goal**: Create a comprehensive reporting dashboard exclusively for the MabSilico Pipeline in Streak CRM
- **Pipeline Focus**: Exclusively focused on MabSilico pipeline - no multi-pipeline support
- **Key Fields**: **FIT** and **INTEREST** - the two most important fields for tracking opportunities
- **Auto-Refresh**: Automatically updates every Monday at 8:00 AM
- **Features**: 
  - Real-time analytics and visualizations
  - 3D-style bar charts with data labels for Stage and FIT
  - Multiple view tabs (Overview, By Stage, By FIT, By INTEREST, By Country, By Language, By Freshness)
  - Top origins tracking
  - High FIT/INTEREST opportunities table
  - REST API for programmatic access

## URLs
- **Development**: https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai
- **API Base**: https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api
- **GitHub**: (To be deployed)
- **Production**: (To be deployed to Cloudflare Pages)

## Currently Completed Features

### ✅ Dashboard
- **Summary Cards** (3 cards): 
  - Total boxes count (1,299)
  - High FIT percentage (12.3% of boxes)
  - Boxes with due dates percentage (for active stage boxes)
- **Multiple Views**:
  - **By Stage**: Shows number of opportunities per stage (Contacted: 323, Connected: 175, Recycled: 711, etc.)
  - **By FIT**: Displays FIT levels (High: 160, Medium: 359, Low: 305, Not Set: 475)
  - **By INTEREST**: Displays INTEREST levels (High: 154, Medium: 333, Low: 334, Not Set: 478)
  - **By Country**: Table view with country distribution (USA: 21, Germany: 4, France: 2, etc.)
  - **By Language**: Cards showing language distribution
  - **By Freshness**: Activity levels (High, Medium, Low) based on engagement metrics
- **By Stage Chart**: 3D-style bar chart with data labels showing both count and percentage on each bar for main pipeline stages
- **By FIT Chart**: 3D-style bar chart with data labels showing FIT distribution (Low: 305, Medium: 359, High: 160, Not Set: 475). Values displayed directly on bars.
- **Top Origins List**: Shows the most common lead sources
- **High FIT/INTEREST Table**: Lists up to 10 opportunities with High FIT or High INTEREST, showing stage, FIT level, INTEREST level, and last updated. Filtered to show only the most promising opportunities.

### ✅ API Endpoints

#### GET `/api/pipeline`
Returns complete pipeline information including fields, stages, and settings.
```bash
curl https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/pipeline
```

#### GET `/api/boxes`
Returns all boxes in the pipeline with full details.
```bash
curl https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/boxes
```

#### GET `/api/boxes/:boxKey`
Returns detailed information for a specific box.
```bash
curl https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/boxes/BOX_KEY
```

#### GET `/api/analytics`
Returns aggregated analytics data including:
- Total box count
- Stage distribution
- Origin distribution
- Assignee distribution
- Recent boxes summary

```bash
curl https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/analytics
```

Example Response:
```json
{
  "totalBoxes": 1299,
  "stageDistribution": {
    "Lead": 7,
    "Contacted": 323,
    "Connected": 175,
    "Recycled": 711,
    "Engaged": 10,
    "Proposal Sent": 4,
    "Call Scheduled": 33,
    "WON": 5,
    "Later Stage": 11,
    "Reconnect By GC": 20
  },
  "fitDistribution": {
    "High": 160,
    "Medium": 359,
    "Low": 305,
    "Not Set": 475
  },
  "fitPercentages": {
    "High": "12.3",
    "Medium": "27.6",
    "Low": "23.5",
    "Not Set": "36.6"
  },
  "interestDistribution": {
    "High": 154,
    "Medium": 333,
    "Low": 334,
    "Not Set": 478
  },
  "interestPercentages": {
    "High": "11.9",
    "Medium": "25.6",
    "Low": "25.7",
    "Not Set": "36.8"
  },
  "countryDistribution": {
    "Unknown": 1250,
    "USA": 21,
    "Germany": 4,
    "France": 2
  },
  "boxesWithDueDate": 0,
  "dueDatePercentage": 0
}
```

## Data Architecture
- **Data Source**: Streak CRM API v1
- **Pipeline**: MabSilico Pipeline (agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw)
- **Pipeline URL**: https://www.streak.com/a/pipelines/agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgOqI26zZCAw
- **Authentication**: API Key authentication with Streak
- **Data Models**:
  - **Boxes**: Individual deals/leads in the pipeline (1,299 total)
  - **Stages**: Pipeline stages (Lead, Contacted, Connected, Engaged, Call Scheduled, Proposal Sent, Later Stage, WON, Reconnect By GC, Recycled)
  - **Key Fields**: 
    - **FIT**: High (160), Medium (359), Low (305), Not Set (475)
    - **INTEREST**: High (154), Medium (333), Low (334), Not Set (478)
  - **Other Fields**: Country, Language, Freshness, etc.
  - **Assignees**: Team members responsible for boxes
- **Real-time**: All data fetched in real-time from Streak API

## Technologies Used
- **Backend**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers/Pages
- **Frontend**: Vanilla JavaScript with Tailwind CSS
- **Charts**: Chart.js
- **API**: Streak CRM REST API v1

## User Guide

### Viewing the Dashboard
1. Open the application URL in your browser
2. The dashboard will automatically load data from your Streak pipeline
3. **Automatic Updates**: The dashboard refreshes automatically every Monday at 8:00 AM
4. Check the "Last Updated" timestamp in the header to see when data was last refreshed
5. **Switch between views** using the navigation tabs:
   - **Overview**: See overall pipeline health and key metrics
   - **By Stage**: Analyze distribution across all 7 pipeline stages
   - **By Priority**: Focus on priority management and urgent items
   - **By Country**: View geographic distribution of your pipeline
   - **By Language**: Understand language breakdown of your deals
   - **By Freshness**: Identify boxes needing follow-up based on activity
6. Each view provides specific insights:
   - **Stage View**: Card grid showing each stage's volume and percentage
   - **Priority View**: Color-coded priority breakdown with counts
   - **Country View**: Sortable table with percentage bars
   - **Language View**: Simple language distribution cards
   - **Freshness View**: Activity levels with actionable insights

### Using the API
All API endpoints support CORS for cross-origin requests. You can integrate these endpoints into your own applications:

```javascript
// Fetch analytics data
const response = await fetch('https://3000-i6yiehgl3sjwb740jdrfw-b9b802c4.sandbox.novita.ai/api/analytics');
const analytics = await response.json();
console.log(`Total boxes: ${analytics.totalBoxes}`);
```

## Deployment
- **Platform**: Cloudflare Pages (Ready for deployment)
- **Status**: ✅ Development - Running locally
- **Tech Stack**: Hono + TypeScript + TailwindCSS + Chart.js
- **Last Updated**: 2026-01-01

## Development

### Local Setup
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# View logs
pm2 logs webapp --nostream
```

### Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main Hono application with API routes
├── public/
│   └── static/            # Static assets
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 configuration
├── wrangler.jsonc         # Cloudflare configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Features Not Yet Implemented
- [ ] Date range filtering for analytics
- [ ] Export data to CSV/Excel
- [ ] Custom report builder
- [ ] Webhook integration for real-time updates
- [ ] User authentication for multi-user access
- [ ] Advanced filtering and search
- [ ] Historical trend analysis
- [ ] Automated email reports
- [ ] Integration with other CRM systems
- [ ] Mobile responsive improvements

## Recommended Next Steps
1. **Add Date Filtering**: Implement date range selector to filter analytics by time period
2. **Export Functionality**: Add CSV/Excel export for reports
3. **Deploy to Production**: Deploy to Cloudflare Pages for public access
4. **Email Notifications**: Set up automated daily/weekly report emails
5. **Advanced Visualizations**: Add conversion funnel, time-in-stage analysis
6. **Custom Dashboards**: Allow users to create custom views and save preferences
7. **Real-time Updates**: Implement WebSocket or polling for live data updates
8. **Mobile App**: Create responsive mobile version or native app

## API Rate Limits
Streak API has the following rate limits:
- 100 requests per 15 seconds per API key
- The app caches pipeline data to minimize API calls

## Support
For issues or questions, please contact the development team.
