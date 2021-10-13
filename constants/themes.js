import {
  Button,
  extendTheme,
  Center,
  VStack,
} from 'native-base';

 export const themes = extendTheme({
   colors: {
    green: { 500: '#006600',100: '#006600'},
   },
    components: {
      colors: {
        // Add new color
        primary: {
          50: '#E3F2F9',
          100: '#C5E4F3',
          200: '#A2D4EC',
          300: '#7AC1E4',
          400: '#47A9DA',
          500: '#0088CC',
          600: '#007AB8',
          700: '#006BA1',
          800: '#005885',
          900: '#003F5E',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#65a30d',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      Button: {
        baseStyle: {
          bg: '#006600',
          borderRadius: 10,
          color: 'white',
        },
        variants: {
          rounded: () => {
            return {
              bg: '#006600',
              borderRadius: 10,
              color: 'white',
            };
          },
        },
      },
      Checkbox: {
              bg: `#65a30d`,
      },
      Input: {
        variants: {
          rounded: ({ colorScheme }) => {
            return {
              bg: `${colorScheme}.200`,
              rounded: 'full',
              mx: '3px',
              border: 1,
              _light: {placeholderTextColor: "blueGray.200"},
              _dark: {placeholderTextColor: "blueGray.50"},
            };
          },
        }
      }
    },
  });
  

