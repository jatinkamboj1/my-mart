"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createDeliveryType } from "@/app/api/shippingFee";

const Page = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.token;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const response = await createDeliveryType(formState, token);
    if (response) {
      toast.success(response.message);
      router.push("/admin/delivery-type");
    }
  };

  return (
    <div className="container container--max--xl">
      <div className="py-5 d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Add Delivery Type</h1>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </div>
      <div className="card p-5">
        <div className="mb-4">
          <label className="form-label">Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control border-danger"
            name="name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Description <span className="text-danger">*</span></label>
          <textarea
            className="form-control border-danger"
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
