"use client";

import { useEffect, useState } from "react";
import { fetchAllSettings, updateSetting } from "@/app/api/siteSettings";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/TextEditor/Editor";

const Page = () => {
  const [settings, setSettings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    key: "",
    value: "",
  });

  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    if (token) loadSettings(token);
  }, [token]);

  const loadSettings = async (token) => {
    const data = await fetchAllSettings(token);
    setSettings(data);
  };

  const openEdit = (item) => {
    setSelected(item);
    setForm({
      key: item.key,
      value: item.value || "",
    });
  };

  const closeModal = () => {
    setSelected(null);
  };

  const handleSave = async () => {
    const res = await updateSetting(form, token);

    if (res) {
      toast.success("Updated successfully");
      closeModal();
      loadSettings(token);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">Settings</h1>

      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Description</th>
                <th className="w-min">Action</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((item) => (
                <tr key={item.key}>
                  <td>{item.key}</td>

                  <td style={{ maxWidth: 300 }}>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.value}
                    </div>
                  </td>

                  <td>{item.description}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: "60vw" }}>
            <div className="modal-header">
              <h5>Edit Setting</h5>
              <button className="btn-close" onClick={closeModal}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Key</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.key}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Value</label>
                <Editor
                  value={form.value}
                  onChange={(val) => setForm({ ...form, value: val })}
                />
              </div>

              {/* PREVIEW */}
              <div className="mb-3">
                <label className="form-label">Preview</label>
                <div
                  className="border p-3" style={{maxHeight: "200px", overflow: "scroll"}}
                  dangerouslySetInnerHTML={{ __html: form.value }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;