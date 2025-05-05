import React from 'react';
import ProductSwiper from './components/ProductSwiper';
import { AppProvider, useApp } from './context/AppContext';
import './App.css';

const Header: React.FC = () => {
  const { resetApp } = useApp();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Discovery</h1>
        <button
          onClick={resetApp}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Reload"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div style={{paddingTop:"env(safe-area-inset-top)"}} className="max-h-screen bg-gray-100 overflow-y-hidden">
        <Header />
        <main className="max-w-7xl mx-auto py-0.5 sm:px-2  px-0 lg:px-8">
          <div className="px-0.5  sm:px-0">
            <ProductSwiper />
          </div>
        </main>
      </div>
    </AppProvider>
  );
};

export default App;
