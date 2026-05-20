import { LINKS } from 'app';

export const About = (): React.JSX.Element => {
  return (
    <main className="flex flex-1 flex-col bg-mist-50 text-mist-800">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="mb-6 bg-linear-to-r from-transparent via-mist-700 to-transparent bg-clip-text text-5xl font-extrabold tracking-wide text-transparent md:text-7xl">
          Star Wars Characters
        </h1>

        <p className="max-w-4xl text-lg leading-8 text-mist-700 md:text-2xl">
          This galaxy-sized app was created by{' '}
          <strong className="font-bold text-mist-900">Tatiana Grosul</strong>{' '}
          during the{' '}
          <a
            href={LINKS.RSS}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline decoration-mauve-400 underline-offset-4 transition hover:text-mauve-600"
          >
            Rolling Scopes School
          </a>{' '}
          React 2026 Q2 course.
        </p>

        <p className="mt-6 max-w-3xl text-base italic leading-7 text-mist-600 md:text-xl">
          The mission: to master the Force of React — using class components,
          error boundaries, testing, routing, and beyond.
        </p>
      </section>
    </main>
  );
};
