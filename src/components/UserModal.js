import React, { useState } from "react";
import axios from "axios";
import '../styles/UserModal.css';

const UserModal = ({ user, onClose, onUpdateUser }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setError("");

    // Form Validation
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      onUpdateUser({ ...user, first_name: firstName, last_name: lastName, email: email });
      alert("User updated successfully.");
      onClose();
    } catch (err) {
      setError("Failed to update the user.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit User</h3>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default UserModal;
