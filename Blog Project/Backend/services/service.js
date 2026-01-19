import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { OtpCollection } from '../models/otp_model';
dotenv.config()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        email: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 90000);
    const expiry = new Date(Date.now() + 1000 * 60 * 2);
    try {
        await OtpCollection.create({ email, otp, expiry });
        await transport.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP Verification",
            text: `Your otp is ${otp}, will expire in 2 minutes`
        })
        return true;
    } catch (err) {
        return false;
    }
}
