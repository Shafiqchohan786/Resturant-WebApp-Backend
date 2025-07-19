import ErrorHandler from '../error/error.js';
import { Reservation } from '../models/reservationSchema.js';

export const sendReservation = async (req, res, next) => {
    // ✅ Safely check if req.body exists and has keys
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    // ✅ Safe to destructure now
    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    try {
        await Reservation.create({ firstName, lastName, email, phone, date, time });

        res.status(200).json({
            success: true,
            message: "Reservation sent Successfully.",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = Object.values(error.errors).map((err) => err.message);
            return next(new ErrorHandler(validationError.join(","), 400));
        }

        // ✅ Catch other unexpected errors
        return next(new ErrorHandler("Something went wrong!", 500));
    }
};
