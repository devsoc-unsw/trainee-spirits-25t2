import { createContext, useState, useEffect } from "react";

const MemosContext = createContext();

export const MemosProvider = ({ children }) => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchMemos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/memos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Fetch failed " + res.status);
      const data = await res.json();
      setMemos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", `${import.meta.env.VITE_API_URL}/memos/${id}`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/memos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      const data = await res.json();
      console.log("✅ Deleted:", data);
      alert("Memo deleted successfully");
      fetchMemos();
    } catch (err) {
      console.error("❌ Error creating memo:", err);
      alert("Failed to delete memo.");
    }
  };

  const createMemo = async ({
    title,
    notes,
    city,
    country,
    lng,
    lat,
    photos,
  }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/memos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ensure token is defined outside
        },
        body: JSON.stringify({
          title,
          notes,
          city,
          country,
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
          photos, // already from props
        }),
      });

      if (!res.ok) {
        throw new Error(`❌ Failed to create memo: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Memo created successfully:", data);
      return data;
    } catch (error) {
      console.error("⚠️ Error creating memo:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Fetch memos when provider mounts
    fetchMemos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MemosContext.Provider
      value={{
        memos,
        loading,
        fetchMemos,
        setLoading,
        handleDelete,
        createMemo,
      }}
    >
      {children}
    </MemosContext.Provider>
  );
};

export default MemosContext;
