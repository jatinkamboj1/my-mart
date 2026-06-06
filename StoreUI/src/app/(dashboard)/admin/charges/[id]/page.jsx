"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChargeById, updateCharge } from "@/app/api/charges";
import Select from "react-select";

const operation = [
  {label: "ADD", value:"ADD"},
  {label: "SUBTRACT", value:"SUBTRACT"},
  {label: "MULTIPLY", value:"MULTIPLY"},
  {label: "DIVIDE", value:"DIVIDE"},
];

const Page = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.user?.token;
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    helpText: "",
    order: 1,
    percentage: "",
    flatRate: "",
    operation: "ADD",
    isActive: "true"
  });

  useEffect(() => {
    if (token && id) {
      getChargeById(id, token).then((value)=>(setForm({...value, isActive: value.isActive === true? "true": "false"})));
    }
  }, [token, id]);

  if (!form) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    await updateCharge(id, form, token);
    toast.success("Charge updated");
    router.push("/admin/charges");
  };

  return (
    <div className="container container--max--xl">
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Add Charge</h1>
          </div>
          <div className="col-auto d-flex">
            <button onClick={handleSubmit} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="sa-entity-layout sa-entity-layout--size--md">
        <div className="sa-entity-layout__body">
          <div className="sa-entity-layout__main">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Basic information</h2>
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/code" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="form-coupon/name"
                    placeholder="VAT"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/value" className="form-label">
                    Help text
                  </label>
                  <textarea 
                    className="form-control" 
                    name="helpText" 
                    placeholder="Help text" 
                    value={form.helpText}
                    id="form-coupon/helpText"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/order" className="form-label">
                    Order <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="form-coupon/order"
                    placeholder="Order"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/percentage" className="form-label">
                    Operation <span className="text-danger">*</span>
                  </label>
                  <Select
                    name="operation"
                    options={operation}
                    value={operation.find(
                      (option) => option.value === form.operation
                    )}
                    onChange={(selectedOptions) =>
                      setForm((prev) => {
                        return { ...prev, operation: selectedOptions.value };
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/percentage" className="form-label">
                    Percentage <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="form-coupon/percentage"
                    placeholder="10"
                    name="percentage"
                    value={form.percentage}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="form-coupon/flatRate" className="form-label">
                    Flat rate <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="form-coupon/flatRate"
                    placeholder="10"
                    name="flatRate"
                    value={form.flatRate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sa-entity-layout__sidebar">
            <div className="card w-100">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Status</h2>
                </div>
                <div className="mb-n2 mt-n3">
                  <label className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="isActive"
                      checked={form.isActive === "true"}
                      value="true"
                      onChange={handleChange}
                    />
                    <span className="form-check-label">Enabled</span>
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="isActive"
                      checked={form.isActive === "false"}
                      value="false"
                      onChange={handleChange}
                    />
                    <span className="form-check-label">Disabled</span>
                  </label>
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
