"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { allUserOrders } from "@/app/api/orders";
import { allCustomers } from "@/app/api/users";
import { fetchAllProducts } from "@/app/api/products";

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchUsers();
      fetchProducts();
    }
  }, [token, currentPage, filters]);

  const fetchOrders = async () => {
    try {
      const offset = (currentPage - 1) * limit;
      const options = {};
      
      // Add filters to options if they have values
      if (filters.status) options.status = filters.status;
      if (filters.startDate) options.startDate = filters.startDate;
      if (filters.endDate) options.endDate = filters.endDate;
      
      const response = await allUserOrders(token, offset, limit, options);
      
      if (response && response.orders) {
        response.orders.total = response.pageDetails.total;
        setOrders(response.orders);
        setTotalPages(response.pageDetails.totalPages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await allCustomers(token);
      response.users.total = response.pageDetails.total;
      setUsers(response.users);
    } catch (error) {}
  };

  const fetchProducts = async () => {
    try {
      const response = await fetchAllProducts(token);
      response.products.total = response.pageDetails.total;
      setProducts(response.products);
    } catch (error) {}
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      startDate: "",
      endDate: ""
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container pb-6">
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Dashboard</h1>
          </div>
        </div>
      </div>
      
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-4 d-flex">
          <div className="card saw-indicator flex-grow-1">
            <Link href="/admin/order" className="text-dark">
              <div className="sa-widget-header saw-indicator__header">
                <h2 className="sa-widget-header__title">Total Orders</h2>
              </div>
              <div className="saw-indicator__body">
                <div className="saw-indicator__value">{orders.total || 0}</div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="col-12 col-md-4 d-flex">
          <div
            className="card saw-indicator flex-grow-1"
            data-sa-container-query='{"340":"saw-indicator--size--lg"}'
          >
            <Link href="/admin/users/customer" className="text-dark">
              <div className="sa-widget-header saw-indicator__header">
                <h2 className="sa-widget-header__title">Total Customers</h2>
              </div>
              <div className="saw-indicator__body">
                <div className="saw-indicator__value">{users.total || 0}</div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="col-12 col-md-4 d-flex">
          <div
            className="card saw-indicator flex-grow-1"
            data-sa-container-query='{"340":"saw-indicator--size--lg"}'
          >
            <Link href="/admin/product" className="text-dark">
              <div className="sa-widget-header saw-indicator__header">
                <h2 className="sa-widget-header__title">Total Products</h2>
              </div>
              <div className="saw-indicator__body">
                <div className="saw-indicator__value">{products.total || 0}</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-12 col-md-3">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-select" 
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="PENDING">Pending</option>
                    
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                
                <div className="col-12 col-md-3">
                  <label className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div className="col-12 col-md-3">
                  <label className="form-label">End Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                  />
                </div>
                
                <div className="col-12 col-md-3">
                  <button 
                    className="btn btn-secondary w-100"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="col-12 col-xxl-9 d-flex">
          <div className="card flex-grow-1 saw-table">
            <div className="sa-widget-header saw-table__header">
              <h2 className="sa-widget-header__title">Recent orders</h2>
            </div>
            <div className="saw-table__body sa-widget-table text-nowrap">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Items Bought</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <Link
                            href={`/admin/order/${row.id}`}
                            className="text-reset"
                          >
                            #{(currentPage - 1) * limit + index + 1}
                          </Link>
                        </td>
                        <td>
                          <div className="d-flex fs-6">
                            <div className={`badge badge-sa-primary`}>
                              {row.status}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link
                            href={`/admin/users/customer/${row.user.id}`}
                            className="text-reset"
                          >
                            {row.user.name}
                          </Link>
                        </td>
                        <td>{new Date(row.createdAt).toLocaleString()}</td>
                        <td>{row.total}</td>
                        <td>{row.products.length}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <li 
                            key={page} 
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                          >
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <li key={page} className="page-item disabled"><span className="page-link">...</span></li>;
                      }
                      return null;
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;