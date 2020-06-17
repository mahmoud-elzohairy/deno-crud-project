import { Router } from "https://deno.land/x/oak/mod.ts";

import UserController from "../app/Controllers/UserController.ts";

const api = new Router();

api.prefix("/api/")
  .get("/index", UserController.index)
  .get("/show/:id", UserController.show)
  .get("/users-count", UserController.usersCount)
  .post("/store", UserController.storeOne)
  .post("/store-many", UserController.storeMany)
  .put("/update/:id", UserController.updateOne)
  .put("/update-many/:age", UserController.updateMany)
  .delete("/destroy/:id", UserController.destroyOne)
  .delete("/destroy-many/:age", UserController.destroyMany);

export default api;
