import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { createNewUser } from '../api/UserData';

const initialState = {
  UserId: '',
  UserName: '',
};

export default function NewUserForm() {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...initialState, // Reset to initial state to avoid carrying over old data
        ...prev,
        UserId: user.uid,
        UserName: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the new input value
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Log the form data for debugging
    createNewUser(formData).then(() => router.push('/UserProfile/UserProfile')); // Redirect to home after submission
  }; // Closing the handleSubmit function

  return (
    <div className="text-center d-flex flex-column justify-content-center align-content-center">
      <h1>Register to track expenses</h1>
      <Form
        onSubmit={
         handleSubmit
        }
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <Form.Group className="mb-3" controlId="formBasicUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="User ID will be auto-filled"
            value={formData.UserId} // Set the value to the UserId from formData
            readOnly // Make it read-only since it's auto-filled from Firebase user
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your User Name"
            value={formData.UserName} // Set the value to the UserName from formData
            required
            onChange={handleInputChange} // Update the formData state when the input changes
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
