import React from 'react';
import ContactForm from '@/components/ContactForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title dark:text-gray-100">
            Contact <span>Us</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Have questions or want to make a reservation? Reach out to us and we'll be happy to assist you!
          </p>
        </div>
        
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
