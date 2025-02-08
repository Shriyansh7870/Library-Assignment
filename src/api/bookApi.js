import axios from "axios";

const API_URL = "https://server-library-kmon.onrender.com/api/books";

export const fetchBooks = async () => {
  const response = await axios.get(`${API_URL}?q=react`);
  return response.data.items;
};
