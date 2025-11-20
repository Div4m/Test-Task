import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendResetEmail = async (to: string, token: string) => {
    const resetLink = `${process.env.FRONTEND_URL}/password-reset/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (err) {
        console.log("Error sending email:", err);
    }
};