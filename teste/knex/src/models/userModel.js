import knex from './connection.js';

const getAllUsers = () => knex('usuario').select('*');

const getUserById = (id) => knex('usuario').where({ id }).first();

const createUser = (user) => knex('usuario').insert(user);

const updateUser = (id, user) => knex('usuario').where({ id }).update(user);

const deleteUser = (id) => knex('usuario').where({ id }).delete();

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
