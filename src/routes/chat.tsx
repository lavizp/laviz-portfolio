import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  validateSearch: (search) => ({
    prompt: (search.prompt as string) || '',
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      to: '/',
      search: { prompt: search.prompt, chat: 'open' },
    });
  },
});
