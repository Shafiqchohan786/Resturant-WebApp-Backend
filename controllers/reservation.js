import ErrorHandler from '../error/error.js';
import { Reservation } from '../models/reservationSchema.js';
import nodemailer from 'nodemailer';

export const sendReservation = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    try {
        // Save reservation
        await Reservation.create({ firstName, lastName, email, phone, date, time });

        // Setup Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });

        // Email content options
        const mailOptions = {
            from: `"Zaika Restaurant" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Zaika Confirmation - Zaika Restaurant',
            html: `
                <p>Dear ${firstName} ${lastName},</p>
                <p>Thank you for reserving a table at <strong>Zaika Restaurant</strong>!</p>
                <p><strong>Reservation Details:</strong></p>
                <ul>
                    <li>Date: ${date}</li>
                    <li>Time: ${time}</li>
                    <li>Phone: ${phone}</li>
                </ul>
                <p>We look forward to serving you!</p>
                <p>Best regards,<br/>Zaika Restaurant Team</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Reservation sent successfully, confirmation email has been sent.",
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = Object.values(error.errors).map((err) => err.message);
            return next(new ErrorHandler(validationError.join(","), 400));
        }

        console.error("Error in sendReservation:", error);
        return next(new ErrorHandler("Something went wrong!", 500));
    }
};
