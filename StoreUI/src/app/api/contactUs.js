import toast from "react-hot-toast";
import axios from "axios";

export const addContact = async (data, ) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/contact`, 
      data,
      {
        headers: {
          "Content-Type": "application/json",

        },
      }
    );

    if (response.status !== 201) throw new Error("Network response was not ok");

    return response.data;
  } catch (error) {
    console.error("Error adding contact Us:", error);
    toast.error("Failed to send contact request.");
    return false;
  }
};

export const getContacts = async (
  token,
  page = 1,
  limit = 20
) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/contact?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    toast.error("Failed to load contacts");
    return null;
  }
};

export const getContactById = async (
  id,
  token
) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/contact/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    toast.error("Failed to load message");
    return null;
  }
};

export const markContactAsRead = async (
  id,
  token
) => {
  try {
    const response = await axios.patch(
      `${process.env.SERVER_URL}/contact/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error marking contact as read:",
      error
    );

    toast.error("Failed to update status");
    return null;
  }
};