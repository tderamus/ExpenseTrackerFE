import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { getUserById } from '../../api/UserData';
import ExpensesCard from '../../components/ExpensesCard';

export default function UserProfile() {
  const user = firebase.auth().currentUser; // Get the current user from Firebase authentication
  const [userData, setUserData] = useState(null);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' }); // Get the current month for display purposes

  useEffect(() => {
    if (user) { // Ensure the user object is available
      getUserById(user.uid)
        .then((data) => {
          if (data) {
            setUserData(data); // Set the user data state with the fetched data
          } else {
            console.error('No user data found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error); // Log any errors that occur during the fetch
        });
    }
  }, [user]); // Run the effect when the component mounts or when the user changes

  if (!user) {
    return <p>Loading user information...</p>; // Show a loading message if user is not available
  }

  return (
    <div>
      <h2>Welcome To {user.displayName} Bill Payment Tracker</h2>
      {userData ? (
        <>
          <div>
            <p><strong>User ID:</strong> {userData.userId}</p>
            <p><strong>User Name:</strong> {userData.userName}</p>
            {/* Display other user data as needed */}
          </div>
          <div>
            <h3>{currentMonth} Expenses</h3>
            {/* Render the ExpensesCard component to show the user's expenses */}
            <ExpensesCard />
          </div>
        </>
      ) : (
        <p>Loading user data...</p> // Show a loading message while the data is being fetched
      )}
    </div>
  );
}
