"use client";

import { useEffect, useState } from "react";
import {
  getNewsletterSubscribers,
  deleteNewsletterSubscriber,
} from "@/app/api/newsletter";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    if (token) loadSubscribers(token);
  }, [token]);

  const loadSubscribers = async (token) => {
    setLoading(true);
    const data = await getNewsletterSubscribers(token);
    setSubscribers(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this subscriber?")) return;

    const res = await deleteNewsletterSubscriber(id, token);

    if (res) {
      toast.success("Subscriber removed");
      loadSubscribers(token);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">Newsletter Subscribers</h1>

      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Source</th>
                <th>Consent</th>
                <th>Date</th>
                <th className="w-min">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan="6">No subscribers found</td>
                </tr>
              ) : (
                subscribers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.name || "-"}</td>
                    <td>{item.source || "-"}</td>
                    <td>
                      {item.consentGiven ? "✅ Yes" : "❌ No"}
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;