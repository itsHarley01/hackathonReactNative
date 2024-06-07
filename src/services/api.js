
const baseUrl = 'http://192.168.148.42:3000/api';


export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendMessage = async (emergencyType,from, location) => {
  try {
    const response = await fetch(`${baseUrl}/api/sms/sms-send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emergencyType,from, location }),
    });

    if (!response.ok) {
      console.log(emergencyType+location)
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


