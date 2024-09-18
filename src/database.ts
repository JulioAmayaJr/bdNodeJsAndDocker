// import { ConnectionPool } from 'mssql';

// const config = {
//   user: 'sa',
//   password: '12345',
//   server: 'localhost',
//   database: 'solutionunivo',
//   options: {
//     trustServerCertificate: true 
//   }
// };

// const poolPromise = new ConnectionPool(config)
//   .connect()
//   .then(pool => {
//     console.log('Conectado a SQL Server');
//     return pool;
//   })
//   .catch(err => console.log('Error de conexión a la base de datos: ', err));

// export { poolPromise };