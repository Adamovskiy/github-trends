import {getAllByTestId, getByTestId, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import {FavouritesStorageProvider} from '@/components/FavouritesStorage';
import fetch from 'jest-fetch-mock';


beforeEach(() => {
  fetch.resetMocks();
});


describe('Home', () => {
  it('renders a single repository escaping special symbols', async () => {
    fetch.mockResponseOnce(JSON.stringify([{
      id: '123456',
      name: 'Test <b>Repo</b>',
      html_url: 'https://example.com',
      description: 'A test repository description <3',
      stargazers_count: '42',
    }]));

    render(<FavouritesStorageProvider><Home/></FavouritesStorageProvider>);

    const row = await waitFor(() => screen.findByTestId('repoRow', {}));
    expect(row).toBeInTheDocument();
    expect(row).toHaveTextContent('A test repository description <3');
    expect(row).toHaveTextContent('Test <b>Repo</b>');
  });
});