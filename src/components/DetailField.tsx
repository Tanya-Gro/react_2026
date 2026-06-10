type DetailFieldProps = {
  label: string;
  value?: string | number | string[] | null;
};

export const DetailField = ({
  label,
  value,
}: DetailFieldProps): React.JSX.Element | null => {
  if ((!value && value !== 0) || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <p className="text-[1rem] text-mist-700 w-full flex justify-between border-b border-gray-400 border-dashed">
      <strong>{label}:</strong>{' '}
      {Array.isArray(value) ? value.join(', ') : value}
    </p>
  );
};
