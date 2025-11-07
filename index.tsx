
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// --- Icon Components ---

// FIX: Define SVG elements as constants to work around TypeScript's "Cannot find name 'svg'" error.
const Svg = 'svg';
const Path = 'path';
const Circle = 'circle';

const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </Svg>
);

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </Svg>
);

const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <Circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></Circle>
        <Path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></Path>
    </Svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Svg>
);


// --- Page Components ---

const HomePage: React.FC = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!cvFile) {
      alert("Please select a CV to upload.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-16">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <DocumentTextIcon className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">CV Analysis & Improvement</h1>
          <p className="text-slate-600 mb-8 text-lg">
            Upload your CV to get instant feedback and take the next step in your career.
          </p>

          <div className="space-y-4">
            <label
              htmlFor="cv-upload"
              className="w-full sm:max-w-xs mx-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 px-6 rounded-lg text-lg shadow-md cursor-pointer transition-colors duration-300 flex items-center justify-center truncate"
            >
              <Svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><Path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></Svg>
              <span className="truncate">{cvFile ? cvFile.name : 'Choose your CV'}</span>
            </label>
            <input
              id="cv-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <button
              onClick={handleUpload}
              disabled={!cvFile || isLoading}
              className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload and Analyze
            </button>
          </div>
        </div>
        <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
          <p>Powered by React & Tailwind CSS</p>
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Us
          </Link>
        </footer>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <SpinnerIcon className="h-16 w-16 text-white animate-spin" />
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Create Account To Continue</h2>
            <p className="text-slate-600 mb-6">
              Your initial analysis is complete. Create an account to view your full report.
            </p>
            <a
              href="https://buy.stripe.com/test_cNi7sL1J81wRa32aMt7IY00"
              className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
            >
              Proceed to Payment
            </a>
          </div>
        </div>
      )}
    </>
  );
};

const SuccessPage: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg text-center bg-white p-8 rounded-xl shadow-lg">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Sign-up completed</h1>
        <div className="bg-slate-100 p-4 rounded-lg text-left">
          <p className="text-slate-700">
            Your CV was successfully uploaded. Upon review, we found 3 key areas of improvement; however, for best results we want to get some more information on the jobs you are applying to. Please fill these in below
          </p>
        </div>
         <Link to="/" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 ease-in-out">
              Back to Home
          </Link>
      </div>
    </div>
);

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
          <Route path="/success" element={<SuccessPage />} />
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
