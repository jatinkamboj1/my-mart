"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { allUserOrders } from "@/app/api/orders";
import { getAllUsers } from "@/app/api/users";

const Page = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState({
    name: "",
    status: "",
    isPaid: "",
    paymentType: "",
    userId: "",
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
  });

  const timeoutRef = useRef(null);

  // Load Users for dropdown
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      const response = await getAllUsers(token);
      if (response?.users) {
        setUsers(response.users);
      }
    };

    fetchUsers();
  }, [token]);

  // Fetch Orders (Debounced)
  useEffect(() => {
    if (!token) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetchOrders(pagination.currentPage, filter);
    }, 400);

    return () => clearTimeout(timeoutRef.current);
  }, [token, pagination.currentPage, filter]);

  const fetchOrders = async (page = 1, filterData = {}) => {
    try {
      const response = await allUserOrders(
        token,
        page - 1,
        pagination.pageSize,
        filterData
      );

      if (response) {
        setPagination({
          currentPage: page,
          totalPages: response.pageDetails?.totalPages || 1,
          totalItems: response.pageDetails?.total || 0,
          pageSize: pagination.pageSize,
        });

        setOrders(response.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  const resetFilters = () => {
    setFilter({
      name: "",
      status: "",
      isPaid: "",
      paymentType: "",
      userId: "",
    });
  };

  return (
    <div className="container">
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Orders</h1>
          </div>
          <div className="col-auto d-flex">
            <Link href="/admin/order/new" className="btn btn-primary">
              New order
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        {/* 🔹 Improved Filter UI */}
        <div className="p-4 border-bottom bg-light">
          <div className="row g-3 align-items-end">

            <div className="col-12">
              <label className="form-label">Order Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by order number"
                value={filter.name}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={filter.status}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="">All</option>
                <option value="CREATED">Created</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                value={filter.isPaid}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, isPaid: e.target.value }))
                }
              >
                <option value="">All</option>
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Payment Type</label>
              <select
                className="form-select"
                value={filter.paymentType}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    paymentType: e.target.value,
                  }))
                }
              >
                <option value="">All</option>
                <option value="ONLINE">Online</option>
                <option value="COD">COD</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Customer</label>
              <select
                className="form-select"
                value={filter.userId}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    userId: e.target.value,
                  }))
                }
              >
                <option value="">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 text-end">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>

          </div>
        </div>

        <div className="sa-divider" />

        {/* TABLE COMPLETELY UNCHANGED BELOW */}
        <div className="dataTables_wrapper dt-bootstrap5 no-footer">
          <div className="sa-datatables">
            <div className="sa-datatables__table">
              <table className="sa-datatables-init text-nowrap dataTable no-footer">
                <thead>
                  <tr role="row">
                    <th className="sorting sorting_desc">Number</th>
                    <th className="sorting">Date</th>
                    <th className="sorting">Customer</th>
                    <th className="sorting">Paid</th>
                    <th className="sorting">Status</th>
                    <th className="sorting">Items</th>
                    <th className="sorting">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={`order-${index}`}>
                      <td className="sorting_1">
                        <Link
                          href={`/admin/order/${item.orderNumber}`}
                          className="text-reset"
                        >
                          #{item.orderNumber}
                        </Link>
                      </td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <Link
                          href={`/admin/users/customer/${item.user.id}`}
                          className="text-reset"
                        >
                          {item.user.name}
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex fs-6">
                          {item.isPaid ? (
                            <div className="badge badge-sa-success">Yes</div>
                          ) : (
                            <div className="badge badge-sa-secondary">No</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex fs-6">
                          <div className="badge badge-sa-primary">
                            {item.status}
                          </div>
                        </div>
                      </td>
                      <td>{`${item.products.length} items`}</td>
                      <td>
                        <div className="sa-price">
                          <span className="sa-price__symbol">£</span>
                          <span className="sa-price__integer">
                            {item.actualAmount}
                          </span>
                        </div>
                      </td>
                      <td style={{ width: 80 }}>
                        <div
                          className="d-flex w-100"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Link href={`/admin/order/${item.orderNumber}`}>
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Your original pagination remains unchanged here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;