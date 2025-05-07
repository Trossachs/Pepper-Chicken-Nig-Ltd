/**
 * Admin Backup Utility
 * 
 * This script provides a way to backup and restore the meals data
 * from the admin interface to the server's data directory.
 * 
 * Usage:
 *   - Export data from the Admin interface
 *   - Save the JSON file to your computer
 *   - Upload this file via FTP to the 'data' directory as 'meals.json'
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the data directory
const dataDir = path.join(__dirname, 'data');
const mealsJsonPath = path.join(dataDir, 'meals.json');

/**
 * Backup the current meals data to a timestamped file
 */
function backupMeals() {
  try {
    if (!fs.existsSync(mealsJsonPath)) {
      console.error('No meals.json file found to backup');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(dataDir, `meals-backup-${timestamp}.json`);
    
    fs.copyFileSync(mealsJsonPath, backupPath);
    console.log(`Backup created at: ${backupPath}`);
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

/**
 * Restore meals data from a backup file
 * @param {string} backupFile - The name of the backup file to restore from
 */
function restoreMeals(backupFile) {
  try {
    const backupPath = path.join(dataDir, backupFile);
    
    if (!fs.existsSync(backupPath)) {
      console.error(`Backup file not found: ${backupFile}`);
      return;
    }
    
    // Create a backup of the current state before restoring
    backupMeals();
    
    // Restore from the backup
    fs.copyFileSync(backupPath, mealsJsonPath);
    console.log(`Restored from: ${backupFile}`);
  } catch (error) {
    console.error('Restore failed:', error);
  }
}

/**
 * List all available backup files
 */
function listBackups() {
  try {
    const files = fs.readdirSync(dataDir);
    const backups = files.filter(file => file.startsWith('meals-backup-'));
    
    if (backups.length === 0) {
      console.log('No backups found');
      return;
    }
    
    console.log('Available backups:');
    backups.forEach(backup => {
      console.log(` - ${backup}`);
    });
  } catch (error) {
    console.error('Failed to list backups:', error);
  }
}

// Command line interface
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'backup':
    backupMeals();
    break;
  case 'restore':
    if (!arg) {
      console.error('Please specify a backup file to restore from');
      console.error('Usage: node admin-backup.js restore <backup-file>');
      break;
    }
    restoreMeals(arg);
    break;
  case 'list':
    listBackups();
    break;
  default:
    console.log('Pepper Chicken Admin Backup Utility');
    console.log('Usage:');
    console.log('  node admin-backup.js backup                  - Create a backup of the current meals data');
    console.log('  node admin-backup.js restore <backup-file>   - Restore meals data from a backup file');
    console.log('  node admin-backup.js list                    - List all available backups');
    break;
}