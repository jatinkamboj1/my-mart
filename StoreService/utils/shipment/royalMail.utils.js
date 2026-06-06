'use strict';

const axios = require('axios');

/**
 * Royal Mail Click & Drop API Configuration
 * Docs: https://help.parcel.royalmail.com/hc/en-gb/articles/360011462338
 */
const ROYAL_MAIL_BASE_URL = 'https://api.parcel.royalmail.com/api/v1';

/**
 * Axios client instance
 */
const royalMailClient = axios.create({
  baseURL: ROYAL_MAIL_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.ROYAL_MAIL_API_KEY
  }
});

/**
 * Standard error formatter
 */
function formatRoyalMailError(error) {
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || 'Royal Mail API error',
      data: error.response.data
    };
  }

  return {
    status: 500,
    message: error.message || 'Unknown Royal Mail error'
  };
}

/**
 * Create Order(s)
 * Accepts up to 2000 orders per request
 *
 * @param {Object} payload - Royal Mail order payload
 * @returns {Promise<Object>}
 */
async function createRoyalMailOrder(payload) {
  try {
    if (!payload) {
      throw new Error('Order payload is required');
    }

    const response = await royalMailClient.post('/Orders', payload);
    return response.data;
  } catch (error) {
    throw formatRoyalMailError(error);
  }
}

/**
 * Get single order by ID
 *
 * @param {string} orderId
 * @returns {Promise<Object>}
 */
async function getRoyalMailOrderById(orderId) {
  try {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const response = await royalMailClient.get(`/Orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw formatRoyalMailError(error);
  }
}

/**
 * Get multiple orders by IDs
 *
 * @param {string[]} orderIds
 * @returns {Promise<Object>}
 */
async function getRoyalMailOrdersBatch(orderIds) {
  try {
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      throw new Error('orderIds must be a non-empty array');
    }

    const response = await royalMailClient.post('/Orders/batch', {
      orderIds
    });

    return response.data;
  } catch (error) {
    throw formatRoyalMailError(error);
  }
}

/**
 * Update Order Status (Event Update)
 * Examples: "Despatched", "Cancelled"
 *
 * @param {string} orderId
 * @param {string} status
 * @returns {Promise<Object>}
 */
async function updateRoyalMailOrderStatus(orderId, status) {
  try {
    if (!orderId || !status) {
      throw new Error('orderId and status are required');
    }

    const response = await royalMailClient.patch(`/Orders/${orderId}`, {
      orderStatus: status
    });

    return response.data;
  } catch (error) {
    throw formatRoyalMailError(error);
  }
}

/**
 * OPTIONAL:
 * Local invoice creation stub (Royal Mail has NO invoice API)
 *
 * @param {string} orderId
 * @param {Object} invoiceData
 * @returns {Promise<Object>}
 */
async function createRoyalMailInvoice(orderId, invoiceData) {
  if (!orderId || !invoiceData) {
    throw new Error('orderId and invoiceData are required');
  }

  // Example placeholder – replace with your own logic
  return {
    orderId,
    invoiceNumber: `INV-${Date.now()}`,
    createdAt: new Date().toISOString(),
    invoiceData
  };
}

module.exports = {
  createRoyalMailOrder,
  getRoyalMailOrderById,
  getRoyalMailOrdersBatch,
  updateRoyalMailOrderStatus,
  createRoyalMailInvoice
};
