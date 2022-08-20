import { createTheme } from '@nextui-org/react';

export const nextUiTheme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',
      primaryYellow: '#FFE500',
      primaryYellowHover: '#FFF171',
      secondaryWhite: '#585858',
      teriaryWhite: '#D3D3D3',
      mainBgWhite: '#F6F6F6',
      mainBgBlack: '#171622',
      secondaryBgBlack: '#212130',
      contastWhite: '#F5F5F5',
      placeholderColor: '#C0C0C0',

      gradient:
        'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd',

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});
