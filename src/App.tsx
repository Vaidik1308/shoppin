import React from 'react';
import ProductSwiper from './components/ProductSwiper';
import { AppProvider } from './context/AppContext';
import './App.css';
import Header from './components/common/Header';


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
