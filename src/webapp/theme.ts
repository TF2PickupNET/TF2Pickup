import { colors } from '@atlaskit/theme';
import { NotificationType } from '@webapp/store/notifications/types';

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

  notification: {
    color: {
      [NotificationType.SUCCESS]: colors.G400,
      [NotificationType.ERROR]: colors.R300,
      [NotificationType.INFO]: colors.B400,
      [NotificationType.WARN]: colors.Y300,
    },
  },
};

export default theme;
