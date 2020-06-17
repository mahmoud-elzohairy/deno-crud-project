import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import web from "./routes/web.ts";
import api from "./routes/api.ts";
import notFoundPage from "./app/Handler/404.ts";

const app = new Application();
const env = config();

app.use(web.routes());
app.use(api.routes());
app.use(web.allowedMethods());
app.use(api.allowedMethods());
app.use(notFoundPage);

console.log("Server is running");
await app.listen({ port: +env.PORT });
