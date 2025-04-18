const Booking = require("../models/booking");
const Event = require("../models/event");

const getBookingById = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOne({ _id: id, user: req.user.userId }).populate("event");
  if (!booking) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json(booking);
};

const bookTickets = async (req, res) => {
  const { eventId, numberOfTickets } = req.body;

  const event = await Event.findById(eventId);
  const booking = new Booking({
    user: req.user.userId,
    event: eventId,
    numberOfTickets,
    totalPrice: numberOfTickets * event.ticketPrice,
    status: "confirmed",
  });

  await booking.save();

  event.ticketAvailable -= numberOfTickets;
  event.ticketSold += numberOfTickets;
  await event.save();

  res.status(201).json(booking);
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOne({ _id: id, user: req.user.userId }).populate("event");
  const event = booking.event;

  event.ticketAvailable += booking.numberOfTickets;
  event.ticketSold -= booking.numberOfTickets;
  await event.save();

  await Booking.findByIdAndDelete(id);

  res.status(204).send();
};

module.exports = {
  getBookingById,
  bookTickets,
  cancelBooking,
};
