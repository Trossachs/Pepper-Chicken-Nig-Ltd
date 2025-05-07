import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
      shakeElement('name');
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
      shakeElement('email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
      shakeElement('email');
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
      shakeElement('message');
    }

    setErrors(newErrors);
    return isValid;
  };

  const shakeElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('border-wine-red');
      element.style.animation = 'shake 0.5s';
      
      setTimeout(() => {
        element.style.animation = '';
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Show success message briefly
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Contact Form */}
      <div className="lg:w-1/2">
        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg border border-green-200 dark:border-green-700 animate-fade-in transition-colors duration-200">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Message Sent!</h3>
            <p className="text-green-700 dark:text-green-400">
              Thank you for contacting us. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-dark-text dark:text-gray-200 font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name" 
                className={`w-full p-3 border ${errors.name ? 'border-wine-red' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200`}
              />
              {errors.name && <p className="text-wine-red text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-dark-text dark:text-gray-200 font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address" 
                className={`w-full p-3 border ${errors.email ? 'border-wine-red' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200`}
              />
              {errors.email && <p className="text-wine-red text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-dark-text dark:text-gray-200 font-medium mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number" 
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-dark-text dark:text-gray-200 font-medium mb-2">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                placeholder="Your message or inquiry" 
                className={`w-full p-3 border ${errors.message ? 'border-wine-red' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-200`}
              />
              {errors.message && <p className="text-wine-red text-sm mt-1">{errors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-wine-red text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
      
      {/* Contact Information */}
      <div className="lg:w-1/2">
        <div className="bg-neutral-bg dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-xl h-full transition-colors duration-200">
          <h3 className="text-2xl font-playfair font-bold mb-6 text-dark-text dark:text-gray-100">Get in Touch</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <i className="fas fa-map-marker-alt text-wine-red text-xl w-8"></i>
              <div>
                <h4 className="font-medium text-dark-text dark:text-gray-200">Address</h4>
                <p className="text-gray-600 dark:text-gray-400">24 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <i className="fas fa-phone-alt text-wine-red text-xl w-8"></i>
              <div>
                <h4 className="font-medium text-dark-text dark:text-gray-200">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+234 812 345 6789</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <i className="fas fa-envelope text-wine-red text-xl w-8"></i>
              <div>
                <h4 className="font-medium text-dark-text dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">info@pepperchicken.ng</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <i className="fas fa-clock text-wine-red text-xl w-8"></i>
              <div>
                <h4 className="font-medium text-dark-text dark:text-gray-200">Opening Hours</h4>
                <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 11:00 AM - 10:00 PM</p>
                <p className="text-gray-600 dark:text-gray-400">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-dark-text dark:text-gray-200 mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-wine-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-wine-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-wine-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-wine-red text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
