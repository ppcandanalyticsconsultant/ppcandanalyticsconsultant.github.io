
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
