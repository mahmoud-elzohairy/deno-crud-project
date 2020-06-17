import { Router } from "https://deno.land/x/oak/mod.ts";

import HomeController from "../app/Controllers/HomeController.ts";

const web = new Router();

web.get("/", HomeController.index);

export default web;
