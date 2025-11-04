import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

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

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);


// --- Page Components ---

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-16">
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
         <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Us
         </Link>
      </footer>
    </div>
  );
};

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for your message, ${formData.name}! We will get back to you shortly.`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-16">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Contact Us</h1>
                <p className="text-slate-600 mb-6 text-center">We'd love to hear from you. Drop us a line below!</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your message here..."
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Navigation Component ---

const Navigation: React.FC = () => (
    <nav className="absolute top-0 left-0 p-4">
        <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors duration-300" aria-label="Home">
            <HomeIcon className="h-8 w-8" />
        </Link>
    </nav>
);

// --- Main App Component ---

function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
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
