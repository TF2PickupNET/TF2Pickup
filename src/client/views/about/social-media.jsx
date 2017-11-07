import React from 'react';
import injectSheet from 'react-jss';
import {
  Icon,
} from 'materialize-react';
import { socialMedia } from '@tf2-pickup/configs';

import Link from '../../components/link';

function SocialMedia(props) {
  return (
    <div className={props.classes.grid}>
      {Object
        .values(socialMedia)
        .map(data => (
          <Link
            key={data.name}
            href={data.url}
            className={props.classes.gridItem}
          >
            <Icon
              icon={data.icon}
              className="mdi-48px"
              style={{ color: 'inherit' }}
            />
          </Link>
        ))}
    </div>
  );
}

SocialMedia.styles = {
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },

  gridItem: { padding: '0 25px 10px' },
};

export default injectSheet(SocialMedia.styles)(SocialMedia);
