import { Router } from "express";
import { createAttention, getAttention,getAttentions } from '../controllers/attention.controller.js'

const router=Router()

router.get('/attention',getAttentions)

router.get('/attention/:id',getAttention)

router.post('/attention',createAttention)


export default router