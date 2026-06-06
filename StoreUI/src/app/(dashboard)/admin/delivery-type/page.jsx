"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  getAllDeliveryTypes,
  deleteDeliveryType,
} from "@/app/api/shippingFee";
import Bin from "@/components/svg/Bin";
import Edit from "@/components/svg/Edit";

const Page = () => {
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    if (token) fetchTypes(token);
  }, [token]);

  const fetchTypes = async (token) => {
    const response = await getAllDeliveryTypes(token);
    if (response && response?.types) {
      setTypes(response.types || []);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this delivery type?"))
      return;
    const response = await deleteDeliveryType(id, token);
    if (response) {
      toast.success("Delivery type deleted successfully!");
      setTypes((prev) => prev.filter((type) => type.id !== id));
    }
  };

  // Client-side filtering for search
  const filteredTypes = types.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-sm-2 px-2 px-sm-3 px-xxl-4 pb-6">
      <div className="container">
        <div className="py-5">
          <div className="row g-4 align-items-center">
            <div className="col">
              <h1 className="h3 m-0">Delivery Types</h1>
            </div>
            <div className="col-auto d-flex">
              <Link href="/admin/delivery-type/new" className="btn btn-primary">
                New Type
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-4">
            <input
              type="text"
              placeholder="Start typing to search for delivery types"
              className="form-control form-control--search mx-auto ps-6"
              id="table-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sa-divider" />
          <div
            id="DataTables_Table_0_wrapper"
            className="dataTables_wrapper dt-bootstrap5 no-footer"
          >
            <div className="sa-datatables">
              <div className="sa-datatables__table">
                <table className="sa-datatables-init" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th className="min-w-15x" style={{ padding: "1rem" }}>Name</th>
                      <th className="min-w-15x" style={{ padding: "1rem" }}>Description</th>
                      <th style={{ padding: "1rem" }}>Visibility</th>
                      <th className="w-min" style={{ padding: "1rem" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTypes.map((type, index) => (
                      <tr key={`delivery-type-${index}`}>
                        <td style={{ padding: "1rem" }}>{type.name}</td>
                        <td style={{ padding: "1rem" }}>{type.description || "-"}</td>
                        <td style={{ padding: "1rem" }}>
                          {type.isActive ? (
                            <div className="badge badge-sa-success">Active</div>
                          ) : (
                            <div className="badge badge-sa-secondary">
                              Disabled
                            </div>
                          )}
                        </td>
                        <td style={{ width: 80, padding: "1rem" }}>
                          <div
                            className="d-flex w-100"
                            style={{ justifyContent: "space-between" }}
                          >
                            <Link href={`/admin/delivery-type/${type.id}`}>
                              <Edit />
                            </Link>
                            <button onClick={() => handleDelete(type.id)}>
                              <Bin />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;