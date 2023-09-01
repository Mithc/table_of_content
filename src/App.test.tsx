import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

// Mock the ThemeContext.Provider
jest.mock('./context/ThemeContext', () => ({
    ThemeContext: {
        Consumer: ({
            children,
        }: {
            children: (value: string) => React.ReactNode
        }) => children('dark'), // Mock the initial theme value as 'dark'
    },
}))

xdescribe('App Component', () => {
    console.log(App)
    it('changes theme when the toggle is clicked', () => {
        render(<App />)

        // Check that the initial theme is 'dark'
        expect(screen.getByTestId('theme-switch-checkbox')).toBeChecked()

        // Simulate a click on the toggle
        fireEvent.click(screen.getByTestId('theme-switch-checkbox'))

        // Check that the theme changes to 'light'
        expect(screen.getByTestId('theme-switch-checkbox')).not.toBeChecked()
    })
})
