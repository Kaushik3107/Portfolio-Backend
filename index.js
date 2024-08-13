const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a Schema and Model for Contact Data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact information saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact information" });
  }
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
