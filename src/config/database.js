const mariadb = require("mariadb/callback");

const conn = mariadb.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});
conn.connect(err => {
    if (err) return console.log("Failed to connect");
    console.log(`Successfully connected to mariadb server: ${conn.serverVersion()}`);
    // console.log(`Successfully connected to mariadb server: ${conn.threadId}`);
});
    
module.exports = conn;

