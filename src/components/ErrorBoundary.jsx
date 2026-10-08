import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
          <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">Portfolio</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">The page needs a quick refresh.</h1>
            <p className="mt-4 leading-7 text-slate-600">
              Something interrupted the page while it was loading. Reload to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-cyan-500 px-7 py-3 font-semibold text-white transition hover:bg-cyan-600"
            >
              Reload portfolio
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
