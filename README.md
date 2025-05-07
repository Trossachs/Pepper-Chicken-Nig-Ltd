# Pepper Chicken Nigeria Ltd Website

A modern website for Pepper Chicken, a Nigerian restaurant showcasing their menu and services.

## Features

- Interactive menu with categories (main dishes, soups, sides, drinks)
- Admin panel for managing menu items
- Responsive design for all devices
- Authentication system for admin access
- Contact form for customer inquiries

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **Backend**: Express.js 
- **Authentication**: Passport.js (local strategy)
- **Data Management**: In-memory storage with JSON persistence

## Development

### Prerequisites

- Node.js (v16+)
- NPM or Yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/pepper-chicken-restaurant.git
   cd pepper-chicken-restaurant
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open http://localhost:5000 in your browser

## Deployment

### Option 1: Netlify (Recommended)

This project is set up for easy deployment to Netlify:

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Netlify will automatically build and deploy your site

For detailed instructions, see [netlify-deploy-instructions.md](netlify-deploy-instructions.md).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/pepper-chicken-restaurant)

### Option 2: Traditional Hosting

For deployment to traditional hosting providers like Whogohost, see [deploy_instructions.md](deploy_instructions.md).

## Admin Access

To access the admin panel:
- URL: `/admin`
- Username: `admin`
- Password: `pepperchicken2023`

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Static data files
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend for local development
├── shared/                # Shared code between client and server
├── netlify/               # Netlify-specific files
│   └── functions/         # Serverless functions for Netlify deployment
├── data/                  # Data storage for traditional deployment
├── .github/               # GitHub Actions workflows
│   └── workflows/         # CI/CD workflow configuration
├── deploy-package.json    # Simplified package.json for traditional hosting
├── netlify-package.json   # Package.json for Netlify deployment
├── netlify.toml           # Netlify configuration file
└── server.js              # Simple Express server for traditional hosting
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Photography: Unsplash, Pixabay
- Icons: Font Awesome, Lucide React
- UI Components: shadcn/ui