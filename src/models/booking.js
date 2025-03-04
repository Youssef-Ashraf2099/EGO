const mongoose = require('mongoose');
const event = require('./event');
const bookingSchema = mongoose.Schema({
ticketBookings:{
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'event'
},
numOfTickets:{
    type: Number,
    required: true
},
totalPrice:{
    type: Number,
    required: true
},// number 2 in the tasks is missing @mostafa
status:{
    type: String,
    required: true,
    enum:['pending', 'confirmed', 'canceled']
},
timeStamp:{
    type: Date,
    default: Date.now
}  

});

const bookingModel = mongoose.model('Booking',bookingSchema); 
module.exports = bookingModel;