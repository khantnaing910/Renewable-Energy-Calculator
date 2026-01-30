# EcoPulse | Advanced Renewable Energy Calculator

EcoPulse is a high-fidelity energy analysis dashboard built with React, Vite, and Tailwind CSS. It allows users to calculate potential energy output, financial ROI, and environmental impact for Solar, Wind, and Hydro power systems.

![EcoPulse Preview](https://raw.githubusercontent.com/khantnaing910/EcoPulseEnergy-Calculator/main/public/preview.png) *(Note: Add a preview image to your public folder if available)*

## 🚀 Live Demo
[View Live Site](https://khantnaing910.github.io/EcoPulseEnergy-Calculator/)

## ✨ Features
- **Multi-Source Analysis**: Switch between Solar, Wind, and Hydro power.
- **Dynamic Visualizations**: Real-time energy production charts using Recharts.
- **Financial Analytics**: Calculates Payback Period and ROI.
- **Environmental Impact**: Shows CO2 reduction, trees equivalent, and homes powered.
- **Responsive Design**: Mobile-first, glassmorphic UI.
- **Automated Deployment**: Integrated GitHub Actions for seamless updates.

## 🛠️ Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khantnaing910/EcoPulseEnergy-Calculator.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🚀 Deployment (CRITICAL)

To make your site live on GitHub Pages, you **must** follow these steps:

1.  **Push the code**: Ensure all latest changes are pushed to your `main` branch.
2.  **Enable Actions Deployment**:
    - Go to your repository on GitHub.
    - Click on **Settings** (top tab).
    - Select **Pages** from the left sidebar.
    - Under **Build and deployment > Source**, change the dropdown from "Deploy from a branch" to **"GitHub Actions"**.
3.  **Monitor the Build**:
    - Go to the **Actions** tab.
    - You should see a workflow named "Deploy to GitHub Pages" running.
    - Once it finishes (turns green), your site will be live!

Live URL: [https://khantnaing910.github.io/EcoPulseEnergy-Calculator/](https://khantnaing910.github.io/EcoPulseEnergy-Calculator/)

## 🧪 Why am I seeing a white screen?
If you see a white screen, it is likely because:
1. You haven't switched the Source to **GitHub Actions** in the Settings.
2. The GitHub Action build failed (check the "Actions" tab for errors).
3. You are looking at a cached version (try Shift+Refresh).

## 📄 License
This project is licensed under the MIT License.
