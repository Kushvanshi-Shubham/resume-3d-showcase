import { Component, ReactNode } from 'react';
import Hero3DFallback from './Hero3DFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class Hero3DErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Hero3D Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Hero3DFallback />;
    }

    return this.props.children;
  }
}
