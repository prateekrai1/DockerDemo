const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
//const MONGO_URI = "mongodb://172.18.0.2:27017/myDatabase";
const MONGO_URI = process.env.MONGO_URI;
const PORT = 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB Connection Error:", err));

// Student Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  studentClass: String,
  researchPaper: String,
});
const Student = mongoose.model("Student", studentSchema);

// Routes
app.get("/", (req, res) => res.send("API is running"));

// Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a student
app.post("/students-enroll", async (req, res) => {
  const { name, studentClass, researchPaper } = req.body;
  const newStudent = new Student({ name, studentClass, researchPaper });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a student by ID
app.delete("/students/:id", async (req, res) => {
    try {
      console.log("Deleting student with ID:", req.params.id);
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
