// Improved error handling for Firebase Authentication

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const loginUser = async (email, password) => {
  try {
    // Input validation
    if (!email || !password || !isValidEmail(email)) {
      throw new Error('Invalid email or password.');
    }

    await signInWithEmailAndPassword(auth, email, password);
    // Successful login
  } catch (error) {
    // Handle specific Firebase errors
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email format.');
    } else if (error.code === 'auth/user-not-found') {
      throw new Error('User not found.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your connection.');
    } else {
      // Handle other unexpected errors
      console.error('Unexpected Firebase error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};

const isValidEmail = (email) => {
  // Add email validation regex here.
  // ...
};
