const express = require("express");
const mongoose = require("./src/database/mongoose");
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongoose.listen(process.env.DATABASE_URL);