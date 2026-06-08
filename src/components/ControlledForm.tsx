import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { formSchema, type FormValues } from 'schemas';
import { useAppDispatch, useAppSelector } from 'app';
import { addCard, addCountry } from 'features';
import { getPasswordStrength, toBase64 } from 'helpers';

type ControlledFormProps = {
  onSuccess: () => void;
};

const indicatorStyles = (isValid: boolean) =>
  `text-xs flex items-center gap-1.5 transition-colors ${isValid ? 'text-green-400' : 'text-gray-500'}`;

export const ControlledForm = ({ onSuccess }: ControlledFormProps) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((s) => s.countries.items);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      picture: undefined,
      country: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: undefined,
    },
  });

  const passwordValue = useWatch({ control, name: 'password' }) || '';

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: FormValues) => {
    let base64: string;

    try {
      base64 = await toBase64(data.picture);
    } catch {
      setError('picture', {
        type: 'manual',
        message: 'Failed to process file. Please select another one.',
      });
      return;
    }

    const formedCountry = data.country[0].toUpperCase() + data.country.slice(1);

    if (!countries.includes(formedCountry)) {
      dispatch(addCountry(formedCountry));
    }

    const { confirmPassword, ...cardData } = data;

    dispatch(
      addCard({
        card: { ...cardData, picture: base64, country: formedCountry },
      }),
    );

    onSuccess();
  };

  const inputStyles =
    'w-full mt-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm';
  const labelStyles = 'text-sm font-semibold text-gray-300';
  const errorStyles = 'text-xs text-red-500 mt-1 min-h-[16px]';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-2">
        Controlled Form
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name" className={labelStyles}>
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          autoComplete="given-name"
          className={inputStyles}
          placeholder="John Doe"
        />
        <p className={errorStyles}>{errors.name?.message ?? ''}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="age" className={labelStyles}>
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register('age', { valueAsNumber: true })}
            autoComplete="given-age"
            className={inputStyles}
            placeholder="0"
          />
          <p className={errorStyles}>{errors.age?.message ?? ''}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className={labelStyles}>
            Gender
          </label>
          <select id="gender" {...register('gender')} className={inputStyles}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className={errorStyles}>{errors.gender?.message ?? ''}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          autoComplete="given-email"
          className={inputStyles}
          placeholder="example@mail.com"
        />
        <p className={errorStyles}>{errors.email?.message ?? ''}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className={labelStyles}>
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          autoComplete="given-password"
          className={inputStyles}
          placeholder="••••••••"
        />
        <p className={errorStyles}>{errors.password?.message ?? ''}</p>
      </div>

      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex flex-col gap-1.5 -mt-2 mb-1">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <div className={indicatorStyles(strength.hasNumber)}>
            <span>{strength.hasNumber ? '✓' : '○'}</span> 1 Digit
          </div>
          <div className={indicatorStyles(strength.hasUppercase)}>
            <span>{strength.hasUppercase ? '✓' : '○'}</span> 1 Uppercase
          </div>
          <div className={indicatorStyles(strength.hasLowercase)}>
            <span>{strength.hasLowercase ? '✓' : '○'}</span> 1 Lowercase
          </div>
          <div className={indicatorStyles(strength.hasSpecial)}>
            <span>{strength.hasSpecial ? '✓' : '○'}</span> 1 Special Char
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className={labelStyles}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className={inputStyles}
        />
        <p className={errorStyles}>{errors.confirmPassword?.message ?? ''}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="country" className={labelStyles}>
          Country
        </label>
        <input
          id="country"
          list="countries"
          {...register('country')}
          autoComplete="given-country"
          className={inputStyles}
          placeholder="Type or select country"
        />
        <datalist id="countries">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className={errorStyles}>{errors.country?.message ?? ''}</p>
      </div>

      <div className="flex flex-row justify-between">
        <label htmlFor="picture" className={`${labelStyles} mt-3`}>
          Profile Picture
        </label>
        <Controller
          control={control}
          name="picture"
          rules={{ required: 'Picture is required' }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col">
              <input
                type="file"
                id="picture"
                accept="image/png, image/jpeg"
                className="mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-blue-400 hover:file:bg-gray-600 file:transition-colors cursor-pointer"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              <p className={errorStyles}>{fieldState.error?.message ?? ''}</p>
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition-colors text-sm"
      >
        Submit Card
      </button>
    </form>
  );
};
