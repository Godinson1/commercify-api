import { EntitySchema } from "typeorm";

export const Item = new EntitySchema({
  name: "Item",
  tableName: "items",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    price: {
      type: "decimal",
    },
    stock: {
      type: "int",
    },
  },
});
