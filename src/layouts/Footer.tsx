const RSS_LINK = 'https://rs.school/react/';
const GITHUB_LINK = 'https://github.com/Tanya-Gro';

export const Footer: () => React.JSX.Element = () => {
  return (
    <footer className="border-t border-mist-300 bg-mist-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
        <a
          href={GITHUB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition hover:scale-105 hover:opacity-80"
        >
          <img src="/github.svg" alt="GitHub" className="h-12 w-12" />
        </a>

        <p className="text-sm italic tracking-wide text-mist-600 md:text-lg">
          © Tanya-Gro, 2026
        </p>

        <a
          href={RSS_LINK}
          target="_blank"
          rel="noopener noreferrer"
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
