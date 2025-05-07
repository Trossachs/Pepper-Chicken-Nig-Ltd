import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { recordLogin } from '@/lib/adminUtils';

// Simple admin credentials - in a real app these would be stored securely on a server
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'pepperchicken2023';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (isLoggedIn) {
      setLocation('/admin');
    }
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // Simulate network request
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set login state in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        // Record login in admin profile
        recordLogin();
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Redirect to admin page
        setLocation('/admin');
      } else {
        setError('Invalid username or password');
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <section className="py-16 bg-neutral-bg dark:bg-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-colors duration-200">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="section-title mb-2 dark:text-gray-100">
                Admin <span>Login</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please enter your credentials to access the admin area
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300 p-4 rounded-md mb-6 transition-colors duration-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 bg-wine-red text-white rounded-md hover:bg-opacity-90 transition duration-300 flex justify-center items-center ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                Need help? Contact the system administrator.
              </p>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 transition-colors duration-200">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <p>
                © {new Date().getFullYear()} Pepper Chicken Nig Ltd - Admin System
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;