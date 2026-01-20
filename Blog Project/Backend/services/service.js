import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOtpMail = async (email, otp) => {
    try {
        await transport.sendMail({
            from: `OTP Services <${process.env.EMAIL}>`,
            to: email,
            subject: "Your Unique OTP Verification",
            html: `
            <div style="background: linear-gradient(135deg, #FFFBDE 0%, #90D1CA 100%);
                        padding: 40px;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        border-radius: 15px;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        color: #096B68;
                        text-align: center;
                        max-width: 500px;
                        margin: auto;">
                <h1 style="color:#129990; font-size:28px; margin-bottom:10px;">🚀 OTP Verification</h1>
                <p style="font-size:16px;">Hey there! Use the OTP below to complete your login.</p>
                
                <div style="margin:20px 0; 
                            font-size:36px; 
                            font-weight:bold; 
                            color:#129990; 
                            letter-spacing:8px; 
                            padding:15px; 
                            border-radius:10px; 
                            background: #FFF; 
                            display: inline-block;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                            animation: pulse 1.2s infinite;">
                    ${otp}
                </div>

                <p style="font-size:14px; margin-top:10px;">This OTP will expire in <strong>2 minutes</strong>.</p>
                
                <a href="#" style="
                    display:inline-block;
                    margin-top:25px;
                    background-color:#096B68;
                    color:white;
                    padding:12px 30px;
                    text-decoration:none;
                    border-radius:8px;
                    font-weight:bold;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
                ">Verify Now</a>

                <p style="margin-top:30px; font-size:12px; color:#096B68;">
                    If you didn't request this OTP, just ignore this email.
                </p>

                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                </style>
            </div>
            `
        });
        return true;
    } catch (err) {
        console.log("❌ Mail send error:", err);
        return false;
    }
}
