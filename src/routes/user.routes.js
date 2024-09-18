import { Router } from "express";
import { getSections, getStudentForSection, getStudents } from "../controllers/user.controller.js";
const router = Router()

router.get('/students', getStudents)
router.get('/section/:id',getStudentForSection)
router.get('/sections',getSections)


export default router
