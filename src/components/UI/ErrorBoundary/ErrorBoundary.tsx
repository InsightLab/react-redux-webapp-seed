import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(`Uncaught error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <section>Sorry... something went wrong.</section>;
    }
    return this.props.children;
  }
}
