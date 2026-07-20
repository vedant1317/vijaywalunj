import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-ink-900 flex items-center justify-center px-4">
    <div className="text-center text-white">
      <div className="text-9xl font-bold text-saffron-600 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-ink-300 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary text-base px-8 py-3.5 inline-block">Back to Home</Link>
    </div>
  </div>
);

export default NotFound;
