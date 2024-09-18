import { getConnection } from "../database/connection.js"

export const getAttentions = async (req, res) => {
    const token = req.cookies.access_token;

    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM attention_record");
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getAttention=async(req,res)=>{
    try {
        const pool = await getConnection();
    
        const result = await pool
          .request()
          .input("id", req.params.id)
          .query("SELECT * FROM attention_record WHERE id_user = @id");
        return res.json(result.recordset[0]);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
}  

export const createAttention = async (req,res)=>{
    try {
        const { id_user, id_student, description } = req.body
        const pool = await getConnection()

        const result = await pool
            .request()
            .input("id_user", id_user)
            .input("id_student", id_student)
            .input("description", description)
            .query(
                "INSERT INTO attention_record (id_user, id_student, description, date) " +
                "VALUES (@id_user, @id_student, @description, GETDATE() )"
            )
        return res.status(201).json({ message: "Registro creado con exito", result })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
    