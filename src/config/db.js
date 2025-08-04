const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Test database conection
(  async()=>
    {
        try
        { 
            const connection = await pool.getConnection();  //Get a connection from the pool
            console.log('Conexion establecida a la base de datos MYSQL XD');
            connection.release(); //liberate the connection back to the pool
        }catch(error){
                    console.error('Error al conectar a la base de datos MYSQL', error.message);
                    }
    }
)();

module.exports = pool;