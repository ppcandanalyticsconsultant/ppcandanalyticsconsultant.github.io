import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

// --- Icon Components ---

const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
    />
  </svg>
);


// --- Page Components ---

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CreditCardIcon className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Secure Payment Gateway</h1>
        <p className="text-slate-600 mb-8 text-lg">
          Experience a seamless and secure transaction process. Click below to proceed with your payment.
        </p>
        <a
          href="https://buy.stripe.com/test_cNi7sL1J81wRa32aMt7IY00"
          className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
        >
          Start Payment
        </a>
      </div>
       <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
        <p>Powered by React & Tailwind CSS</p>
      </footer>
    </div>
  );
};


// --- Main App Component ---

function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}


// --- Root Renderer ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
