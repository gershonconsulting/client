# Gershon Consulting Pipeline Report

## Project Overview
- **Name**: Gershon Consulting Pipeline Report
- **Goal**: Create a comprehensive reporting dashboard for the GC Pipeline in Streak CRM
- **Auto-Refresh**: Automatically updates every Monday at 8:00 AM
- **Features**: 
  - Real-time analytics and visualizations
  - Stage distribution pie chart
  - Assignee workload bar chart
  - Top origins tracking
  - Recent boxes table
  - REST API for programmatic access

## URLs
- **Development**: https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai
- **API Base**: https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api
- **GitHub**: (To be deployed)

## Currently Completed Features

### ✅ Dashboard
- **Summary Cards**: 
  - Total boxes count (173)
  - Active stages count (7)
  - High priority percentage (6.4% of boxes)
  - Boxes with due dates percentage (24.7% of active stage boxes)
- **Multiple Views**:
  - **By Stage**: Shows number of opportunities per stage (e.g., Contacted: 71 opportunities)
  - **By Priority**: Displays 3 priority groups with absolute numbers only (High: 11, Medium: 54, Low: 14)
  - **By Country**: Table view with country distribution and percentages
  - **By Language**: Cards showing language distribution (English, French)
  - **By Freshness**: Activity levels (High, Medium, Low) based on engagement metrics
- **Opportunities by Stage Chart**: Colorful 3D-style bar chart showing opportunities across 7 pipeline stages
- **Opportunities by Priority Chart**: 3D-style bar chart displaying High, Medium, and Low priority counts
- **Top Origins List**: Shows the most common lead sources
- **Recent Boxes Table**: Lists the 10 most recently updated boxes with priority and due date columns

### ✅ API Endpoints

#### GET `/api/pipeline`
Returns complete pipeline information including fields, stages, and settings.
```bash
curl https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/pipeline
```

#### GET `/api/boxes`
Returns all boxes in the pipeline with full details.
```bash
curl https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/boxes
```

#### GET `/api/boxes/:boxKey`
Returns detailed information for a specific box.
```bash
curl https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/boxes/BOX_KEY
```

#### GET `/api/analytics`
Returns aggregated analytics data including:
- Total box count
- Stage distribution
- Origin distribution
- Assignee distribution
- Recent boxes summary

```bash
curl https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/analytics
```

Example Response:
```json
{
  "totalBoxes": 173,
  "stageDistribution": {
    "Closing": 9,
    "Proposal Sent": 42,
    "Scheduled": 4,
    "Negotiating": 9,
    "Nurtering": 25,
    "Contacted": 71,
    "Pitched": 13
  },
  "priorityDistribution": {
    "1. High": 11,
    "2. Medium": 54,
    "3. Low": 14,
    "No Priority": 94
  },
  "priorityPercentages": {
    "1. High": "6.4",
    "2. Medium": "31.2",
    "3. Low": "8.1",
    "No Priority": "54.3"
  },
  "boxesWithDueDate": 21,
  "dueDatePercentage": 12.1,
  "recentBoxes": [
    {
      "name": "Smart Silicon",
      "stage": "Closing",
      "priority": "1. High",
      "dueDate": "2026-01-05T17:00:00.000Z",
      "lastUpdated": "2025-12-30T20:02:23.000Z"
    }
  ]
}
```

## Data Architecture
- **Data Source**: Streak CRM API v1
- **Pipeline**: GC Pipeline (agxzfm1haWxmb29nYWVyNwsSDE9yZ2FuaXphdGlvbiIQb2F0dGlhQGdtYWlsLmNvbQwLEghXb3JrZmxvdxiAgICAwLWbCgw)
- **Authentication**: API Key authentication with Streak
- **Data Models**:
  - **Boxes**: Individual deals/leads in the pipeline
  - **Stages**: Pipeline stages (Lead, Contacted, Scheduled, Pitched, Proposal Sent, Negotiating, Closing, Nurtering)
  - **Fields**: Custom fields including Deal Size, Origin, etc.
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
const response = await fetch('https://3000-il5jzglpjys72p786w735-c81df28e.sandbox.novita.ai/api/analytics');
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
