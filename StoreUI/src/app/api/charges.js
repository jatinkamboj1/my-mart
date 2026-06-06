import axios from "axios";

const API_URL = process.env.SERVER_URL;


/* ===========================
   GET ALL
=========================== */
export const applyCharges = async (orderTotal, token) => {
  const res = await axios.get(
    `${API_URL}/charges/apply`,
    {
      params: { orderTotal },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

/* ===========================
   CREATE
=========================== */
export const createCharge = async (data, token) => {
  const res = await axios.post(`${API_URL}/charges`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/* ===========================
   GET ALL
=========================== */
export const getAllCharges = async (token) => {
  const res = await axios.get(`${API_URL}/charges`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/* ===========================
   GET BY ID
=========================== */
export const getChargeById = async (id, token) => {
  const res = await axios.get(`${API_URL}/charges/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data?.charge;
};

/* ===========================
   UPDATE
=========================== */
export const updateCharge = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/charges/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

/* ===========================
   DELETE
=========================== */
export const deleteCharge = async (id, token) => {
  const res = await axios.delete(`${API_URL}/charges/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
