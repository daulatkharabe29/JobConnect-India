const cron = require("node-cron");
const db = require("../db/connection"); // ✅ FIXED PATH

cron.schedule("0 0 * * *", () => {

    const sql = `
        DELETE FROM jobs
        WHERE deadline < CURDATE()
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Error deleting expired jobs:", err);
        } else {
            console.log(`${result.affectedRows} expired jobs deleted`);
        }
    });

});

console.log("✅ Auto delete cron job started");