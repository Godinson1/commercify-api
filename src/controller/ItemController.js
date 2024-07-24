import { AppDataSource } from "../data-source.js";
import { Item } from "../entity/Item.js";
import * as redis from "redis";

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.connect();

export class ItemController {
  async all(req, res) {
    const cacheKey = "items:all";
    const cachedItems = await client.get(cacheKey);

    if (cachedItems) {
      return res.json(JSON.parse(cachedItems));
    }

    const items = await AppDataSource.getRepository(Item).find();
    await client.set(cacheKey, JSON.stringify(items));
    res.json(items);
  }

  async save(req, res) {
    const item = await AppDataSource.getRepository(Item).save(req.body);
    await client.del("items:all"); // Invalidate cache
    res.json(item);
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);
    const cacheKey = `items:${id}`;
    const cachedItem = await client.get(cacheKey);

    if (cachedItem) {
      return res.json(JSON.parse(cachedItem));
    }

    const item = await AppDataSource.getRepository(Item).findOneBy({ id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await client.set(cacheKey, JSON.stringify(item));
    res.json(item);
  }

  async remove(req, res) {
    const id = parseInt(req.params.id);
    const result = await AppDataSource.getRepository(Item).delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    await client.del(`items:${id}`); // Invalidate cache
    await client.del("items:all"); // Invalidate cache
    res.json({ message: "Item deleted" });
  }
}
