
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
            <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-5" />
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Payment Successful!</h1>
          <p className="text-slate-600 mb-8">
            Thank you for your payment. Your transaction has been completed, and a receipt has been sent to your email address.
          </p>
          <Link
            to="/"
            className="inline-block w-full sm:w-auto bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5 duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
