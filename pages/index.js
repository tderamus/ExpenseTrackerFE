import { useState } from 'react';
import firebase from 'firebase/app';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import NewUserForm from '../components/NewUserForm';

function Home() {
  const user = firebase.auth().currentUser;
  const [showNewUserForm, setShowNewUserForm] = useState(false);

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
