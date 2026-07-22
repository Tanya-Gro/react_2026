import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from 'mocks';
import { renderWithRouter } from './test-utils/renderWithRouter';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('Flyout Component', () => {
  it('should trigger programmatic download and clean up created elements on click', async () => {
    const user: UserEvent = userEvent.setup();
    server.use(
      http.get('*/people*', () => {
        return HttpResponse.json({
          results: [
            {
              url: 'https://swapi.dev',
              name: 'Luke Skywalker',
              gender: 'male',
              height: '172',
              mass: '77',
              hair_color: 'blond',
            },
          ],
          count: 1,
        });
      }),
    );

    await renderWithRouter({ route: '/' });

    const checkbox = await screen.findByRole('checkbox', {
      name: /select luke skywalker/i,
    });
    await user.click(checkbox);

    const downloadBtn = screen.getByText(/Download/i);
    expect(downloadBtn).toBeInTheDocument();

    const mockClick = vi.fn();
    const spyCreateElement = vi
      .spyOn(document, 'createElement')
      .mockReturnValue({
        setAttribute: vi.fn(),
        click: mockClick,
        style: {},
      } as any);

    await user.click(downloadBtn);

    expect(spyCreateElement).toHaveBeenCalledWith('a');
    expect(mockClick).toHaveBeenCalled();
  });
});
