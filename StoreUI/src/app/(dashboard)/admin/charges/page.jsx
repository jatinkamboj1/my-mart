"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCharges, deleteCharge } from "@/app/api/charges";
import Edit from "@/components/svg/Edit";
import Bin from "@/components/svg/Bin";

const Page = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [charges, setCharges] = useState([]);

  useEffect(() => {
    if (token) fetchCharges();
  }, [token]);

  const fetchCharges = async () => {
    const res = await getAllCharges(token);
    if (res?.charges) setCharges(res.charges);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this charge?")) return;
    await deleteCharge(id, token);
    toast.success("Charge deleted");
    fetchCharges();
  };

  return (
    <div className="container">
      <div className="py-5 d-flex justify-content-between">
        <h1 className="h3">Charges</h1>
        <Link href="/admin/charges/new" className="btn btn-primary">
          New Charge
        </Link>
      </div>

      <div className="card p-4">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Operation</th>
              <th>Percentage</th>
              <th>Flat Rate</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {charges.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.operation}</td>
                <td>{c.percentage ?? "-"}</td>
                <td>{c.flatRate ?? "-"}</td>
                <td>
                  {c.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Disabled</span>
                  )}
                </td>
                <td className="d-flex gap-2">
                  <Link href={`/admin/charges/${c.id}`}>
                    <Edit />
                  </Link>
                  <button onClick={() => handleDelete(c.id)}>
                    <Bin />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
