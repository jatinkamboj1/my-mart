import axios from "axios";
import toast from "react-hot-toast";

export const createNewsletterSubscriber = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/newsletter`,
      data
    );

    toast.success("Subscribed successfully 🎉");
    return response.data;
  } catch (error) {
    console.error("Error creating subscriber:", error);

    if (error.response?.status === 409) {
      toast.error("Email already subscribed");
    } else {
      toast.error("Failed to subscribe");
    }

    return null;
  }
};

export const getNewsletterSubscribers = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/newsletter`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    toast.error("Failed to load subscribers");
    return [];
  }
};

export const deleteNewsletterSubscriber = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}/newsletter/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Subscriber deleted");
    return response.data;
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    toast.error("Failed to delete subscriber");
    return null;
  }
};