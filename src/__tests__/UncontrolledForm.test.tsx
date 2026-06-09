import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { UncontrolledForm } from 'components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Card } from 'src/types';

const mockAddCard = vi.fn();
const mockAddCountry = vi.fn();

vi.mock('features', async (importOriginal) => {
  const actual = await importOriginal<typeof import('features')>();
  return {
    ...actual,
    addCard: (payload: { card: Card }) => {
      mockAddCard(payload);
      return actual.addCard(payload);
    },
    addCountry: (payload: string) => {
      mockAddCountry(payload);
      return actual.addCountry(payload);
    },
  };
});

vi.mock('helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('helpers')>();
  return {
    ...actual,
    toBase64: vi.fn().mockResolvedValue('fakeBase64'),
  };
});

const mockData = {
  name: 'Ivan Ivanov',
  age: 18,
  email: 'nnn@ex.ru',
  password: 'Password1!',
  confirmPassword: 'Password1!',
  gender: 'female',
  country: 'Zimbabwe',
  picture: 'teddy bear',
};

const createTestStore = (initialCountries = ['Russia', 'Moldova']) => {
  return configureStore({
    reducer: {
      countries: () => ({ items: initialCountries }),
    },
  });
};

describe('UncontrolledForm', () => {
  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const store = createTestStore();
    render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={onSuccess} />
      </Provider>,
    );
    await user.type(screen.getByLabelText(/Name/i), mockData.name);
    await user.type(screen.getByLabelText(/Age/i), mockData.age.toString());
    await user.type(screen.getByLabelText(/Email/i), mockData.email);
    await user.type(screen.getByLabelText(/^password$/i), mockData.password);
    await user.type(
      screen.getByLabelText(/confirm password/i),
      mockData.confirmPassword,
    );
    await user.selectOptions(screen.getByLabelText(/Gender/i), mockData.gender);
    await user.type(screen.getByLabelText(/Country/i), mockData.country);
    const file = new File(['dummy content'], 'avatar.png', {
      type: 'image/png',
    });
    const input = screen.getByTestId('file-input');
    await user.upload(input, file);

    const termsCheckbox = screen.getByLabelText(
      /i accept the terms & conditions/i,
    );
    await user.click(termsCheckbox);

    await user.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(mockAddCard).toHaveBeenCalled();
  });
});
