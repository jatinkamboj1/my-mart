import axios from "axios";
import toast from "react-hot-toast";

/* ============================
   🚀 SHIPPING FEE API HELPERS
============================ */

// ✅ Create a new Shipping Fee
export const createShippingFee = async (formState, token) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/shipping-fee`,
      formState,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 201)
      throw new Error("Network response was not ok");
    return response.data;
  } catch (error) {
    console.error("Error creating shipping fee:", error);
    toast.error("Failed to create shipping fee");
    return false;
  }
};

// ✅ Get All Shipping Fees (with pagination and filters)
export const getAllShippingFees = async (
  token,
  page = 0,
  pageSize = 10,
  filter = ""
) => {
  try {
    const params = new URLSearchParams({
      page,
      pageSize,
      ...(filter.zone ? { zone: filter.zone } : {}),
    });

    const response = await axios.get(
      `${process.env.SERVER_URL}/shipping-fee?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching shipping fees:", error);
    toast.error("Failed to load shipping fees");
    return false;
  }
};

// ✅ Get Shipping Fee by ID
export const getShippingFeeById = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/shipping-fee/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping fee:", error);
    toast.error("Failed to fetch shipping fee");
    return false;
  }
};

// ✅ Update Shipping Fee
export const updateShippingFee = async (id, formState, token) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}/shipping-fee/${id}`,
      formState,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200)
      throw new Error("Network response was not ok");
    return response.data;
  } catch (error) {
    console.error("Error updating shipping fee:", error);
    toast.error("Failed to update shipping fee");
    return false;
  }
};

// ✅ Delete Shipping Fee
export const deleteShippingFee = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}/shipping-fee/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200)
      throw new Error("Network response was not ok");
    return response.data;
  } catch (error) {
    console.error("Error deleting shipping fee:", error);
    toast.error("Failed to delete shipping fee");
    return false;
  }
};

/* ============================
   🚀 DELIVERY TYPE API HELPERS
============================ */

// ✅ Get All Delivery Types (for dropdown)
export const getAllDeliveryTypes = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/delivery-type`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery types:", error);
    toast.error("Failed to load delivery types");
    return [];
  }
};

// ✅ Create Delivery Type
export const createDeliveryType = async (formState, token) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/delivery-type`,
      formState,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating delivery type:", error);
    toast.error("Failed to create delivery type");
    return false;
  }
};

// ✅ Get Delivery Type by ID
export const getDeliveryTypeById = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/delivery-type/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching delivery type:", error);
    toast.error("Failed to fetch delivery type");
    return false;
  }
};

// ✅ Update Delivery Type
export const updateDeliveryType = async (id, formState, token) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}/delivery-type/${id}`,
      formState,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating delivery type:", error);
    toast.error("Failed to update delivery type");
    return false;
  }
};

// ✅ Delete Delivery Type
export const deleteDeliveryType = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.SERVER_URL}/delivery-type/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting delivery type:", error);
    toast.error("Failed to delete delivery type");
    return false;
  }
};


/**
 * ✅ Get the first applicable active shipping fee
 * @param {string} zone - e.g., "North London"
 * @param {number} amount - Order total amount
 * @param {string} token - Auth token (optional)
 */
export const getApplicableShippingFee = async (zone, amount, token) => {
  try {
    if (!zone || !amount) {
      toast.error("Zone and amount are required");
      return null;
    }

    const response = await axios.get(
      `${process.env.SERVER_URL}/shipping-fee/applicable`,
      {
        params: { zone, amount },
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch applicable shipping fee");
    }

    return response.data.shippingFee;
  } catch (error) {
    console.error("Error fetching applicable shipping fee:", error);
    if (error.response?.status === 404) {
      toast.error("No applicable shipping fee found");
    } else {
      toast.error("Failed to fetch shipping fee");
    }
    return null;
  }
};