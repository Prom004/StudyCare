const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendReminderEmail = (to, task) => {
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: `Task Reminder: ${task.title}`,
        text: `Reminder: Your task "${task.title}" is due on ${new Date(task.due_date).toLocaleString()}`
    }, (err, info) => {
        if (err) console.log(err);
        else console.log("Email sent: " + info.response);
    });
};

module.exports = sendReminderEmail;
