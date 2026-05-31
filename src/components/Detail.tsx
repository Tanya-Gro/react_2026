import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
import { Loader } from 'components';
import { Route } from 'routes';
import { DetailInfo } from './DetailInfo';
import { useDetails } from 'src/hooks/useDetails';

export const Detail = (): React.JSX.Element | null => {
  const navigate: UseNavigateResult<string> = useNavigate({ from: '/' });

  const { details, page, search } = Route.useSearch();

  const [card, isLoading] = useDetails(details);

  const handleClose = (): void => {
    navigate({
      to: '/',
      search: {
        search,
        page,
        details: undefined,
      },
    });
  };

  if (!details) {
    return null;
  }

  return (
    <aside
      aria-label="Character details"
      className="flex flex-col w-80 max-h-dvh bg-mist-50 p-2 shadow-[inset_0_25px_50px_-12px_rgba(0,0,0,0.25)]"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <DetailInfo card={card} onClose={handleClose} />
      )}
    </aside>
  );
};
