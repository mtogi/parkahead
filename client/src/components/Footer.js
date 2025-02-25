import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600">
            © {new Date().getFullYear()} ParkAhead. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-primary mx-2">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-primary mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-primary mx-2">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 