import request from "supertest";
import { app } from "../index";
import { Item } from "../entity/Item";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.getRepository(Item).clear();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Item API", () => {
  it("should create a new item", async () => {
    const newItem = {
      name: "Test Item",
      description: "This is a test item",
      price: 100.0,
      stock: 10,
    };

    const response = await request(app).post("/items").send(newItem).expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newItem.name);
  });

  it("should get all items", async () => {
    const response = await request(app).get("/items").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get an item by id", async () => {
    const newItem = {
      name: "Test Item",
      description: "This is a test item",
      price: 100.0,
      stock: 10,
    };

    const createdItem = await request(app).post("/items").send(newItem).expect(200);

    const response = await request(app).get(`/items/${createdItem.body.id}`).expect(200);

    expect(response.body.id).toBe(createdItem.body.id);
    expect(response.body.name).toBe(newItem.name);
  });

  it("should delete an item by id", async () => {
    const newItem = {
      name: "Test Item",
      description: "This is a test item",
      price: 100.0,
      stock: 10,
    };

    const createdItem = await request(app).post("/items").send(newItem).expect(200);

    await request(app).delete(`/items/${createdItem.body.id}`).expect(200);

    await request(app).get(`/items/${createdItem.body.id}`).expect(404);
  });
});
