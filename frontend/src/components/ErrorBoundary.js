import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-18 text-center">
          <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
          <p className="mt-4 text-dark dark:text-light">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 btn-primary"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;