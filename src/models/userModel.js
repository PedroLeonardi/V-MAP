import config from '../../config/knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knex(config[environment]);

const knex = knexInstance


const getAllUsers = (table) => knex(table).select('*');

const getUserById = (table, id) => knex(table).where({ id }).first();

const createUser = (table, user) => knex(table).insert(user);

const updateUser = (table, id, user) => knex(table).where({ id }).update(user);

const deleteUser = (table, id) => knex(table).where({ id }).delete();

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
git 