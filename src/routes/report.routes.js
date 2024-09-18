import { Router } from "express";
import { getReports } from '../controllers/report.controller.js'

const router = Router()

router.get('/report/:id_user/:date', getReports)

export default router
