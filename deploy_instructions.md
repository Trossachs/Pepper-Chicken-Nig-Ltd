# Deployment Instructions for Pepper Chicken Nig Ltd Website

This document provides step-by-step instructions for deploying this React/Express application to Whogohost or any similar shared hosting environment.

## Prerequisites

- Access to your Whogohost account
- FTP access credentials (username and password)
- Basic familiarity with web hosting concepts

## FTP Credentials

To deploy this website, you will need your Whogohost FTP credentials:
- Host: (provided by Whogohost, typically ftp.yourdomain.com)
- Username: (your Whogohost FTP username)
- Password: (your Whogohost FTP password)

These credentials can usually be found in your Whogohost control panel.

## Deployment Steps

### Option 1: Simple HTML Deployment (For Basic Shared Hosting)

If you're having trouble with the Node.js application, you can use the simplified static HTML version:

1. **Upload the static HTML file:**
   - Connect to your Whogohost account using FTP
   - Navigate to your public directory (usually `public_html`)
   - Upload `static-version.html` and rename it to `index.html`

This provides a simple, working version of the site while you figure out a more complete solution.

### Option 2: Manual Deployment with Static Build (Recommended for Shared Hosting)

1. **Prepare the application for deployment:**
   - Before uploading to Whogohost, run these commands on your local machine or another server:
     ```bash
     npm install
     npm run build
     ```
   - This will create a `dist` directory with optimized files.

2. **Upload the build files to Whogohost:**
   - Connect to your Whogohost account using FTP
   - Navigate to the appropriate public directory (usually `public_html`)
   - Upload the contents of the `dist` directory to your hosting
   - Also upload:
     - `.htaccess` file
     - `server.js` file
     - `data` directory with `meals.json` inside
     - `deploy-package.json` (rename it to `package.json` on the server)

3. **Set up environment variables:**
   - Create a `.env` file on your hosting with any required variables
   - If your hosting supports it, set these through the control panel instead

### Option 3: Using Node.js Hosting (If Supported by Whogohost)

If your Whogohost plan supports Node.js applications:

1. **Upload the entire project:**
   - Connect to your server using FTP or SSH
   - Upload all project files excluding `node_modules` and `.git`

2. **Install dependencies and build:**
   - Connect via SSH and run:
     ```bash
     npm install
     npm run build
     ```

3. **Start the server:**
   - Use the appropriate command based on your hosting:
     ```bash
     npm start
     ```
   - Or set up a process manager like PM2 if supported

4. **Configure domain settings:**
   - Set up the domain to point to your Node.js application port
   - If using a proxy like Nginx, configure it to forward requests

## Troubleshooting

- **404 errors on routes:** Make sure your `.htaccess` file is properly configured
- **API endpoints not working:** Check that your server is properly configured to handle API requests
- **Missing CSS/JS:** Verify that all build files were properly uploaded

## Support

If you encounter issues with deployment, please reference your hosting provider's documentation or contact their support team.