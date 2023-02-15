import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './menu';
import { MemoryRouter as Router } from 'react-router';

describe('Menu', () => {
    const items = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ];
    beforeEach(async () => {
        render(
            <Router>
                <Menu items={items}></Menu>
            </Router>
        );
    });

    test('should render the menu items', () => {
        items.forEach((item) => {
            const link = screen.getByText(item.label);
            expect(link).toBeInTheDocument();
            expect(link.getAttribute('href')).toBe(item.path);
        });
    });

    test('should open the menu when the hamburger icon is clicked', () => {
        const hamMenu = screen.getByRole('img', {
            name: 'hamburguer',
        });
        userEvent.click(hamMenu);
        const hamList = screen.getByTestId('ham-menu');
        expect(hamList).toBeVisible();
    });

    test('should close the menu when a menu item is clicked', () => {
        const hamMenu = screen.getByRole('img', {
            name: 'hamburguer',
        });
        userEvent.click(hamMenu);
        const hamList = screen.getByTestId('ham-menu');
        const hamElements = screen.getAllByTestId('ham-element');
        userEvent.click(hamElements[0]);
        expect(hamList).not.toBeVisible();
    });
});
