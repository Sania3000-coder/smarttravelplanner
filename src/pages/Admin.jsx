
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/admin";

function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    destination: "",
    days: "",
    travelers: "",
    budget: ""
  };

  const [form, setForm] = useState(emptyForm);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API}/trips`, { headers });
      const data = await res.json();

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        showMessage("Access denied! Admin only.", "error");
        return;
      }

      if (data.success) {
        setTrips(data.trips || []);
      } else {
        showMessage(data.message || "Unable to load trips.", "error");
      }
    } catch {
      showMessage("Backend connection failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTrips();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showMessage("");

    try {
      setSaving(true);

      const url = editingId
        ? `${API}/trips/${editingId}`
        : `${API}/trips`;

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers,
        body: JSON.stringify({
          ...form,
          days: Number(form.days),
          travelers: Number(form.travelers),
          budget: Number(form.budget)
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong!");
      }

      showMessage(
        data.message || (editingId
          ? "Trip updated successfully!"
          : "New trip added successfully!")
      );

      resetForm();
      await fetchTrips();
    } catch (error) {
      showMessage(error.message || "Something went wrong!", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (trip) => {
    setEditingId(trip._id);

    setForm({
      destination: trip.destination || "",
      days: trip.days ?? "",
      travelers: trip.travelers ?? "",
      budget: trip.budget ?? ""
    });

    showMessage("You are editing this trip.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) {
      return;
    }

    try {
      const res = await fetch(`${API}/trips/${id}`, {
        method: "DELETE",
        headers
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to delete trip");
      }

      showMessage(data.message || "Trip deleted successfully!");
      await fetchTrips();
    } catch (error) {
      showMessage(error.message || "Unable to delete trip", "error");
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={{ fontSize: "45px" }}>✈️</div>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.hero}>
          <span style={styles.heroBadge}>ADMIN CONTROL CENTER</span>

          <h1 style={styles.heroTitle}>
            ✈️ Admin Dashboard
          </h1>

          <p style={styles.heroText}>
            Manage destinations, monitor trips and control your
            Smart Travel Planner from one place.
          </p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🧳</div>
            <div>
              <span style={styles.statLabel}>Total Trips</span>
              <h2 style={styles.statValue}>{trips.length}</h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌍</div>
            <div>
              <span style={styles.statLabel}>Destinations</span>
              <h2 style={styles.statValue}>
                {new Set(trips.map(trip => trip.destination?.toLowerCase())).size}
              </h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <span style={styles.statLabel}>Total Travelers</span>
              <h2 style={styles.statValue}>
                {trips.reduce((sum, trip) => sum + Number(trip.travelers || 0), 0)}
              </h2>
            </div>
          </div>
        </div>

        <div style={styles.formCard}>
          <div style={styles.sectionHeading}>
            <div>
              <span style={styles.eyebrow}>TRIP MANAGEMENT</span>
              <h2 style={styles.sectionTitle}>
                {editingId ? "✏️ Update Trip" : "➕ Add New Trip"}
              </h2>
              <p style={styles.sectionText}>
                Enter trip details to manage travel records.
              </p>
            </div>

            <span style={styles.formIcon}>🗺️</span>
          </div>

          {message && (
            <div style={{
              ...styles.message,
              background: messageType === "error" ? "#fff0ed" : "#e8f7ed",
              color: messageType === "error" ? "#c0392b" : "#208044"
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>📍 Destination</label>
                <input
                  style={styles.input}
                  name="destination"
                  placeholder="Enter destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={styles.label}>📅 Number of Days</label>
                <input
                  style={styles.input}
                  type="number"
                  name="days"
                  placeholder="Enter days"
                  min="1"
                  value={form.days}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={styles.label}>👥 Travelers</label>
                <input
                  style={styles.input}
                  type="number"
                  name="travelers"
                  placeholder="Number of travelers"
                  min="1"
                  value={form.travelers}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={styles.label}>💰 Budget (₹)</label>
                <input
                  style={styles.input}
                  type="number"
                  name="budget"
                  placeholder="Enter budget"
                  min="1"
                  value={form.budget}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  ...styles.primaryButton,
                  opacity: saving ? 0.7 : 1
                }}
              >
                {saving
                  ? "Please wait..."
                  : editingId ? "✓ Update Trip" : "＋ Add Trip"}
              </button>

              {editingId && (
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => {
                    resetForm();
                    showMessage("Editing cancelled.");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={styles.tripsSection}>
          <div style={styles.sectionHeading}>
            <div>
              <span style={styles.eyebrow}>ALL RECORDS</span>
              <h2 style={styles.sectionTitle}>📍 Manage All Trips</h2>
              <p style={styles.sectionText}>
                View, edit or delete saved travel plans.
              </p>
            </div>

            <span style={styles.countBadge}>
              {trips.length} Trips
            </span>
          </div>

          {trips.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "55px" }}>🧳</div>
              <h3>No Trips Available</h3>
              <p>Add your first trip using the form above.</p>
            </div>
          ) : (
            <div style={styles.tripsGrid}>
              {trips.map(trip => (
                <div key={trip._id} style={styles.tripCard}>

                  <div style={styles.tripCardTop}>
                    <span style={styles.destinationIcon}>🌍</span>
                    <span style={styles.tripTag}>TRAVEL PLAN</span>
                  </div>

                  <h3 style={styles.tripTitle}>
                    {trip.destination}
                  </h3>

                  <div style={styles.tripDetails}>
                    <p>📅 <strong>Days:</strong> {trip.days}</p>
                    <p>👥 <strong>Travelers:</strong> {trip.travelers}</p>
                    <p>💰 <strong>Budget:</strong> ₹{trip.budget}</p>
                    <p>👤 <strong>User:</strong> {trip.userId?.name || "Unknown"}</p>
                  </div>

                  <div style={styles.tripActions}>
                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(trip)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(trip._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #edf9fa, #fff8f2)",
    padding: "40px 5%",
    fontFamily: "Arial, sans-serif"
  },

  container: {
    maxWidth: "1200px",
    margin: "auto"
  },

  hero: {
    background: "linear-gradient(120deg, #102a43, #176b78)",
    padding: "38px",
    borderRadius: "22px",
    color: "white",
    marginBottom: "25px"
  },

  heroBadge: {
    background: "rgba(255,255,255,0.15)",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "11px",
    letterSpacing: "1px",
    fontWeight: "bold"
  },

  heroTitle: {
    fontSize: "34px",
    margin: "20px 0 10px"
  },

  heroText: {
    color: "#d9e9ef",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "600px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
    marginBottom: "25px"
  },

  statCard: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 7px 25px rgba(16,42,67,0.06)"
  },

  statIcon: {
    fontSize: "30px",
    background: "#e5f4f3",
    borderRadius: "12px",
    padding: "12px"
  },

  statLabel: {
    color: "#718096",
    fontSize: "13px"
  },

  statValue: {
    color: "#102a43",
    fontSize: "25px",
    margin: "5px 0 0"
  },

  formCard: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "25px",
    boxShadow: "0 8px 30px rgba(16,42,67,0.07)"
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px"
  },

  eyebrow: {
    color: "#176b78",
    fontSize: "11px",
    letterSpacing: "1px",
    fontWeight: "bold"
  },

  sectionTitle: {
    color: "#102a43",
    fontSize: "23px",
    margin: "8px 0"
  },

  sectionText: {
    color: "#8292a1",
    fontSize: "13px",
    margin: 0
  },

  formIcon: {
    fontSize: "38px"
  },

  message: {
    padding: "13px",
    borderRadius: "9px",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "20px"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  label: {
    display: "block",
    color: "#334e68",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "9px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #dce5eb",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    background: "#f8fbfc"
  },

  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "23px",
    flexWrap: "wrap"
  },

  primaryButton: {
    background: "#ff6b35",
    color: "white",
    border: "none",
    padding: "14px 23px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  cancelButton: {
    background: "#e8eef2",
    color: "#334e68",
    border: "none",
    padding: "14px 23px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  tripsSection: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(16,42,67,0.07)"
  },

  countBadge: {
    background: "#e5f4f3",
    color: "#176b78",
    padding: "10px 16px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "13px"
  },

  tripsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px"
  },

  tripCard: {
    border: "1px solid #e4eeee",
    borderRadius: "16px",
    padding: "20px",
    background: "#fbfdfd"
  },

  tripCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  destinationIcon: {
    fontSize: "28px"
  },

  tripTag: {
    background: "#e5f4f3",
    color: "#176b78",
    padding: "6px 10px",
    borderRadius: "15px",
    fontSize: "10px",
    fontWeight: "bold"
  },

  tripTitle: {
    color: "#102a43",
    fontSize: "20px",
    margin: "15px 0"
  },

  tripDetails: {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.5"
  },

  tripActions: {
    display: "flex",
    gap: "10px",
    marginTop: "18px"
  },

  editButton: {
    flex: 1,
    background: "#176b78",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "11px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  deleteButton: {
    flex: 1,
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "11px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 15px",
    color: "#718096"
  },

  loading: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#edf9fa",
    color: "#102a43"
  }
};

export default Admin;
