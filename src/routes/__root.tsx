// src/routes/__root.tsx

// 1. Only import what is necessary for a layout/route definition
import { createRootRoute, Outlet } from '@tanstack/react-router';
// Import Devtools component directly from its package
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// 2. Define the route without the shellComponent or head properties
export const Route = createRootRoute({
  // Add a component property that defines the main application layout
  component: RootLayout,

  // Good practice: Define a generic error/loading component here
  // You may need to create these components separately
  // errorComponent: MyErrorComponent,
  // pendingComponent: MyLoadingComponent,
});

// 3. Define a simple layout component
function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>

      <footer>
        <TanStackRouterDevtools position="bottom-right" />
      </footer>
    </>
  );
}
