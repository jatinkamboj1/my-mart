"use client";

import { useEffect, useState } from "react";
import {
  getContacts,
  getContactById,
  markContactAsRead,
} from "@/app/api/contactUs";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
  const { data: session } = useSession();

  const token = session?.user?.token;

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState(null);

  const [selectedContact, setSelectedContact] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    if (token) {
      loadContacts(page);
    }
  }, [token, page]);

  const loadContacts = async (
    currentPage = 1
  ) => {
    setLoading(true);

    const data = await getContacts(
      token,
      currentPage,
      20
    );

    if (data) {
      setContacts(data.contacts || []);
      setPagination(data.pagination);
    }

    setLoading(false);
  };

  const handleView = async (id) => {
    const data = await getContactById(
      id,
      token
    );

    if (!data) return;

    setSelectedContact(data);
    setShowModal(true);

    if (!data.isRead) {
      await markContactAsRead(id, token);

      setContacts((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">
        Contact Enquiries
      </h1>

      <div className="card">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">
                    Loading...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.isRead ? (
                        <span className="badge bg-success">
                          Read
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          New
                        </span>
                      )}
                    </td>

                    <td>{item.name}</td>

                    <td>{item.email}</td>

                    <td>
                      {item.phone || "-"}
                    </td>

                    <td>{item.subject}</td>

                    <td>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          handleView(item.id)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="d-flex justify-content-between align-items-center p-3">
            <button
              className="btn btn-outline-secondary"
              disabled={page <= 1}
              onClick={() =>
                setPage(page - 1)
              }
            >
              Previous
            </button>

            <span>
              Page {pagination.page} of{" "}
              {pagination.totalPages}
            </span>

            <button
              className="btn btn-outline-secondary"
              disabled={
                page >=
                pagination.totalPages
              }
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && selectedContact && (
        <>
          <div
            className="modal fade show"
            style={{
              display: "block",
              background:
                "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Contact Message
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setShowModal(false)
                    }
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <strong>Name:</strong>{" "}
                    {selectedContact.name}
                  </div>

                  <div className="mb-3">
                    <strong>Email:</strong>{" "}
                    {selectedContact.email}
                  </div>

                  <div className="mb-3">
                    <strong>Phone:</strong>{" "}
                    {selectedContact.phone ||
                      "-"}
                  </div>

                  <div className="mb-3">
                    <strong>Subject:</strong>{" "}
                    {selectedContact.subject}
                  </div>

                  <div className="mb-3">
                    <strong>Date:</strong>{" "}
                    {new Date(
                      selectedContact.createdAt
                    ).toLocaleString()}
                  </div>

                  <hr />

                  <div>
                    <strong>
                      Message:
                    </strong>

                    <p className="mt-3">
                      {
                        selectedContact.message
                      }
                    </p>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Page;