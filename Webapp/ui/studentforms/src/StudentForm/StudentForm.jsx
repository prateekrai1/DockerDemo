import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./StudentForm.css";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentClass: "",
    researchPaper: "",
  });
  const [students, setStudents] = useState([]); // To store students in the table

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the server to add the student
      const response = await axios.post("http://localhost:5000/students-enroll", formData);
      console.log("Student enrolled:", response.data);

      // After successful enrollment, fetch all students
      fetchStudents();
      
      // Clear form
      setFormData({
        name: "",
        studentClass: "",
        researchPaper: "",
      });
    } catch (err) {
      console.error("Error enrolling student:", err);
    }
  };

  // Fetch all students from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data); // Set fetched students in state
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Function to delete a student from the table locally
  const handleDelete = (id) => {
    setStudents(students.filter(student => student._id !== id));
  };

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="form-container">
      <h2>Enroll Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="studentClass"
          placeholder="Class"
          value={formData.studentClass}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="researchPaper"
          placeholder="Research Paper Topic"
          value={formData.researchPaper}
          onChange={handleChange}
          required
        />
        <button type="submit">Enroll</button>
      </form>

      {/* Display all students in a table */}
      <h3>Enrolled Students</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Research Paper</th>
            <th>Actions</th> {/* Add an Actions column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.studentClass}</td>
              <td>{student.researchPaper}</td>
              <td>
                <button onClick={() => handleDelete(student._id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentForm;
