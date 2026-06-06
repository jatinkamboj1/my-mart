import toast from "react-hot-toast";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;

export const ROLES = {
  admin: "ADMIN",
  manager: "MANAGER",
  customer: "CUSTOMER",
};

/* -------------------------------------------------------------------------- */
/*                               NEXT AUTH                                    */
/* -------------------------------------------------------------------------- */

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) return null;
          return await res.json();
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.token = token.token;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                               USER APIs                                    */
/* -------------------------------------------------------------------------- */

export const updateUserInfo = async (updateData, email, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/updateInfo/${email}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    toast.error("Failed to update profile");
  }
};

export const updateUserPassword = async (
  id,
  oldPassword,
  newPassword,
  token
) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/updatePass/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    toast.error("Error updating password");
    return false;
  }
};

export const allUsers = async (token, offset = 0, limit = 10, options = {}) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { offset, limit, ...options },
    });
    return data;
  } catch {
    toast.error("Failed to get users");
  }
};

export const getAllUsers = async (token) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/user/allusers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch {
    toast.error("Failed to get users");
  }
};

export const allAdmins = async (token, offset = 0, limit = 10, role=null, name=null) => {
  try {
    const params = { offset, limit };
    if (role) params.role = role;
    if (name) params.name = name;

    const { data } = await axios.get(`${SERVER_URL}/user/admins`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return data;
  } catch {
    toast.error("Failed to get admins");
  }
};

export const allCustomers = async (token, offset = 0, limit = 10, name=null) => {
  try {
    const params = { offset, limit };
    if (name) params.name = name;

    const { data } = await axios.get(`${SERVER_URL}/user/customers`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return data;
  } catch {
    toast.error("Failed to get customers");
  }
};

export const fetchUser = async (id, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    toast.error("Failed to fetch user");
  }
};

export const deleteUser = async (token, id) => {
  try {
    await fetch(`${SERVER_URL}/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    toast.error("Failed to delete user");
    return false;
  }
};

export const updateUserIdInfo = async (updateData, id, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    toast.error("Failed to update profile");
  }
};

export const updateUserInfoByAdmin = async (updateData, id, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/user/admin/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    toast.error("Failed to update user");
  }
};

export const signupUser = async (signupData, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (!res.ok) {
      const msg = await res.text();
      toast.error(msg);
      return;
    }

    return await res.json();
  } catch {
    toast.error("Signup failed");
  }
};

export const verifyOtp = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      toast.error(await res.text());
      return false;
    }

    const data = await res.json();
    toast.success(data.message);
    return true;
  } catch {
    toast.error("OTP verification failed");
  }
};

export const resendOtp = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      toast.error(await res.text());
      return false;
    }

    const data = await res.json();
    toast.success(data.message);
    return true;
  } catch {}
};

export const getUserById = async (token, id = "user") => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch {
    toast.error("Failed to fetch user");
  }
};

export const updateUser = async (token, userData) => {
  try {
    const { data } = await axios.put(`${SERVER_URL}/user`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch {
    toast.error("Failed to update user");
  }
};

export const forgotPassword = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
    const edata = await res.json();
      toast.error(edata.error);
      return false;
    }

    const data = await res.json();
    toast.success(data.message);

    return data;
  } catch {
    toast.error("Failed to send OTP");
    return false;
  }
};

export const verifyForgotPasswordOtp = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/verify-forgot-password-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
    const edata = await res.json();
      toast.error(edata.error);
      return false;
    }

    const data = await res.json();

    toast.success(data.message);

    return data;
  } catch {
    toast.error("OTP verification failed");
    return false;
  }
};

export const resetPassword = async (formData) => {
  try {
    const res = await fetch(`${SERVER_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
    const edata = await res.json();
      toast.error(edata.error);
      return false;
    }

    const data = await res.json();

    toast.success(data.message);

    return data;
  } catch {
    toast.error("Password reset failed");
    return false;
  }
};