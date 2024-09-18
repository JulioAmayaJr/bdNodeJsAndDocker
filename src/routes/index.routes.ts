import { Router } from "express";
const router = Router()

import { indexWelcome } from "../controller/index.controller";

router.route("/")
    .get(indexWelcome);