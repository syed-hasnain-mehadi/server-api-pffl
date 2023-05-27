import axios from 'axios';

export const reActive = async () => {
  try {
    await axios.get('https://syed-api-server-pffl.onrender.com/');
  } catch (error) {
    console.log('error', error);
  }
};
