
import React from 'react';
import { CreditCardIcon } from './icons/CreditCardIcon';

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

export default HomePage;