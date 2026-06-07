"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllShippingFees,
  deleteShippingFee,
} from "@/app/api/shippingFee";
import Bin from "@/components/svg/Bin";
import Edit from "@/components/svg/Edit";

const Page = () => {
  const [fees, setFees] = useState([]);
  const [filter, setFilter] = useState({ zone: "" });
  const [pageDetails, setPageDetails] = useState({
    total: 1,
    offset: 0,
    limit: 10,
    currentPage: 1,
    totalPages: 1,
  });
  const { data: session } = useSession();
  const token = session?.user?.token;
  let timeoutId;

  useEffect(() => {
    setPageDetails((prev) => ({
      ...prev,
      totalPages: Math.ceil(prev.total / prev.limit),
    }));
  }, [pageDetails.total, pageDetails.limit]);

  useEffect(() => {
    if (token) {
      if (!filter.zone) {
        fetchFees(pageDetails.offset, pageDetails.limit);
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fetchFees(pageDetails.offset, pageDetails.limit, filter);
        }, 500);
      }
    }
  }, [token, pageDetails.currentPage, pageDetails.limit, filter]);

  const fetchFees = async (offset, limit, filter = "") => {
    const response = await getAllShippingFees(token, offset, limit, filter);
    
    if (response) {
      setFees(response.fees || []);
      setPageDetails({
        total: response.pageDetails?.total || 0,
        offset: response.pageDetails?.offset || 0,
        limit: response.pageDetails?.limit || 10,
        currentPage: Math.floor((response.pageDetails?.offset || 0) / (response.pageDetails?.limit || 10)) + 1,
        totalPages: response.pageDetails?.totalPages || 1,
      });
    }
  };

  const handleSearchFilter = (e) => {
    setFilter({ zone: e.target.value });
    setPageDetails((prev) => ({
      ...prev,
      currentPage: 1,
      offset: 0,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageDetails.totalPages) return;

    setPageDetails((prev) => ({
      ...prev,
      currentPage: newPage,
      offset: (newPage - 1) * prev.limit,
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping fee?")) return;
    
    const response = await deleteShippingFee(id, token);
    if (response) {
      fetchFees(pageDetails.offset, pageDetails.limit, filter);
      toast.success("Shipping fee deleted successfully!");
    }
  };

  return (
    <div className="mx-sm-2 px-2 px-sm-3 px-xxl-4 pb-6">
      <div className="container">
        <div className="py-5">
          <div className="row g-4 align-items-center">
            <div className="col">
              <h1 className="h3 m-0">Shipping Fees</h1>
            </div>
            <div className="col-auto d-flex">
              <Link href="/admin/shipment/new" className="btn btn-primary">
                New Fee
              </Link>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="p-4">
            <input
              type="text"
              placeholder="Start typing to search by zone"
              className="form-control form-control--search mx-auto ps-6"
              id="table-search"
              onChange={handleSearchFilter}
            />
          </div>
          <div className="sa-divider" />
          <div
            id="DataTables_Table_0_wrapper"
            className="dataTables_wrapper dt-bootstrap5 no-footer"
          >
            <div className="sa-datatables">
              <div className="sa-datatables__table">
                <table className="sa-datatables-init">
                  <thead>
                    <tr>
                      <th className="min-w-15x">Zone</th>
                      <th className="min-w-15x">Delivery Type</th>
                      <th>Fee Amount</th>
                      <th>Min Order</th>
                      <th>Max Order</th>
                      <th>Visibility</th>
                      <th className="w-min">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((item, index) => (
                      <tr key={`shipping-fee-${index}`}>
                        <td>{item.zone}</td>
                        <td>{item.deliveryType?.name}</td>
                        <td>₹{item.feeAmount}</td>
                        <td>{item.minOrderValue || "-"}</td>
                        <td>{item.maxOrderValue || "-"}</td>
                        <td>
                          {item.isActive ? (
                            <div className="badge badge-sa-success">Active</div>
                          ) : (
                            <div className="badge badge-sa-secondary">Disabled</div>
                          )}
                        </td>
                        <td style={{ width: 80 }}>
                          <div
                            className="d-flex w-100"
                            style={{ justifyContent: "space-between" }}
                          >
                            <Link href={`/admin/shipment/${item.id}`}>
                              <Edit />
                            </Link>
                            <button onClick={() => handleDelete(item.id)}>
                              <Bin />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sa-datatables__footer">
                <div className="sa-datatables__pagination">
                  <div className="dataTables_paginate paging_simple_numbers">
                    <ul className="pagination pagination-sm">
                      {/* Previous Button */}
                      <li
                        className={`paginate_button page-item previous ${
                          pageDetails.currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handlePageChange(pageDetails.currentPage - 1)
                          }
                          disabled={pageDetails.currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {Array.from(
                        { length: pageDetails.totalPages },
                        (_, index) => (
                          <li
                            key={index}
                            className={`paginate_button page-item ${
                              pageDetails.currentPage === index + 1
                                ? "active"
                                : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        )
                      )}

                      {/* Next Button */}
                      <li
                        className={`paginate_button page-item next ${
                          pageDetails.currentPage === pageDetails.totalPages
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handlePageChange(pageDetails.currentPage + 1)
                          }
                          disabled={
                            pageDetails.currentPage === pageDetails.totalPages
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="sa-datatables__controls">
                  <div className="sa-datatables__legend">
                    <div
                      className="dataTables_info"
                      role="status"
                      aria-live="polite"
                    >
                      {`Showing ${pageDetails.offset + 1} to ${Math.min(
                        pageDetails.offset + pageDetails.limit,
                        pageDetails.total
                      )} of ${pageDetails.total}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;