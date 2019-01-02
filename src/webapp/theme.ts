import { colors } from '@atlaskit/theme';

const theme = {
  primaryColor: colors.B500,
  textColor: {
    light: colors.N10,
    dark: colors.N900,
  },
  pageNavigation: { backgroundColor: colors.N20 },
};

type Theme = typeof theme;

export { Theme };

export default theme;
