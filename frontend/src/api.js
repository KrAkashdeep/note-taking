import axios from "axios";
const api_url = "http://localhost:3000/";

export const createNote = async (note) => {
  try {
    const response = await axios.post(`${api_url}/tasks`, note, {
      headers: {
        "Content-Type": "application/json",
      },
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
      header: {
        "content-type": "application/json",
      },
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
    const response = axios.delete(`${api_url}/tasks/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    return {
      message: "fail to delete note",
      error: e,
    };
  }
};
