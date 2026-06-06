import axios from "axios";
import toast from "react-hot-toast";

//
// GET ALL SETTINGS
//
export const fetchAllSettings = async (token) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/site-setting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    toast.error("Failed to fetch settings");
    return [];
  }
};

//
// GET SINGLE SETTING BY KEY
//
export const fetchSettingByKey = async (key) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/site-setting/${key}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching setting (${key}):`, error);
    return null;
  }
};

//
// CREATE SETTING
//
export const createSetting = async (data, token) => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}/site-setting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Setting created");
    return response.data.data;
  } catch (error) {
    console.error("Error creating setting:", error);
    toast.error(error?.response?.data?.error || "Failed to create");
    return false;
  }
};

//
// UPDATE SETTING
//
export const updateSetting = async (data, token) => {
  try {
    const response = await axios.put(`${process.env.SERVER_URL}/site-setting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Setting updated");
    return response.data.data;
  } catch (error) {
    console.error("Error updating setting:", error);
    toast.error("Failed to update");
    return false;
  }
};

//
// FETCH MULTIPLE KEYS (BEST PRACTICE)
//
export const fetchSettingsByKeys = async (keys = []) => {
  try {
    const query = keys.join(",");
    const response = await axios.get(`${process.env.SERVER_URL}/site-setting?keys=${query}`);

    // convert to map
    const map = {};
    response.data.data.forEach((item) => {
      map[item.key] = item.jsonValue ?? item.value;
    });

    return map;
  } catch (error) {
    console.error("Error fetching settings by keys:", error);
    return {};
  }
};

//
// SPECIFIC APIs (if you still want them)
//
export const fetchAnnouncementText = async () => {
  return fetchSettingByKey("announcement.text");
};

export const fetchSearchHeading = async () => {
  return fetchSettingByKey("search.heading");
};

export const fetchWelcomeMessage = async () => {
  return fetchSettingByKey("welcome.message");
};