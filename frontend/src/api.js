import axios from "axios";
const api_url = "http://localhost:3000";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const createNote = async (note) => {
  try {
    const noteData = {
      addBy: note.type,
      description: note.content,
    };
    const response = await axios.post(`${api_url}/tasks`, noteData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return {
      message: "fail to create note",
      error: error,
    };
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${api_url}/tasks`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    return {
      message: "fail to get notes",
      error: error,
    };
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/tasks/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (e) {
    return {
      message: "fail to delete note",
      error: e,
    };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to login",
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${api_url}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to register",
    };
  }
};
