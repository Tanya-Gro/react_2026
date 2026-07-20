import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  beforeLoad: ({ search }) => {
    redirect({
      to: '/',
      search: search,
      throw: true,
    });
  },
});
