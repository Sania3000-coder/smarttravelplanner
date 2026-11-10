
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter email and password!");
      return;
    }

    if (isSignup && !name.trim()) {
      setMessage("Please enter your name!");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters!");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isSignup ? "signup" : "login";

      const response = await fetch(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (isSignup) {
        setMessage("Signup successful! Please login now.");
        setIsSignup(false);
        setPassword("");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage(`Welcome ${data.user.name}! Login successful.`);
        setPassword("");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setMessage(error.message || "Server connection failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "90vh",
      padding: "45px 5%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #edf9fa 0%, #fff3e9 100%)",
      fontFamily: "Arial, sans-serif"
    }}>

      <div style={{
        width: "100%",
        maxWidth: "950px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        background: "white",
        borderRadius: "25px",
        overflow: "hidden",
        boxShadow: "0 18px 55px rgba(16,42,67,0.13)"
      }}>

        <div style={{
          background: "linear-gradient(145deg, #102a43, #176b78)",
          padding: "45px 35px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "430px"
        }}>

          <div style={{ fontSize: "55px", marginBottom: "20px" }}>
            ✈️
          </div>

          <h1 style={{
            fontSize: "32px",
            lineHeight: "1.3",
            margin: "0 0 15px"
          }}>
            Smart Travel Planner
          </h1>

          <p style={{
            color: "#d9e9ef",
            fontSize: "15px",
            lineHeight: "1.8"
          }}>
            Discover beautiful destinations, plan your dream trips
            and manage your travel budget — all in one place.
          </p>

          <div style={{
            marginTop: "25px",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: "22px"
          }}>
            <p>🌍 Explore amazing destinations</p>
            <p>🧳 Plan your personal trips</p>
            <p>💰 Manage your travel budget</p>
            <p>☀️ Check weather before travelling</p>
          </div>

        </div>

        <div style={{
          padding: "45px 35px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>

          <span style={{
            color: "#176b78",
            fontWeight: "bold",
            fontSize: "13px",
            letterSpacing: "1px"
          }}>
            YOUR JOURNEY BEGINS HERE
          </span>

          <h2 style={{
            color: "#102a43",
            fontSize: "30px",
            margin: "13px 0 8px"
          }}>
            {isSignup ? "Create Your Account" : "Welcome Back!"}
          </h2>

          <p style={{
            color: "#718096",
            fontSize: "14px",
            marginBottom: "25px"
          }}>
            {isSignup
              ? "Create an account and start exploring."
              : "Login to continue your travel journey."}
          </p>

          <form onSubmit={handleSubmit}>

            {isSignup && (
              <div style={{ marginBottom: "15px" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading
                ? "Please wait..."
                : isSignup ? "Create Account →" : "Login →"}
            </button>

          </form>

          {message && (
            <div style={{
              marginTop: "18px",
              padding: "12px",
              borderRadius: "9px",
              background: message.toLowerCase().includes("successful")
                ? "#e8f7ed"
                : "#fff0ed",
              color: message.toLowerCase().includes("successful")
                ? "#208044"
                : "#d13b30",
              fontSize: "13px",
              textAlign: "center",
              fontWeight: "bold"
            }}>
              {message}
            </div>
          )}

          <p style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            marginTop: "25px"
          }}>
            {isSignup
              ? "Already have an account? "
              : "Don't have an account? "}

            <span
              onClick={() => {
                setIsSignup(!isSignup);
                setName("");
                setEmail("");
                setPassword("");
                setMessage("");
              }}
              style={{
                color: "#ff6b35",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>

          <p style={{
            textAlign: "center",
            color: "#9aa7b3",
            fontSize: "12px",
            marginTop: "12px"
          }}>
            ✨ Smart Travel Planner | Explore Without Limits
          </p>

        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "#334e68",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "8px"
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "1px solid #dce5eb",
  borderRadius: "10px",
  boxSizing: "border-box",
  fontSize: "14px",
  outline: "none",
  background: "#f8fbfc"
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "linear-gradient(90deg, #ff6b35, #f4511e)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "18px"
};

export default Login;
