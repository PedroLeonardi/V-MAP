// criando conexão com o KNEX

import knex from 'knex';
import config from '../../config/knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knex(config[environment]);

export default knexInstance;




