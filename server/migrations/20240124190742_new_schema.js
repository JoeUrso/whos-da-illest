/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable("users", (table) => {
            table.string("id").notNullable().primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email_address").notNullable();
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("rappers", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("wins").notNullable().defaultTo(0);
            table.integer("losses").notNullable().defaultTo(0);
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("battles", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table
                .integer("rapper1_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rappers")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("rapper2_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rappers")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .string("created_by")
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("rapper1_wins").notNullable().defaultTo(0);
            table.integer("rapper2_wins").notNullable().defaultTo(0);
            table.integer("total_battles").notNullable().defaultTo(0);
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("user_battles", (table) => {
            table.increments("id").primary();
            table
                .string("user_id")
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("battle_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("battles")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("played_at").defaultTo(knex.fn.now());
        })
        .createTable("grades", (table) => {
            table.increments("id").primary();
            table.integer("grade").notNullable().defaultTo(0);
            table
                .integer("rapper_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rappers")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .string("user_id")
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists("battles")
        .dropTableIfExists("grades")
        .dropTableIfExists("rappers")
        .dropTableIfExists("users")
        .dropTableIfExists("user_battles");
};
