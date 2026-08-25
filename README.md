# 📶 International SIM Sales Dashboard

A responsive, production-ready fullstack analytics dashboard for tracking daily international roaming SIM card sales, revenue metrics, activation rates, and market performance.

Built for seamless **1-click deployment on Vercel** and easy local development with Node.js/Express.

---

## 🚀 Features

- **Key Performance Metrics**: Live cards for Total SIMs Sold, Total Revenue, Top Performing Market, and Activation Success Rate.
- **Dynamic Trend Indicators**: Contextual positive/negative performance badges and trend summaries.
- **Visual Sales Trend**: Interactive animated bar chart comparing performance across report dates.
- **Serverless API Architecture**: Zero-config Vercel Serverless Function (`/api/sales`) paired with a local Express dev server.
- **Responsive Design**: Clean UI optimized for mobile, tablet, and desktop viewports.

---

## 📁 Project Structure

```text
├── api/
│   └── sales.js         # Vercel Serverless Function handler
├── public/
│   ├── index.html       # Dashboard UI markup
│   ├── style.css        # Clean responsive styles
│   └── script.js        # Dynamic API client & chart rendering
├── .gitignore           # Ignored files (node_modules, logs, etc.)
├── package.json         # Project metadata and dependencies
├── server.js            # Local Express development server
├── vercel.json          # Vercel deployment configuration
└── README.md            # Documentation & setup guide
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Server
```bash
npm start
```
Open your browser and visit **`http://localhost:3000`**.

---

## 🐙 Step-by-Step: Push to GitHub

Follow these steps to publish this project to your GitHub account:

### 1. Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g. `sim-sales-dashboard`).
3. Choose **Public** or **Private**.
4. **Do NOT** check "Add a README file", ".gitignore", or "License" (we already have them).
5. Click **Create repository**.

### 2. Push Your Local Code to GitHub
Run the following commands in your project root terminal:

```bash
# Initialize git (if not already initialized)
git init

# Stage all files
git add .

# Commit files
git commit -m "feat: initial commit for international SIM sales dashboard"

# Rename default branch to main
git branch -M main

# Link to your GitHub repository (replace with your actual GitHub URL)
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push code to GitHub
git push -u origin main
```

---

## ⚡ Step-by-Step: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Sign in to [Vercel](https://vercel.com).
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository (`sim-sales-dashboard`).
4. Keep the default settings (Framework Preset: **Other**, Root Directory: `./`).
5. Click **"Deploy"**.
6. Your live dashboard URL will be generated instantly (e.g. `https://sim-sales-dashboard.vercel.app`)!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy project
vercel
```

---

## 📡 API Reference

### `GET /api/sales`

Retrieve sales and operational analytics for a given date.

#### Query Parameters:
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `report_date` | `string` | **Yes** | Date in `YYYY-MM-DD` format | `2026-06-30` |

#### Available Dates:
- `2026-06-27`
- `2026-06-28`
- `2026-06-29`
- `2026-06-30`

#### Example Request:
```bash
GET /api/sales?report_date=2026-06-30
```

#### Example Response (`200 OK`):
```json
{
  "report_date": "2026-06-30",
  "total_units_sold": 1400,
  "total_revenue": 910000,
  "top_country": "Saudi Arabia",
  "activation_success_rate": 93.1,
  "units_trend": "+9% vs previous day",
  "revenue_trend": "Highest revenue in period",
  "activation_status": "Very healthy operations",
  "trend_type": "positive",
  "insight": "Saudi Arabia showed strong growth with the highest revenue and healthy activation performance."
}
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
