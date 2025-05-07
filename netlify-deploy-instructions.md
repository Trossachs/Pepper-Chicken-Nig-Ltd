# Netlify Deployment Instructions for Pepper Chicken Website

This guide provides step-by-step instructions for deploying the Pepper Chicken Nigeria Ltd website to Netlify.

## Why Netlify?

Netlify offers several advantages over traditional shared hosting:

- **Free hosting** for personal and small business sites
- **Automatic builds** from your GitHub repository
- **Continuous deployment** - changes are automatically deployed when you push to your repo
- **Global CDN** for fast loading worldwide
- **Serverless functions** for backend API functionality
- **Custom domains** and HTTPS certificates

## Deployment Steps

### 1. Prepare Your GitHub Repository

1. Make sure your project is in a GitHub repository
2. Ensure all the Netlify-specific files are included:
   - `netlify.toml` (build configuration)
   - `/netlify/functions/` directory with serverless functions
   - `.github/workflows/netlify.yml` (for automated deployments)

### 1a. Set Up GitHub Actions (Optional)

For automated deployments using GitHub Actions:

1. In your GitHub repository, go to Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

To get these values:
- For `NETLIFY_AUTH_TOKEN`: Go to Netlify user settings > Applications > Personal access tokens
- For `NETLIFY_SITE_ID`: Go to your Netlify site settings > General > Site details > Site ID

### 2. Sign Up for Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign up for a free account
   - You can sign up using your GitHub account for easier integration

### 3. Create a New Site from GitHub

1. Click the "New site from Git" button in the Netlify dashboard
2. Select GitHub as your Git provider
3. Authorize Netlify to access your GitHub repositories
4. Select your Pepper Chicken repository from the list

### 4. Configure Build Settings

Netlify will automatically detect the build settings from the `netlify.toml` file, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### 5. Deploy the Site

1. Click "Deploy site" and wait for the build process to complete
2. Netlify will provide a temporary URL (like `random-name.netlify.app`)
3. You can access your site at this URL for testing

### 6. Set Up a Custom Domain (Optional)

1. In the Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name (e.g., `pepperchicken.com`)
4. Follow the instructions to update your DNS settings with your domain registrar
5. Netlify will automatically provision a free SSL certificate

### 7. Test Your Site

1. Visit your Netlify URL or custom domain
2. Test all functionality:
   - Menu display
   - Contact form
   - Admin login
   - Responsive design on different devices

## Maintaining Your Site

### Updating Content

To update your website content:

1. Make changes to your local repository
2. Commit and push to GitHub
3. Netlify will automatically detect changes and rebuild your site

### Managing Environment Variables

For any secrets or API keys:

1. Go to the Netlify dashboard > Site settings > Build & deploy > Environment
2. Add environment variables as needed

## Troubleshooting

- **Build failures:** Check the Netlify build logs for errors
- **Function errors:** Use Netlify's function logs to debug serverless functions
- **Routing issues:** Ensure redirects are properly configured in `netlify.toml`

## Quick Launch Steps

### Option 1: Direct Deploy from GitHub

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Select GitHub and authorize Netlify
5. Select your repository
6. Confirm build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
7. Click "Deploy site"

### Option 2: Drag-and-Drop Deploy (Quick Test)

If you want to test quickly without GitHub:

1. Run `npm run build` locally
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist/public` folder to the browser
4. Your site will be instantly published with a temporary URL

## Support

If you encounter issues with Netlify deployment, consult the [Netlify Support Documentation](https://docs.netlify.com/)