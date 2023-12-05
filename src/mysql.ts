import mysql from "mysql2";

require("dotenv").config();
const pool = mysql.createPool({
    host: process.env.IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "lanchonete-db",
    enableKeepAlive: true
});
pool.on("connection", _ => console.log("Conectado"));
export default pool;