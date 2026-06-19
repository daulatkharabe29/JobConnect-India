const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Daulat@123",   // change if needed
    database: "jobconnectindia"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error ❌", err);
    } else {
        console.log("DB Connected ✅");
    }
});

module.exports = db;