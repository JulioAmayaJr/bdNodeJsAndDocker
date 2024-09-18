import { Request, Response } from "express";
import { poolPromise } from '../database';

// import interface
// import { AttentionRecord } from '../interface/AttentionRecord'

// export async function getAll(req: Request, res: Response): Promise<Response>{
//     try {
//         const pool = await poolPromise
//         const result = await pool.request().query('SELECT * FROM attention_records')
//         return res.json(result.recordset)
//     } catch (err) {
//         return res.status(500).send({ message: err.message})
//     }
// }

// export async function createAttRecord(req: Request, res: Response){
//     try {
//         const newAttRecord: AttentionRecord = req.body
//         const pool = await poolPromise
//         await pool.request()
//             .input('id_user', newAttRecord.id_user)
//             .input('id_student', newAttRecord.id_student)
//             .input('description', newAttRecord.description)
//             .input('date', newAttRecord.date)
//             .query('INSERT INTO attention_records (id_user, id_student, description, date) VALUES (@id_user, @id-student, @description, @date)')
//         return res.json({ message: 'Created succesfuly' })
//     } catch(err) {
//         return res.status(500).send({ message: err.message })
//     }
// }