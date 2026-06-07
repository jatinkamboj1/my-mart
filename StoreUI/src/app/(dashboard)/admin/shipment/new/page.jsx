"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  createShippingFee,
  getAllDeliveryTypes,
} from "@/app/api/shippingFee";

const Page = () => {
  const [formState, setFormState] = useState({
    zone: "",
    deliveryTypeId: "",
    feeAmount: "",
    minOrderValue: "",
    maxOrderValue: "",
    isActive: true,
  });
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user?.token;

  useEffect(() => {
    if (token) fetchDeliveryTypes(token);
  }, [token]);

  const fetchDeliveryTypes = async (token) => {
    const types = await getAllDeliveryTypes(token);
    if (types && types?.types) setDeliveryTypes(types.types || []);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const response = await createShippingFee(formState, token);
    if (response) {
      toast.success(response.message);
      router.push("/admin/shipment");
    }
  };

  return (
    <div className="container container--max--xl">
      <div className="py-5 d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Add Shipping Fee</h1>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </div>
      <div className="card p-5">
        <div className="mb-4">
          <label className="form-label border-danger">Zone <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control border-danger"
            name="zone"
            value={formState.zone}
            onChange={handleChange}
            placeholder="e.g. E1, Zone 2"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Delivery Type <span className="text-danger">*</span></label>
          <select
            className="form-select"
            name="deliveryTypeId"
            value={formState.deliveryTypeId}
            onChange={handleChange}
          >
            <option value="">Select Delivery Type</option>
            {deliveryTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Fee Amount (₹)</label>
          <input
            type="number"
            className="form-control border-danger"
            name="feeAmount"
            value={formState.feeAmount}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Min Order Value <span className="text-danger">*</span></label>
            <input
              type="number"
              className="form-control border-danger"
              name="minOrderValue"
              value={formState.minOrderValue}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label border-danger">Max Order Value <span className="text-danger">*</span></label>
            <input
              type="number"
              className="form-control"
              name="maxOrderValue"
              value={formState.maxOrderValue}
              onChange={handleChange}
            />
          </div>
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
