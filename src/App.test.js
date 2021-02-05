import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Movie Search App/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders search input and handles input', async () => {
  jest.spyOn(window, 'fetch')

  const configPromise = Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({ images: { base_url: 'base_url', poster_sizes: ['w48'] } }),
  });

  const moviesPromise = Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({ results: [{
      id: 'id',
      original_title: 'Test Title',
      release_date: '10/20/2002',
      overview: 'Overview',
      vote_average: 7.9,
      vote_count: '42',
      poster_path: 'path',
    }], total_pages: 2 }),
  })

  window.fetch.mockImplementationOnce(() => {
    return configPromise
  }).mockImplementationOnce(() => {
    return moviesPromise;
  })

  render(<App />);

  await act(() => configPromise)

  const searchElement = screen.getByAltText('Type to seach by movie title');
  expect(searchElement).toBeInTheDocument();

  userEvent.type(searchElement, 'Test');
  expect(searchElement).toHaveValue('Test')
  await act(() => moviesPromise)
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('See More')).toBeInTheDocument();
});


