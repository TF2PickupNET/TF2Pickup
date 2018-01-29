import { create } from 'jss';
import cache from 'jss-cache';
import nested from 'jss-nested';
import compose from 'jss-compose';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import vendorPrefixer from 'jss-vendor-prefixer';
import propSort from 'jss-props-sort';

const jss = create();

jss.use(cache());
jss.use(nested());
jss.use(compose());
jss.use(camelCase());
jss.use(defaultUnit());
jss.use(vendorPrefixer());
jss.use(propSort());

export default jss;
