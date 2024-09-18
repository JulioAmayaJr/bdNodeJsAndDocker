import express from 'express'
import attentionRoutes from './routes/attention.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import reportRoutes from './routes/report.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();

app.use(cors({
    origin: 'http://localhost:4200', // Ajusta esto si es necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Asegúrate de permitir credenciales si estás usando cookies
}));


app.use(express.json());
app.use(cookieParser())

app.use(attentionRoutes)
app.use(authRoutes)
app.use(reportRoutes)
app.use(userRoutes)

export default app