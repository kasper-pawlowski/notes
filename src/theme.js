import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// 2. Call `createTheme` and pass your custom values
export const lightTheme = createTheme({
    type: 'light',
});

export const darkTheme = createTheme({
    type: 'dark',
});
