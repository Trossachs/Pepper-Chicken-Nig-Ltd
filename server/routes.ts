import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage as dbStorage } from "./storage";
import { meals } from "../client/src/data/meals";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only images
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (ext && mimetype) {
      return cb(null, true);
    }
    
    cb(new Error("Only image files are allowed"));
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/meals', (req, res) => {
    res.json(meals);
  });

  app.get('/api/meals/featured', (req, res) => {
    const featuredMeals = meals.filter(meal => meal.featured);
    res.json(featuredMeals);
  });

  app.get('/api/meals/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const meal = meals.find(meal => meal.id === id);
    
    if (meal) {
      res.json(meal);
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  });

  app.get('/api/meals/category/:category', (req, res) => {
    const category = req.params.category;
    
    if (category === 'all') {
      res.json(meals);
      return;
    }
    
    const filteredMeals = meals.filter(meal => meal.category === category);
    res.json(filteredMeals);
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and message are required" 
      });
    }
    
    // In a real app, you would save this in a database
    // For now, just return success
    res.json({ 
      success: true, 
      message: "Thank you for your message. We will get back to you shortly."
    });
  });
  


  // Static files route for uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  
  // File upload endpoint
  app.post("/api/upload", upload.single("image"), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const filePath = `/uploads/${req.file.filename}`;
      return res.status(200).json({ 
        success: true, 
        filePath,
        fullUrl: `${req.protocol}://${req.get("host")}${filePath}`
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "File upload failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
