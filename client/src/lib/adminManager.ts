// Admin Management Utilities
// This file provides utilities for managing admin data without a database

export interface AdminPreferences {
  darkMode: boolean;
  compactView: boolean;
  autoSave: boolean;
  notificationsEnabled: boolean;
}

export interface AdminProfile {
  id: number;
  username: string;
  fullName: string;
  email: string; 
  role: 'admin' | 'editor';
  avatar: string;
  lastLogin: string;
  preferences: AdminPreferences;
}

export interface AdminActivity {
  id: number;
  timestamp: string;
  action: string;
  details: string;
  userId: number;
}

// Default admin account
const DEFAULT_ADMIN: AdminProfile = {
  id: 1,
  username: 'admin',
  fullName: 'Administrator',
  email: 'admin@pepperchicken.com',
  role: 'admin',
  avatar: 'https://ui-avatars.com/api/?name=Admin&background=8B0000&color=fff',
  lastLogin: new Date().toISOString(),
  preferences: {
    darkMode: false,
    compactView: false,
    autoSave: true,
    notificationsEnabled: true
  }
};

// Storage keys
const ADMIN_PROFILE_KEY = 'pepper_chicken_admin_profile';
const ADMIN_ACTIVITIES_KEY = 'pepper_chicken_admin_activities';
const ADMIN_LOGGED_IN_KEY = 'isAdminLoggedIn';

// Initialize admin data in localStorage if it doesn't exist
export function initializeAdminData(): void {
  if (!localStorage.getItem(ADMIN_PROFILE_KEY)) {
    localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
  
  if (!localStorage.getItem(ADMIN_ACTIVITIES_KEY)) {
    localStorage.setItem(ADMIN_ACTIVITIES_KEY, JSON.stringify([]));
  }
}

// Get admin profile
export function getAdminProfile(): AdminProfile {
  const profileData = localStorage.getItem(ADMIN_PROFILE_KEY);
  return profileData ? JSON.parse(profileData) : DEFAULT_ADMIN;
}

// Update admin profile
export function updateAdminProfile(profile: Partial<AdminProfile>): AdminProfile {
  const currentProfile = getAdminProfile();
  const updatedProfile = { ...currentProfile, ...profile };
  localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updatedProfile));
  return updatedProfile;
}

// Add admin activity
export function logAdminActivity(action: string, details: string): void {
  const activities = getAdminActivities();
  const admin = getAdminProfile();
  
  const newActivity: AdminActivity = {
    id: Date.now(), // Use timestamp as unique ID
    timestamp: new Date().toISOString(),
    action,
    details,
    userId: admin.id
  };
  
  activities.unshift(newActivity); // Add to beginning of array
  
  // Keep only the most recent 100 activities
  const trimmedActivities = activities.slice(0, 100);
  
  localStorage.setItem(ADMIN_ACTIVITIES_KEY, JSON.stringify(trimmedActivities));
}

// Get admin activities
export function getAdminActivities(): AdminActivity[] {
  const activitiesData = localStorage.getItem(ADMIN_ACTIVITIES_KEY);
  return activitiesData ? JSON.parse(activitiesData) : [];
}

// Clear admin activities
export function clearAdminActivities(): void {
  localStorage.setItem(ADMIN_ACTIVITIES_KEY, JSON.stringify([]));
  logAdminActivity('System', 'Activity log cleared');
}

// Admin authentication
export function authenticateAdmin(username: string, password: string): boolean {
  // Simple in-memory authentication
  if (username === 'admin' && password === 'pepperchicken2023') {
    const admin = getAdminProfile();
    updateAdminProfile({ lastLogin: new Date().toISOString() });
    localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
    logAdminActivity('Authentication', 'Admin logged in');
    return true;
  }
  return false;
}

// Check if admin is logged in
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_LOGGED_IN_KEY) === 'true';
}

// Logout admin
export function logoutAdmin(): void {
  logAdminActivity('Authentication', 'Admin logged out');
  localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
}

// Update admin preferences
export function updateAdminPreferences(preferences: Partial<AdminPreferences>): AdminPreferences {
  const admin = getAdminProfile();
  const updatedPreferences = { ...admin.preferences, ...preferences };
  updateAdminProfile({ preferences: updatedPreferences });
  logAdminActivity('Settings', 'Admin preferences updated');
  return updatedPreferences;
}

// Initialize admin data on import
initializeAdminData();