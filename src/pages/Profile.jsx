
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  const [originalUser, setOriginalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Unable to load profile");
        }
        return data;
      })
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setOriginalUser(data.user);
        } else {
          setMessage(data.message || "Unable to load profile");
        }
      })
      .catch(error => setMessage(error.message || "Server connection failed"))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        "http://localhost:5000/api/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: user.name,
            phone: user.phone,
            address: user.address,
            city: user.city
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      if (data.success) {
        setUser(data.user);
        setOriginalUser(data.user);
        setEditing(false);
        setMessage("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setMessage(data.message || "Profile update failed");
      }
    } catch (error) {
      setMessage(error.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUser(originalUser);
    setEditing(false);
    setMessage("");
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={{ fontSize: "45px" }}>✈️</div>
        <h2>Loading Your Profile...</h2>
      </div>
    );
  }

  const fields = [
    { field: "name", label: "Full Name", icon: "👤" },
    { field: "email", label: "Email Address", icon: "📧" },
    { field: "phone", label: "Phone Number", icon: "📱" },
    { field: "address", label: "Address", icon: "🏠" },
    { field: "city", label: "City", icon: "📍" }
  ];

  return (
    <div style={styles.page}>

      <div style={styles.heading}>
        <span style={styles.eyebrow}>YOUR PERSONAL SPACE</span>
        <h1 style={styles.pageTitle}>My Profile</h1>
        <p style={styles.subtitle}>
          Manage your personal details and keep your travel account updated.
        </p>
      </div>

      <div style={styles.card}>

        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2 style={styles.userName}>
            {user.name || "Traveler"}
          </h2>

          <p style={styles.userEmail}>
            {user.email}
          </p>

          <span style={styles.memberBadge}>
            ✨ Smart Travel Member
          </span>
        </div>

        <div style={styles.sectionHeading}>
          <div>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <p style={styles.sectionText}>
              Your account details
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              style={styles.editButton}
              onClick={() => setMessage("") || setEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div style={{
            ...styles.message,
            background: message.toLowerCase().includes("success")
              ? "#e8f7ed"
              : "#fff0ed",
            color: message.toLowerCase().includes("success")
              ? "#208044"
              : "#d13b30"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>

          <div style={styles.fieldsGrid}>
            {fields.map(({ field, label, icon }) => (
              <div key={field} style={styles.fieldGroup}>
                <label style={styles.label}>
                  {icon} {label}
                </label>

                <input
                  type="text"
                  name={field}
                  value={user[field] || ""}
                  onChange={handleChange}
                  readOnly={!editing || field === "email"}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  style={{
                    ...styles.input,
                    background: !editing || field === "email"
                      ? "#f3f7f8"
                      : "white",
                    borderColor: editing && field !== "email"
                      ? "#176b78"
                      : "#e0e8ed"
                  }}
                />

                {field === "email" && editing && (
                  <span style={styles.helperText}>
                    Email address cannot be changed here.
                  </span>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div style={styles.actionRow}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  ...styles.saveButton,
                  opacity: saving ? 0.7 : 1
                }}
              >
                {saving ? "Saving..." : "✓ Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          )}

        </form>

        <div style={styles.footer}>
          <span>🌍</span>
          <p>Your next adventure is just one plan away!</p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "45px 5%",
    background: "linear-gradient(180deg, #edf9fa, #fff8f2)",
    fontFamily: "Arial, sans-serif"
  },

  heading: {
    textAlign: "center",
    marginBottom: "32px"
  },

  eyebrow: {
    color: "#176b78",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1.5px"
  },

  pageTitle: {
    color: "#102a43",
    fontSize: "36px",
    margin: "12px 0"
  },

  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.7"
  },

  card: {
    maxWidth: "750px",
    margin: "auto",
    background: "white",
    borderRadius: "22px",
    padding: "35px",
    boxShadow: "0 12px 40px rgba(16,42,67,0.10)",
    border: "1px solid #e7eeee"
  },

  profileHeader: {
    textAlign: "center",
    paddingBottom: "30px",
    borderBottom: "1px solid #edf0f2",
    marginBottom: "30px"
  },

  avatar: {
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #176b78, #102a43)",
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    display: "grid",
    placeItems: "center",
    margin: "auto",
    border: "5px solid #e5f4f3"
  },

  userName: {
    color: "#102a43",
    fontSize: "24px",
    margin: "15px 0 5px"
  },

  userEmail: {
    color: "#718096",
    fontSize: "14px"
  },

  memberBadge: {
    display: "inline-block",
    marginTop: "8px",
    padding: "8px 15px",
    background: "#fff1e8",
    color: "#e85d27",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px"
  },

  sectionTitle: {
    color: "#102a43",
    fontSize: "20px",
    margin: "0 0 6px"
  },

  sectionText: {
    color: "#8292a1",
    fontSize: "13px",
    margin: 0
  },

  editButton: {
    background: "#e5f4f3",
    color: "#176b78",
    border: "none",
    borderRadius: "9px",
    padding: "11px 16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px"
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column"
  },

  label: {
    color: "#334e68",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "9px"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    border: "1px solid #e0e8ed",
    borderRadius: "10px",
    color: "#334e68",
    fontSize: "14px",
    outline: "none"
  },

  helperText: {
    color: "#94a3b8",
    fontSize: "11px",
    marginTop: "6px"
  },

  message: {
    padding: "13px",
    borderRadius: "9px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  actionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "28px",
    flexWrap: "wrap"
  },

  saveButton: {
    flex: 1,
    minWidth: "150px",
    padding: "14px",
    background: "#ff6b35",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cancelButton: {
    flex: 1,
    minWidth: "120px",
    padding: "14px",
    background: "#e8eef2",
    color: "#334e68",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    background: "#f0f8f8",
    borderRadius: "12px",
    padding: "13px",
    marginTop: "30px",
    color: "#176b78",
    fontSize: "13px",
    fontWeight: "bold"
  },

  loading: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#edf9fa",
    color: "#102a43"
  }
};

export default Profile;
