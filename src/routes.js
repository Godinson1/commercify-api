import { Router } from "express";
import { ItemController } from "./controller/ItemController.js";

const routes = Router();
const itemController = new ItemController();

routes.get("/items", itemController.all);
routes.post("/items", itemController.save);
routes.get("/items/:id", itemController.findById);
routes.delete("/items/:id", itemController.remove);

export default routes;
