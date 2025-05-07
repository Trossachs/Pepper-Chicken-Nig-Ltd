/**
 * Admin Utilities
 * This file provides utilities for managing admin data without a database
 */

// Storage key constants
const ADMIN_PROFILE_KEY = 'pepper_chicken_admin';
const ADMIN_SETTINGS_KEY = 'pepper_chicken_settings';
const ADMIN_ACTIVITY_LOG_KEY = 'pepper_chicken_activity_log';

// Default admin profile
const DEFAULT_ADMIN = {
  username: 'admin',
  fullName: 'Administrator',
  email: 'admin@pepperchicken.ng',
  role: 'admin',
  lastLogin: new Date().toISOString()
};

// Default admin settings
const DEFAULT_SETTINGS = {
  darkMode: false,
  compactView: false,
  autoSave: true,
  notificationsEnabled: true,
  exportFormat: 'json'
};

/**
 * Initialize admin data in localStorage if it doesn't exist
 */
export function initAdminData() {
  if (!localStorage.getItem(ADMIN_PROFILE_KEY)) {
    localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
  
  if (!localStorage.getItem(ADMIN_SETTINGS_KEY)) {
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  }
  
  if (!localStorage.getItem(ADMIN_ACTIVITY_LOG_KEY)) {
    localStorage.setItem(ADMIN_ACTIVITY_LOG_KEY, JSON.stringify([]));
  }
}

/**
 * Record admin activity in the log
 * @param {string} action - The action performed
 * @param {string} details - Details about the action
 */
export function logActivity(action, details) {
  const activityLog = getActivityLog();
  
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action,
    details
  };
  
  activityLog.unshift(newEntry);
  
  // Keep only the most recent 100 activities
  const trimmedLog = activityLog.slice(0, 100);
  
  localStorage.setItem(ADMIN_ACTIVITY_LOG_KEY, JSON.stringify(trimmedLog));
}

/**
 * Get the admin activity log
 * @returns {Array} The activity log array
 */
export function getActivityLog() {
  const logData = localStorage.getItem(ADMIN_ACTIVITY_LOG_KEY);
  return logData ? JSON.parse(logData) : [];
}

/**
 * Clear the activity log
 */
export function clearActivityLog() {
  localStorage.setItem(ADMIN_ACTIVITY_LOG_KEY, JSON.stringify([]));
  logActivity('System', 'Activity log cleared');
}

/**
 * Get the admin profile
 * @returns {Object} The admin profile
 */
export function getAdminProfile() {
  const profileData = localStorage.getItem(ADMIN_PROFILE_KEY);
  return profileData ? JSON.parse(profileData) : DEFAULT_ADMIN;
}

/**
 * Update the admin profile
 * @param {Object} updates - The profile fields to update
 * @returns {Object} The updated profile
 */
export function updateAdminProfile(updates) {
  const currentProfile = getAdminProfile();
  const updatedProfile = { ...currentProfile, ...updates };
  
  localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updatedProfile));
  logActivity('Profile', 'Profile information updated');
  
  return updatedProfile;
}

/**
 * Get admin settings
 * @returns {Object} The admin settings
 */
export function getAdminSettings() {
  const settingsData = localStorage.getItem(ADMIN_SETTINGS_KEY);
  return settingsData ? JSON.parse(settingsData) : DEFAULT_SETTINGS;
}

/**
 * Update admin settings
 * @param {Object} updates - The settings to update
 * @returns {Object} The updated settings
 */
export function updateAdminSettings(updates) {
  const currentSettings = getAdminSettings();
  const updatedSettings = { ...currentSettings, ...updates };
  
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(updatedSettings));
  logActivity('Settings', 'Admin settings updated');
  
  return updatedSettings;
}

/**
 * Record login event
 */
export function recordLogin() {
  updateAdminProfile({
    lastLogin: new Date().toISOString()
  });
  
  logActivity('Authentication', 'Admin logged in');
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Initialize admin data on import
initAdminData();