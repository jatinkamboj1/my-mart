"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDeliveryTypeById, updateDeliveryType } from "@/app/api/shippingFee";

const Page = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();
  const token = session?.user?.token;

  useEffect(() => {
    if (token && id) fetchType(token, id);
  }, [token, id]);

  const fetchType = async (token, id) => {
    const response = await getDeliveryTypeById(id, token);
    if (response) setFormState(response);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const response = await updateDeliveryType(id, formState, token);
    if (response) {
      toast.success(response.message);
      router.push("/admin/delivery-type");
    }
  };

  return (
    <div className="container container--max--xl">
      <div className="py-5 d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Edit Delivery Type</h1>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </div>
      <div className="card p-5">
        <div className="mb-4">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="isActive"
            checked={formState.isActive}
            onChange={handleChange}
          />
          <label className="form-check-label">Active</label>
        </div>
      </div>
    </div>
  );
};

export default Page;
