import * as _ from 'lodash';
import dotenv = require('dotenv');

dotenv.config();

const config: any = Object.keys(process.env).reduce(
  (result, path) => _.set(result, path, process.env[path]),
  {},
);

export default config;
