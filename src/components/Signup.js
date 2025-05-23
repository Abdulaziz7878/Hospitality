import React, { useState } from "react";
import "../assets/styles/style.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation function
  const validatePassword = (password) => password.length >= 8;

  const navigateToCourses = () => {
    window.location.href = "/courses";
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    fetch("https://educationapp-backend.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        navigateToCourses()
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    // Validate role
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form is valid, submitting...", formData);
      setErrors({});
      setFormData({ name: "", email: "", password: "", role: "" });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  return (
    <div className="container rounded-4 p-1">
      <div className="card registration-card mx-auto shadow-lg rounded-4">
        <div className="row g-0 py-9">
          {/* Left Panel */}
          <div className="col-md-5 left-panel text-center text-white d-flex flex-column justify-content-center align-items-center bg-dark p-5 rounded-start">
            <div className="logo mb-4">
              <img
                width="180"
                height="180"
                src="../assets/images/image 1.png"
                alt="Logo"
              />
            </div>
            <h1 className="mb-4">EduWave</h1>
            <p className="mb-0">
              Not Your Average Web – Simplify,
              <br />
              Organize, Achieve!
            </p>
          </div>

          {/* Right Panel */}
          <div className="col-md-7 right-panel p-5 rounded-end d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="mb-1 text-start w-100">Sign Up</h1>
            <h4 className="text-muted mb-4 mt-3 ">
              Join EduWave to simplify, organize, and achieve!
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control rounded-3 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="Name"
                  style={{ width: "250px" }}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control rounded-3 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="Email"
                  style={{ width: "250px" }}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control rounded-3 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Password"
                  style={{ width: "250px" }}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="mb-3">
                <select
                  className={`form-select rounded-3 ${
                    errors.role ? "is-invalid" : ""
                  }`}
                  id="role"
                  style={{ width: "250px" }}
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                {errors.role && (
                  <div className="invalid-feedback">{errors.role}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-dark w-100 rounded-3 mb-4"
                style={{ width: "250px" }}
              >
                Sign Up
              </button>
            </form>
            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <a href="/login" className="text-primary custom-link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;