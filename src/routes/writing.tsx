import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/writing')({
  component: WritingLayout,
});

function WritingLayout() {
  return <Outlet />;
}
