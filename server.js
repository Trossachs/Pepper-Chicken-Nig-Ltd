import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API endpoints can be added here
app.get('/api/meals', (req, res) => {
  try {
    // Read the meals data from a file (you might want to store this in a proper database later)
    const mealsPath = join(__dirname, 'data', 'meals.json');
    if (fs.existsSync(mealsPath)) {
      const mealsData = fs.readFileSync(mealsPath, 'utf8');
      return res.json(JSON.parse(mealsData));
    }
    
    // If no file exists, return the default meals data
    return res.json([
      {
        id: 1,
        name: "Jollof Rice with Chicken",
        description: "Our signature one-pot rice dish cooked with tomatoes, peppers, and aromatic spices, served with perfectly grilled chicken.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        category: 'main',
        featured: true
      },
      {
        id: 2,
        name: "Egusi Soup with Pounded Yam",
        description: "Thick melon seed soup with assorted meat and fish, served with smooth pounded yam, a perfect Nigerian comfort food.",
        price: 4200,
        image: "https://pixabay.com/get/g50da28ee36cd41c331e6685695c15db318d17f01c5362d47a21d3d13c59afc27e8b0b6f58340b34f5adee50eef9b5713d30f17a3568dfc77510de82ba560f9ff_1280.jpg",
        category: 'soup',
        featured: true
      }
    ]);
  } catch (error) {
    console.error('Error serving meals data:', error);
    res.status(500).json({ error: 'Failed to load meals data' });
  }
});

// For any other route, serve the index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});