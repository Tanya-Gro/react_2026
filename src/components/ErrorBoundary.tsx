'use client';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

type ErrorState = {
  shouldThrow: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  public state: ErrorState = {
    shouldThrow: true,
    errorMessage: this.props.error.message,
  };

  public static getDerivedStateFromError(error: Error): ErrorState {
    return { shouldThrow: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  public handleDismissButtonClick = (): void => {
    this.setState({ shouldThrow: false, errorMessage: '' });
    this.props.reset();
  };

  public render(): ReactNode {
    if (!this.state.shouldThrow) {
      return null;
    }

    return (
      <article
        role="alert"
        aria-live="assertive"
        className="flex flex-col items-center flex-1 justify-center min-h-[50vh]"
      >
        <h2 className="text-3xl font-bold">Something went wrong</h2>
        <p className="text-xl m-5">I regret the inconvenience.</p>
        <p className="text-lg m-2 text-red-500">{this.state.errorMessage}</p>
        <p className="text-lg m-2">Please, try Dismiss.</p>
        <div className="p-4 mt-10 justify-end">
          <button
            className="bg-olive-400 hover:bg-mist-400 cursor-pointer rounded h-10 w-30 border border-mist-500 transition-colors"
            onClick={this.handleDismissButtonClick}
          >
            Dismiss
          </button>
        </div>
      </article>
    );
  }
}
