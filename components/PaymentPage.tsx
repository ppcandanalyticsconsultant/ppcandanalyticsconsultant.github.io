import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

// Add Stripe to the window object for TypeScript
declare global {
  interface Window {
    Stripe: any;
  }
}

const PaymentPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const stripeRef = useRef<any>(null);
  const cardElementRef = useRef<any>(null);

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Effect to initialize Stripe and mount the Card Element
  useEffect(() => {
    if (window.Stripe) {
      // NOTE: Use your own Stripe publishable key. This is a public test key.
      const stripeInstance = window.Stripe('pk_test_51SPiQNGrDBzuw68Iu4cnSZeBaxmlZEkWXehPsptwLSSVUQgueRZ9l2a0v0PWlv1px1LndXt0somW3Qg6hoJjnvGa00i89hlx9d');
      stripeRef.current = stripeInstance;
      const elements = stripeInstance.elements();

      const cardStyle = {
        base: {
          color: '#1e293b', // slate-900
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#94a3b8' // slate-400
          }
        },
        invalid: {
          color: '#ef4444', // red-500
          iconColor: '#ef4444'
        }
      };

      const card = elements.create('card', { style: cardStyle });
      card.mount('#card-element');
      cardElementRef.current = card;

      return () => {
        card.destroy();
      };
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!stripeRef.current || !cardElementRef.current) {
      // Stripe.js has not loaded yet.
      setError("Stripe is not ready. Please wait a moment and try again.");
      setIsLoading(false);
      return;
    }

    // Step 1: Create a PaymentMethod on the client side.
    const { error: stripeError, paymentMethod } = await stripeRef.current.createPaymentMethod({
      type: 'card',
      card: cardElementRef.current,
      billing_details: {
        email: email,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsLoading(false);
      return;
    }

    // Step 2: Send the paymentMethod.id to your backend server.
    // This is the crucial step where the frontend communicates with your Laravel backend.
    try {
      // ======================= BACKEND COMMUNICATION =======================
      // In your Laravel app, you would create an API route (e.g., /api/charge)
      // that accepts a POST request with the paymentMethodId.
      const response = await fetch('/api/charge', { // This is your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If using Laravel Sanctum or similar for auth, include CSRF token
          // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: email,
          amount: 1000 // Example: amount in cents ($10.00)
        }),
      });

      // ======================= HANDLING THE RESPONSE =======================
      // Your Laravel backend would process the payment with your Stripe SECRET KEY
      // and then return a JSON response.
      
      // For this demo, we'll simulate the backend's response.
      // We will remove this simulation once your real backend is ready.
      const backendResponse = await simulateBackendResponse(email, response);

      if (!backendResponse.success) {
        // The backend indicates that the payment failed.
        throw new Error(backendResponse.message || 'An unknown error occurred.');
      }

      // Payment was successful! Navigate to the success page.
      navigate('/success');

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // This function simulates your Laravel backend.
  // Replace the call to this function with `await response.json()` once your backend is live.
  const simulateBackendResponse = (email: string, response: Response): Promise<{success: boolean, message?: string}> => {
    return new Promise(resolve => {
        setTimeout(() => {
          // Simple validation: for demo, fail if email includes 'fail'
          if (email.toLowerCase().includes('fail') || !email) {
            resolve({ success: false, message: 'Payment failed on the server. Please try again.' });
          } else {
            resolve({ success: true });
          }
        }, 1500); // Simulate network latency
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Enter Payment Details</h2>
          <p className="text-center text-slate-500 mb-6">Complete your transaction securely.</p>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="card-element" className="block text-sm font-medium text-slate-700 mb-1">
                  Credit or debit card
                </label>
                <div id="card-element-wrapper" className="w-full px-3 py-3 border border-slate-300 rounded-md shadow-sm bg-white">
                    <div id="card-element">
                    {/* A Stripe Element will be inserted here. */}
                    </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="h-5 w-5 mr-3" />
                  Processing...
                </>
              ) : (
                <>
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  Pay Now
                </>
              )}
            </button>
          </form>
           <div className="text-center mt-4">
            <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="Powered by Stripe" className="h-8 mx-auto opacity-60" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;