import { useNavigate } from '@tanstack/react-router';

export const NotFound = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClick: () => void = () => {
    void navigate({ to: '/' });
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black/40 px-4 text-center text-mist-100">
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle] from-transparent from-60% to-black/80" />

      <h1 className="mb-4 bg-linear-to-r from-transparent via-mist-100 to-transparent bg-clip-text text-6xl font-extrabold tracking-[3px] text-transparent md:text-8xl">
        404 - Not Found
      </h1>

      <p className="mb-8 max-w-2xl text-xl italic text-mist-200 md:text-3xl">
        This is not the page you&apos;re looking for...
      </p>

      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer rounded border border-mist-500 bg-mist-300 px-6 py-2 text-lg font-semibold text-mist-900 transition-all hover:bg-mist-400 hover:shadow-lg active:scale-95"
      >
        Back to base
      </button>
    </main>
  );
};
