exports.up = function (knex) {
    return knex.schema
        .createTable("rappers", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("avg_grade").notNullable().defaultTo(0);
            table.integer("wins").notNullable().defaultTo(0);
            table.integer("losses").notNullable().defaultTo(0);
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("battles", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("rapper1_wins").notNullable().defaultTo(0);
            table.integer("rapper2_wins").notNullable().defaultTo(0);
            table.integer("total_battles").notNullable().defaultTo(0);
            table
                .integer("rapper1_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rappers")
                .onUpdate("CASCADE");
            table
                .integer("rapper2_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rappers")
                .onUpdate("CASCADE");
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("rappers").dropTable("battles");
};
