import { getConnection, sql } from "../database/connection.js";
import jwt  from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query(`
                SELECT u.*, r.name AS role_name 
                FROM tbl_user u 
                JOIN rol r ON u.id_rol = r.id_rol
                WHERE u.email = @email AND u.password = @password
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrecta' });
        }

        const user = result.recordset[0];
        const role = { name: user.role_name };

      
        const response = {
            message: 'Login exitoso',
            user: {
                ...user, 
                role
            },
            access_token: jwt.sign(
                { user: user.name, role: role.name },
                'secret-key',
                { expiresIn: '10m' }
            )
        };

        res
            .cookie('access_token', response.access_token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60
            })
            .status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
