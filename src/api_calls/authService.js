const API_BASE_URL = 'https://heatcheck-backend.onrender.com'; // express + mongodb backend

// Function to handle user login
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw an error with the message from the backend, or a default one
    throw new Error(data.msg || 'Login failed. Please check your credentials.');
  }
  return data; // Should contain user and token
};

// Function to handle user signup
export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'Signup failed. Please try again.');
  }
  return data; // Should contain success message and user info
}; 