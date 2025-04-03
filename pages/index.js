import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import NewUserForm from '../components/NewUserForm';
import { getUserById } from '../api/UserData';

function Home() {
  const user = firebase.auth().currentUser;
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getUserById(user.uid) // Fetch user data by ID when the component mounts or user changes
      .then((data) => {
        if (data) {
          console.log('User data fetched:', data); // Log the fetched user data for debugging
          setLoggedInUser(data); // Set the logged-in user state with the fetched data
        } else {
          console.error('No user data found, showing NewUserForm');
          setShowNewUserForm(true); // If no user data found, show the form
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error); // Log any errors that occur during the fetch
        setShowNewUserForm(true); // If there's an error, show the NewUserForm
      });

    if (!loggedInUser && user) {
      router.push('/UserProfile/[UID]', `/UserProfile/${user.uid}`); // Redirect to UserProfile if no user data found
    }
  }, [user]); // Run the effect when the component mounts or when the user changes

  const handleRegisterClick = () => {
    // Check if user is logged in
    if (!user) {
      alert('You must be logged in to register.');
      return;
    }

    // Show the NewUserForm to register the user
    setShowNewUserForm(true);
  };
  return (
    <>
      {showNewUserForm ? (
        // If showNewUserForm is true, display the NewUserForm component
        <NewUserForm />
      ) : (
        // Otherwise, display a button to register
        <div className="text-center d-flex flex-column justify-content-center align-content-center">
          <h1>Welcome to the Home Page!</h1>
          <p>Please register to track your expenses.</p>
          <Button variant="primary" onClick={handleRegisterClick}>
            Register
          </Button>
        </div>
      )}
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
