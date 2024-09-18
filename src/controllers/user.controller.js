import { getConnection } from '../database/connection.js'

export const getTeachers = async (req, res) => {
    const token = req.cookies.access_token

    if (!token){
        return res.status(403).json({ message: "No estas autenticado" })
    }
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(
                "SELECT * FROM tbl_user WHERE id_user = 1"
            )
        res.json(result.recordset)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const getStudents = async (req, res) => {
   
    try {
        const pool = await getConnection()
        const result = await pool
            .request()
            .query(
                "SELECT * FROM student"
            )
        res.json(result.recordset)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}


export const getStudentForSection = async (req, res) => {
   
    try {
        const pool = await getConnection()
        const result = await pool
        .request()
        .input("id", req.params.id)
            .query(
                "select st.id_student, st.name, sj.name,ca.name ,se.name from student as st  inner join subject as sj on st.id_subject = sj.id inner join section as se on sj.id_section = se.id join career ca on ca.id=st.id_career where se.id = @id"
            )
        res.json(result.recordset)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const getSections = async (req, res) => {
   
    try {
        const pool = await getConnection()
        const result = await pool
        .request()
            .query(
                "select * from section "
            )
        res.json(result.recordset)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: "Error en el servidor" })
    }
}


