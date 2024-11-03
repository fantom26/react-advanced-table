import { ErrorBoundary } from "react-error-boundary";
import { Outlet, isRouteErrorResponse, useRouteError } from "react-router-dom";

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}

function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary fallback={<RootBoundary />}>
      <Outlet />
    </ErrorBoundary>
  );
}

export default ErrorBoundaryLayout;
