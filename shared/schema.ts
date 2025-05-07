import { pgTable, text, serial, integer, boolean, varchar, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories for meals
export const mealCategoryEnum = z.enum(["main", "soup", "sides", "drinks"]);
export type MealCategory = z.infer<typeof mealCategoryEnum>;

// Meals table
export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull().$type<MealCategory>(),
  featured: boolean("featured").default(false),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

export const insertMealSchema = createInsertSchema(meals).pick({
  name: true,
  description: true,
  price: true,
  image: true,
  category: true,
  featured: true,
});

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = typeof meals.$inferSelect;
