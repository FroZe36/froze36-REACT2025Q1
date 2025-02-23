import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <ErrorMsg />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
