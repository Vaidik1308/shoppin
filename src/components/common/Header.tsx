import React from 'react'
import { useApp } from '../../context/AppContext';
import { RefreshCcw } from 'lucide-react';

const Header = () => {
    const { resetApp } = useApp();
  
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <button
            onClick={resetApp}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Reload"
          >
            <RefreshCcw className="w-6 h-6 text-gray-600 active:rotate-180 transition-transform duration-200" />
          </button>
        </div>
      </header>
    );
  };
  

export default Header