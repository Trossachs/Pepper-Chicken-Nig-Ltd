import React, { useState, useEffect } from 'react';
import { getAdminSettings, updateAdminSettings } from '@/lib/adminUtils';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings
    const adminSettings = getAdminSettings();
    setSettings(adminSettings);
  }, []);

  const handleToggle = (settingName: string) => {
    if (!settings) return;
    
    const updatedSettings = updateAdminSettings({
      [settingName]: !settings[settingName]
    });
    
    setSettings(updatedSettings);
    
    toast({
      title: "Settings Updated",
      description: `${settingName} has been ${updatedSettings[settingName] ? 'enabled' : 'disabled'}`
    });
  };

  const handleExportFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!settings) return;
    
    const updatedSettings = updateAdminSettings({
      exportFormat: e.target.value
    });
    
    setSettings(updatedSettings);
    
    toast({
      title: "Settings Updated",
      description: `Export format changed to ${e.target.value}`
    });
  };

  if (!settings) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-6">Settings</h3>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Dark Mode</h4>
              <p className="text-sm text-gray-500">Enable dark mode for the admin interface</p>
            </div>
            <div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`w-12 h-6 rounded-full ${
                  settings.darkMode ? 'bg-wine-red' : 'bg-gray-300'
                } flex items-center p-1 transition-all duration-300`}
              >
                <span 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    settings.darkMode ? 'translate-x-6' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Compact View</h4>
              <p className="text-sm text-gray-500">Show more items in lists with reduced padding</p>
            </div>
            <div>
              <button
                onClick={() => handleToggle('compactView')}
                className={`w-12 h-6 rounded-full ${
                  settings.compactView ? 'bg-wine-red' : 'bg-gray-300'
                } flex items-center p-1 transition-all duration-300`}
              >
                <span 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    settings.compactView ? 'translate-x-6' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Auto Save</h4>
              <p className="text-sm text-gray-500">Automatically save changes as you edit</p>
            </div>
            <div>
              <button
                onClick={() => handleToggle('autoSave')}
                className={`w-12 h-6 rounded-full ${
                  settings.autoSave ? 'bg-wine-red' : 'bg-gray-300'
                } flex items-center p-1 transition-all duration-300`}
              >
                <span 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    settings.autoSave ? 'translate-x-6' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Notifications</h4>
              <p className="text-sm text-gray-500">Enable notifications for system events</p>
            </div>
            <div>
              <button
                onClick={() => handleToggle('notificationsEnabled')}
                className={`w-12 h-6 rounded-full ${
                  settings.notificationsEnabled ? 'bg-wine-red' : 'bg-gray-300'
                } flex items-center p-1 transition-all duration-300`}
              >
                <span 
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    settings.notificationsEnabled ? 'translate-x-6' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Export Format</h4>
          <select
            value={settings.exportFormat}
            onChange={handleExportFormatChange}
            className="w-full md:w-1/3 p-2 border rounded-md"
          >
            <option value="json">JSON</option>
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Format used when exporting menu data</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;