import { colors } from '@atlaskit/theme';

const theme = {
  primaryColor: colors.B500,
  successColor: colors.G400,
  textColor: {
    light: colors.N10,
    dark: colors.N900,
  },
  pageNavigation: {
    backgroundColor: colors.N20,
    darkBackgroundColor: colors.N40,
  },
};

type Theme = typeof theme;

export { Theme };

export default theme;
