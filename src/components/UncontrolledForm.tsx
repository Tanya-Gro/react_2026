import { useState } from 'react';
import type { JSX, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'app';
import { addCard, addCountry } from 'features';
import { formSchema } from 'schemas';
import { getPasswordStrength, toBase64 } from 'helpers';

type Props = {
  onSuccess: () => void;
};
type FormFieldError = Record<string, string>;

const indicatorStyles = (isValid: boolean) =>
  `text-xs flex items-center gap-1.5 transition-colors ${isValid ? 'text-green-600 font-medium' : 'text-gray-400'}`;

export const UncontrolledForm = ({ onSuccess }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((s) => s.countries.items);
  const [errors, setErrors] = useState<FormFieldError>({});

  const [passwordValue, setPasswordValue] = useState('');

  const strength = getPasswordStrength(passwordValue);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fileInput = e.currentTarget.elements.namedItem(
      'picture',
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    const data = {
      name: formData.get('name') as string,
      age: formData.get('age') ? Number(formData.get('age')) : 0,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as 'male' | 'female',
      country: formData.get('country') as string,
      picture: file as File,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors: FormFieldError = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0].toString();
        if (path) {
          formattedErrors[path] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    const { country, picture, ...validatedData } = result.data as any;

    if (!picture) {
      setErrors((prev) => ({ ...prev, picture: 'Picture is required' }));
      return;
    }

    let base64: string;
    try {
      base64 = await toBase64(picture);
    } catch {
      setErrors((prev) => ({
        ...prev,
        picture: 'Failed to process file. Please select another one.',
      }));
      return;
    }

    setErrors({});

    const formattedCountry = country[0].toUpperCase() + country.slice(1);

    const { confirmPassword, acceptTerms, ...cardData } = validatedData;

    dispatch(
      addCard({
        card: { ...cardData, country: formattedCountry, picture: base64 },
      }),
    );

    if (!countries.includes(formattedCountry)) {
      dispatch(addCountry(formattedCountry));
    }
    onSuccess();
  };

  const inputStyles =
    'w-full mt-1 p-2 rounded-lg border border-gray-300 bg-blue-50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm';
  const labelStyles = 'text-sm font-semibold text-gray-700';
  const errorStyles = 'text-xs text-red-500 mt-1 min-h-[16px]';

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="form"
      className="flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-2">
        Uncontrolled Form
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name" className={labelStyles}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={inputStyles}
          placeholder="John K"
        />
        <p className={errorStyles}>{errors.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="age" className={labelStyles}>
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            className={inputStyles}
            placeholder="0"
          />
          <p className={errorStyles}>{errors.age}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className={labelStyles}>
            Gender
          </label>
          <select id="gender" name="gender" className={inputStyles}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className={errorStyles}>{errors.gender}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          id="email"
          name="email"
          className={inputStyles}
          placeholder="example@mail.com"
        />
        <p className={errorStyles}>{errors.email}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className={labelStyles}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="given-password"
          className={inputStyles}
          placeholder="••••••••"
          onChange={handlePasswordChange}
        />
        <p className={errorStyles}>{errors.password}</p>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/60 flex flex-col gap-1.5 -mt-2 mb-1">
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
          name="confirmPassword"
          type="password"
          className={inputStyles}
          placeholder="••••••••"
        />
        <p className={errorStyles}>{errors.confirmPassword}</p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="country" className={labelStyles}>
          Country
        </label>
        <input
          id="country"
          name="country"
          type="text"
          list="countries"
          autoComplete="on"
          className={inputStyles}
          placeholder="Type or select country"
        />
        <datalist id="countries">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <p className={errorStyles}>{errors.country}</p>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className={`${labelStyles} mt-3`}>Picture</span>
          <p className={errorStyles}>{errors.picture}</p>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="picture"
            className="mt-1 flex items-center justify-center border border-gray-300 bg-blue-50 text-gray-900 rounded-lg p-2 text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors w-50"
          >
            Choose File
          </label>
          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/png,image/jpeg"
            className="sr-only"
            data-testid="file-input"
          />
        </div>
      </div>

      <div className="flex flex-col mt-1">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-700 cursor-pointer select-none"
          >
            I accept the Terms & Conditions
          </label>
        </div>
        <p className={errorStyles}>{errors.acceptTerms}</p>
      </div>

      <button
        type="submit"
        className="mt-2 w-full p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition-colors text-sm"
      >
        Submit
      </button>
    </form>
  );
};
