import React from "react";
import "./course.css";

const CourseDashboard = () => {
  const courses = [
    { id: 1, name: "Introduction to Hospitality", duration: "4 weeks", instructor: "John Doe" },
    { id: 2, name: "Advanced Culinary Arts", duration: "6 weeks", instructor: "Jane Smith" },
    { id: 3, name: "Hotel Management Basics", duration: "8 weeks", instructor: "Emily Johnson" },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Course Dashboard</h1>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2 className="course-name">{course.name}</h2>
            <p className="course-duration">Duration: {course.duration}</p>
            <p className="course-instructor">Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDashboard;