/** @type {import('tailwindcss').Config} */
export const content = ["*.{html,js}"];
export const theme = {
  extend: {
    height: {
      '13': '3.25rem', // Custom height value
    },
    colors: {
      'custom-blue': '#1e3a8a', // Custom color
      'custom-green': 'rgb(34, 197, 94)', // Another custom color example
    },
    boxShadow: {
      'blue': '0 4px 6px rgba(30, 58, 138, 0.1)', // Custom blue shadow
    },
  },
};
export const plugins = [];
