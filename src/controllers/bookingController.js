const Booking = require("../models/booking");
const Event = require("../models/event");

// View all bookings for the authenticated user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("event");
    res.status(200).json(bookings);
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

    // Calculate total price
    const totalPrice = numberOfTickets * event.ticketPrice;

    // Create a new booking
    const booking = new Booking({
      user: req.user._id,
      event: eventId,
      numberOfTickets,
      totalPrice,
      status: "confirmed",
    });

    // Save the booking
    await booking.save();

    // Update the event's available tickets
    event.ticketAvailable -= numberOfTickets;
    event.ticketSold += numberOfTickets;
    await event.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking
    const booking = await Booking.findOne({ _id: id, user: req.user._id }).populate("event");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update the event's available tickets
    const event = booking.event;
    event.ticketAvailable += booking.numberOfTickets;
    event.ticketSold -= booking.numberOfTickets;
    await event.save();

    await Booking.findByIdAndDelete(id); //delete 

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserBookings,
  bookTickets,
  cancelBooking,
};
