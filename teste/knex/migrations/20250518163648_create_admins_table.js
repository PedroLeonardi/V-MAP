export function up(knex) {
  return knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.string('cliente').notNullable();
    table.integer('quantidade_pessoas').unsigned().notNullable();
    table.date('data_reserva').notNullable();
    table.time('hora_reserva').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  
}
