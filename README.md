# Global Warming Data Tracker 🌍

> This website provides up-to-date data from reliable sources such as NASA and NOAA, displayed in clear and interactive charts.

### Table of Contents
- [Data Sources](#data-sources)
- [How to Embed Charts](#how-to-embed-charts)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)


### Data Sources
All data presented on this website is sourced from trusted scientific organizations:
- NASA's Goddard Institute for Space Studies (GISS) – Temperature Anomaly Data
- NASA CERES – Climate and Radiation Data
- National Oceanic and Atmospheric Administration (NOAA) – Greenhouse Gas Trends
- Climate.gov – Sea Level Data

### How to Embed Charts
You can embed charts from this website on your own by using the provided `<iframe>` snippets available on the chart pages. This allows you to integrate dynamic climate data visualizations into your website.

**Yearly Average Temperature Anomaly**
```
https://global-warming-data.vercel.app/embed/avg-temp-anomaly
```

**Yearly Avearage Temperature**
```
https://global-warming-data.vercel.app/embed/average-temp
```
**Rate of Temperature Change**
```
https://global-warming-data.vercel.app/embed/temp-change
```
**Monthly Impact of Greenhouse Gases on Energy Balance**
```
https://global-warming-data.vercel.app/embed/greenhouse-impact
```
**Yearly Sea Level Change**
```
https://global-warming-data.vercel.app/embed/sea-level
```

### Technologies used
- Next.js for server-side rendering, API routes, and building user interfaces
- Tailwind CSS for utility-first CSS framework
- DaisyUI for pre-built Tailwind CSS components
- Recharts for data visualization

### Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/michahl/global-warming-charts.git

    cd global-warming-charts
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

4. **Open your browser:**
    Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.

5. **Build for production:**
    ```bash
    npm run build
    npm start
    ```
