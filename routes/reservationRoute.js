import express from 'express';
import { sendReservation } from '../controllers/reservation.js';

const router = express.Router();

// GET route for testing backend availability
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'GET API working fine ✅' });
});

// Existing POST route
router.post('/send', sendReservation);

export default router;
