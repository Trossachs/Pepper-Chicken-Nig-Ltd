import React, { useState, useEffect } from 'react';
import { getAdminProfile, updateAdminProfile, formatDate } from '@/lib/adminUtils';
import { useToast } from '@/hooks/use-toast';

const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load profile data
    const adminProfile = getAdminProfile();
    setProfile(adminProfile);
    setFormData({
      fullName: adminProfile.fullName,
      email: adminProfile.email
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset form data to current profile when editing starts
      setFormData({
        fullName: profile.fullName,
        email: profile.email
      });
    }
  };

  const handleSave = () => {
    // Validate form
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Update profile
    const updatedProfile = updateAdminProfile({
      fullName: formData.fullName,
      email: formData.email
    });

    setProfile(updatedProfile);
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated"
    });
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Admin Profile</h3>
        <button
          onClick={handleEditToggle}
          className={`px-4 py-2 rounded-md text-sm ${
            isEditing ? 'bg-gray-200 hover:bg-gray-300' : 'bg-dark-sky-blue text-white hover:bg-opacity-90'
          }`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-32 h-32 bg-wine-red text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
            {profile.fullName.charAt(0)}
          </div>
          <p className="font-semibold">{profile.username}</p>
          <p className="text-sm text-gray-500">{profile.role}</p>
        </div>

        <div className="md:col-span-2">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-wine-red text-white rounded-md hover:bg-opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Username</p>
                <p>{profile.username}</p>
              </div>
              
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Full Name</p>
                <p>{profile.fullName}</p>
              </div>
              
              <div className="border-b pb-2">
                <p className="text-sm text-gray-500">Email</p>
                <p>{profile.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p>{formatDate(profile.lastLogin)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;