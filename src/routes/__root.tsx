
import Navigation from '@/components/navigation';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,

});

function RootLayout() {
  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-accent selection:text-white overflow-hidden">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-1"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="grow">
          <Outlet/>
        </main>
        
        <footer className="py-6 text-center text-xs text-slate-700 font-mono border-t border-slate-900/50">
          &copy; {new Date().getFullYear()} Laviz Pandey. Engineered with React.
        </footer>
      </div>
    </div>
  );
}
        // <TanStackRouterDevtools position="bottom-right" />
