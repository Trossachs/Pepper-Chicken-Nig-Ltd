import React, { useState, useEffect } from 'react';
import { meals as initialMeals, MealType } from '@/data/meals';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import SiteSettingsEditor from '@/components/SiteSettingsEditor';
import ImageUploader from '@/components/ImageUploader';
import { logActivity } from '@/lib/adminUtils';

const Admin: React.FC = () => {
  const [meals, setMeals] = useState<MealType[]>([...initialMeals]);
  const [editingMeal, setEditingMeal] = useState<MealType | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showSiteSettings, setShowSiteSettings] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // For new meal form
  const [newMeal, setNewMeal] = useState<Omit<MealType, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'main',
    featured: false
  });

  const handleEditClick = (meal: MealType) => {
    setEditingMeal({ ...meal });
    setIsAddingNew(false);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Are you sure you want to delete this meal? This action cannot be undone.')) {
      setMeals(meals.filter(meal => meal.id !== id));
      toast({
        title: "Meal Deleted",
        description: "The meal has been removed from the menu.",
      });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingMeal) return;
    
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditingMeal({
        ...editingMeal,
        [name]: checked
      });
    } else if (name === 'price') {
      setEditingMeal({
        ...editingMeal,
        [name]: parseFloat(value) || 0
      });
    } else {
      setEditingMeal({
        ...editingMeal,
        [name]: value
      });
    }
  };

  const handleSaveEdit = () => {
    if (!editingMeal) return;
    
    setMeals(meals.map(meal => meal.id === editingMeal.id ? editingMeal : meal));
    setEditingMeal(null);
    
    toast({
      title: "Changes Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditingMeal(null);
  };

  const handleNewMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewMeal({
        ...newMeal,
        [name]: checked
      });
    } else if (name === 'price') {
      setNewMeal({
        ...newMeal,
        [name]: parseFloat(value) || 0
      });
    } else {
      setNewMeal({
        ...newMeal,
        [name]: value
      });
    }
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingMeal(null);
  };

  const handleSaveNewMeal = () => {
    // Find the highest ID and increment by 1
    const maxId = Math.max(...meals.map(meal => meal.id), 0);
    const newId = maxId + 1;
    
    const mealToAdd: MealType = {
      ...newMeal,
      id: newId
    };
    
    setMeals([...meals, mealToAdd]);
    setIsAddingNew(false);
    
    // Reset form
    setNewMeal({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'main',
      featured: false
    });
    
    toast({
      title: "Meal Added",
      description: "The new meal has been added to the preview.",
    });
  };

  const handleCancelNewMeal = () => {
    setIsAddingNew(false);
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out? Any unsaved changes will be lost.')) {
      localStorage.removeItem('isAdminLoggedIn');
      toast({
        title: "Logged Out",
        description: "You have been logged out of the admin panel",
      });
      setLocation('/login');
    }
  };



  const renderEditForm = () => {
    if (!editingMeal) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 mb-6 transition-colors duration-200">
        <h3 className="text-xl font-bold mb-4 dark:text-gray-100">Edit Meal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={editingMeal.name}
                onChange={handleEditChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Price (₦)</label>
              <input
                type="number"
                name="price"
                value={editingMeal.price}
                onChange={handleEditChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Meal Image</label>
              <ImageUploader 
                onImageUploaded={(url) => {
                  setEditingMeal({
                    ...editingMeal,
                    image: url
                  });
                }}
                currentImage={editingMeal.image}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
              <select
                name="category"
                value={editingMeal.category}
                onChange={handleEditChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              >
                <option value="main">Main Dish</option>
                <option value="soup">Soup</option>
                <option value="sides">Side Dish</option>
                <option value="drinks">Drink</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={!!editingMeal.featured}
                onChange={handleEditChange}
                className="mr-2 dark:bg-gray-700 dark:border-gray-500"
              />
              <label htmlFor="featured" className="dark:text-gray-300">Featured on homepage</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={editingMeal.description}
              onChange={handleEditChange}
              rows={8}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
            ></textarea>
            
            {/* Image preview is now handled by the ImageUploader component */}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            onClick={handleCancelEdit}
            className="px-4 py-2 border dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-wine-red text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const renderNewMealForm = () => {
    if (!isAddingNew) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 mb-6 transition-colors duration-200">
        <h3 className="text-xl font-bold mb-4 dark:text-gray-100">Add New Meal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={newMeal.name}
                onChange={handleNewMealChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Price (₦)</label>
              <input
                type="number"
                name="price"
                value={newMeal.price}
                onChange={handleNewMealChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Meal Image</label>
              <ImageUploader 
                onImageUploaded={(url) => {
                  setNewMeal({
                    ...newMeal,
                    image: url
                  });
                }}
                currentImage={newMeal.image}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
              <select
                name="category"
                value={newMeal.category}
                onChange={handleNewMealChange}
                className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
              >
                <option value="main">Main Dish</option>
                <option value="soup">Soup</option>
                <option value="sides">Side Dish</option>
                <option value="drinks">Drink</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="new-featured"
                name="featured"
                checked={!!newMeal.featured}
                onChange={handleNewMealChange}
                className="mr-2 dark:bg-gray-700 dark:border-gray-500"
              />
              <label htmlFor="new-featured" className="dark:text-gray-300">Featured on homepage</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={newMeal.description}
              onChange={handleNewMealChange}
              rows={8}
              className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
            ></textarea>
            
            {/* Image preview is now handled by the ImageUploader component */}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            onClick={handleCancelNewMeal}
            className="px-4 py-2 border dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveNewMeal}
            className="px-4 py-2 bg-wine-red text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            Add Meal
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-neutral-bg dark:bg-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="section-title dark:text-gray-100">
            Menu <span>Management</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
            Add, edit, or remove menu items. Changes are automatically saved to your account.
          </p>

          <div className="flex justify-center mb-6 flex-wrap gap-2">
            <button
              onClick={handleAddNewClick}
              className="bg-dark-sky-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 mr-3"
            >
              <i className="fas fa-plus mr-2"></i> Add New Item
            </button>
            <button
              onClick={() => {
                setShowSiteSettings(!showSiteSettings);
                setEditingMeal(null);
                setIsAddingNew(false);
                if (!showSiteSettings) {
                  logActivity('Website', 'Opened site settings editor');
                }
              }}
              className={`${showSiteSettings ? 'bg-gray-500' : 'bg-green-600'} text-white py-2 px-4 rounded-lg hover:bg-opacity-90 mr-3`}
            >
              <i className={`fas ${showSiteSettings ? 'fa-times' : 'fa-cog'} mr-2`}></i>
              {showSiteSettings ? 'Close Website Settings' : 'Edit Website'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-opacity-90"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
          
          <div className="text-left mb-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-4 rounded-lg transition-colors duration-200">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Information</h3>
            <p className="text-blue-700 dark:text-blue-400">
              All changes made in this admin panel are automatically saved to your account. Updates will be visible immediately on the website. For website layout changes, use the "Edit Website" button.
            </p>
          </div>
        </div>
        
        {showSiteSettings ? (
          <SiteSettingsEditor />
        ) : (
          <>
            {renderEditForm()}
            {renderNewMealForm()}
          </>
        )}
        
        {!showSiteSettings && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-colors duration-200">
              <thead className="bg-gray-100 dark:bg-gray-700 transition-colors duration-200">
                <tr>
                  <th className="py-3 px-4 text-left dark:text-gray-200">ID</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Image</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Name</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Price</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Category</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Featured</th>
                  <th className="py-3 px-4 text-left dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map(meal => (
                  <tr key={meal.id} className="border-t dark:border-gray-600 transition-colors duration-200">
                    <td className="py-3 px-4 dark:text-gray-300">{meal.id}</td>
                    <td className="py-3 px-4">
                      <img 
                        src={meal.image} 
                        alt={meal.name} 
                        className="w-16 h-16 object-cover rounded dark:ring-1 dark:ring-gray-600"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium dark:text-gray-300">{meal.name}</td>
                    <td className="py-3 px-4 dark:text-gray-300">₦{meal.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        meal.category === 'main' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        meal.category === 'soup' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                        meal.category === 'sides' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      } transition-colors duration-200`}>
                        {meal.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {meal.featured ? (
                        <span className="text-green-600 dark:text-green-500">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">
                          <i className="fas fa-times-circle"></i>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleEditClick(meal)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(meal.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;