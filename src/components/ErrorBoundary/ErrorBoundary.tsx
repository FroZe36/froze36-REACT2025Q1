import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMsg />;
    }

    return this.props.children;
  }
}
