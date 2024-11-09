import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/Ticket.css";

const Ticket = () => {
  const [reason, setReason] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling the form submission
    console.log({ reason, subject, description });
  };

  return (
    <DashboardLayout>
      <div className="ticket-container">
        <h2 className="ticket-title">Support Ticket</h2>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <label htmlFor="reason" className="ticket-label">
            Reason for Contact
          </label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="ticket-select"
          >
            <option value="">Select a reason</option>
            <option value="Technical Issue">Forgotten Password</option>
            <option value="Billing Inquiry">Order/Purchase Issue</option>
            <option value="General Support">General Question</option>
            <option value="Feedback">Payment Question</option>
          </select>

          <label htmlFor="subject" className="ticket-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="ticket-input"
            placeholder="Enter subject"
            required
          />

          <label htmlFor="description" className="ticket-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="ticket-textarea"
            placeholder="Describe your issue here"
            required
          ></textarea>

          <button type="submit" className="ticket-button">
            Submit
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Ticket;
