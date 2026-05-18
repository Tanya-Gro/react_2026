import { LINKS } from '../app/';

export const Footer = (): React.JSX.Element => {
  return (
    <footer className="border-t border-mist-300 bg-mist-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
        <a
          href={LINKS.GitHub}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="transition hover:scale-105 hover:opacity-80"
        >
          <img src="/github.svg" alt="GitHub" className="h-12 w-12" />
        </a>

        <p className="text-sm italic tracking-wide text-mist-600 md:text-lg">
          © Tanya-Gro, 2026
        </p>

        <a
          href={LINKS.RSS}
          target="_blank"
          rel="noreferrer"
          aria-label="RS School"
          className="transition hover:scale-105 hover:opacity-80"
        >
          <img
            src="/RSS.svg"
            alt="RS School"
            className="h-12 w-24 object-contain"
          />
        </a>
      </div>
    </footer>
  );
};
