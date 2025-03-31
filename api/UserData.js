// import { clientCredentials } from '../utils/client';

const endPoint = 'https://localhost:7273';

// Get All Users
const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${endPoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for cross-origin requests if needed
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => resolve(data));
      } else {
        reject(new Error('Failed to fetch users'));
      }
    })
    .catch((error) => reject(error));
});

// Get User By ID
const getUserById = (userId) => new Promise((resolve, reject) => {
  fetch(`${endPoint}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for cross-origin requests if needed
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => resolve(data));
      } else {
        reject(new Error(`Failed to fetch user with ID: ${userId}`));
      }
    })
    .catch((error) => reject(error));
});

// Create User
const createNewUser = (formInput) => new Promise((resolve, reject) => {
  console.log('Creating new user with input:', formInput); // Log the formInput for debugging
  fetch(`${endPoint}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formInput),
    credentials: 'include', // Include credentials for cross-origin requests if needed
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => { throw new Error(text); });
      }
      return response.json().catch(() => ({})); // Handle empty response body
    })
    .then((data) => {
      console.log('New user created:', data); // Log the response data for debugging
      resolve(data); // Resolve the promise with the response data
    })
    .catch((error) => {
      console.error('Error creating new user:', error); // Log the error for debugging
      reject(new Error(`Failed to create new user: ${error.message}`)); // Reject the promise with an error message
    });
});

export {
  getAllUsers,
  createNewUser,
  getUserById,
};
