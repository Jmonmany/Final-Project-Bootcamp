/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router';
import { App } from './app';
jest.mock('../../../config.ts')
describe('Given App component', () => {
    describe('When it has been render', () => {
        test('Then its child components should be render also with its title', async () => {
            await act(async () => {
                render(
                    <Router>
                        <App />
                    </Router>
                );
            });
            const elementHeader = screen.getByRole('heading', {
                name: 'Artwork List',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
