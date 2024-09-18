import { getConnection } from '../database/connection.js'
//const cron = require('node-cron')

export const getReports = async (req, res) => {
    const token = req.cookies.access_token

    // if (!token){
    //     return res.status(403).json({ message: 'You are not authenticated' })   
    // }
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id_user", req.params.id_user)
            .input("date", req.params.date)
            .query(
                "SELECT DISTINCT(at.id)," +
                "st.name AS student, st.carnet, ca.name AS career," + 
                "se.name AS section, at.description, at.date " +
                "from attention_record at " +
                "INNER JOIN student st ON at.id_student = st.id_student " +
                "INNER JOIN tbl_user us ON at.id_user = us.id_user " +
                "INNER JOIN rol r ON us.id_rol = r.id_rol " +
                "INNER JOIN career ca ON st.id_career = ca.id " +
                "INNER JOIN section se ON se.id_career = ca.id " +
                "WHERE r.id_rol = 1 AND us.id_user = @id_user " +
                "AND at.date >= (SELECT DATEADD(WEEK, DATEDIFF(WEEK, 0, @date) - 1, 0)) " + 
                "AND (at.date <= @date) " +
                "ORDER BY at.date ASC"
            )
        res.json(result.recordset)
    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error query' })
    }
}

// const createReport = async (req, res) => {
//     try{
//         const pool = getConnection()
//         const result = await pool
//             .request()
//             .query(
//                 `INSERT INTO report VALUES (
//                 SELECT DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()) - 1, 0),
//                 SELECT GETDATE())`
//             )

//         return res.status(201).json({ message: "Report created successfully" })
//     } catch (error){
//         res.status(500)
//         res.send(error.message)
//     }
// }

// cron.schedule('55 59 * * Sunday', () => {
//     createReport()
// }, {
//     scheduled: true,
//     timezone: "America/El_Salvador"
// });