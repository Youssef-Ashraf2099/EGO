const Booking = require("../models/booking");
const Event = require("../models/event");

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ _id: id, user: req.user.userId }).populate("event");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found or unauthorized" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookTickets = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.ticketAvailable < numberOfTickets) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }

    const totalPrice = numberOfTickets * event.ticketPrice;

    const booking = new Booking({
      user: req.user.userId,
      event: eventId,
      numberOfTickets,
      totalPrice,
      status: "confirmed",
    });

    await booking.save();

    event.ticketAvailable -= numberOfTickets;
    event.ticketSold += numberOfTickets;
    await event.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({ _id: id, user: req.user.userId }).populate("event");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const event = booking.event;
    event.ticketAvailable += booking.numberOfTickets;
    event.ticketSold -= booking.numberOfTickets;
    await event.save();

    await Booking.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBookingById,
  bookTickets,
  cancelBooking,
  getUserBookings,
};
