
import { useState } from "react";

function Budget() {
  const [budget, setBudget] = useState("");
  const [hotel, setHotel] = useState("");
  const [food, setFood] = useState("");
  const [transport, setTransport] = useState("");
  const [activities, setActivities] = useState("");

  const expenses = [
    { label: "Hotel / Stay", icon: "🏨", value: hotel, setter: setHotel },
    { label: "Food & Drinks", icon: "🍕", value: food, setter: setFood },
    { label: "Transport", icon: "🚕", value: transport, setter: setTransport },
    { label: "Activities & Shopping", icon: "🎟️", value: activities, setter: setActivities }
  ];

  const total = expenses.reduce(
    (sum, item) => sum + Math.max(0, Number(item.value) || 0), 0
  );

  const budgetAmount = Math.max(0, Number(budget) || 0);
  const remaining = budgetAmount - total;
  const percentage = budgetAmount > 0
    ? Math.min(100, (total / budgetAmount) * 100)
    : total > 0 ? 100 : 0;

  const money = amount => "₹" + amount.toLocaleString("en-IN");

  function resetCalculator() {
  setBudget("");
  setHotel("");
  setFood("");
  setTransport("");
  setActivities("");
}

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div>
          <span style={styles.tag}>💰 TRAVEL SMARTER</span>
          <h1 style={styles.heading}>
            Smart <span style={{ color: "#ff7547" }}>Budget</span> Calculator
          </h1>
          <p style={styles.subtitle}>
            Manage your travel expenses, track your spending
            and enjoy your journey without financial stress.
          </p>
        </div>
        <div style={styles.heroIcon}>💳</div>
      </div>

      <div style={styles.container}>
        <div style={styles.mainGrid}>
          <div style={styles.card}>
            <h2 style={styles.title}>🧾 Plan Your Expenses</h2>
            <p style={styles.description}>
              Enter your budget and estimated expenses.
            </p>

            <label style={styles.label}>💰 Total Trip Budget (₹)</label>
            <input
              style={styles.input}
              type="number"
              min="0"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="Enter your total budget"
            />

            <h3 style={styles.subheading}>Expense Categories</h3>

            {expenses.map(item => (
              <div key={item.label} style={styles.expenseField}>
                <label style={styles.label}>
                  {item.icon} {item.label}
                </label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  value={item.value}
                  onChange={e => item.setter(e.target.value)}
                  placeholder="Enter amount in rupees"
                />
              </div>
            ))}

            <button onClick={resetCalculator} style={styles.resetButton}>
              ↻ Reset Calculator
            </button>
          </div>

          <div style={styles.summaryCard}>
            <h2 style={{ color: "white" }}>📊 Budget Overview</h2>
            <p style={{ color: "#e1edf3", marginTop: 5 }}>
              Your travel expense summary
            </p>

            <div style={styles.totalBox}>
              <p style={{ color: "#52677a" }}>Total Estimated Expenses</p>
              <h1 style={styles.totalAmount}>{money(total)}</h1>
            </div>

            <div style={styles.statBox}>
              <div>
                <small>Total Budget</small>
                <h3>{money(budgetAmount)}</h3>
              </div>
              <div>
                <small>{remaining < 0 ? "Over Budget" : "Remaining"}</small>
                <h3 style={{ color: remaining < 0 ? "#ffaaaa" : "#a5f3c0" }}>
                  {remaining < 0 ? "-" : ""}{money(Math.abs(remaining))}
                </h3>
              </div>
            </div>

            <div style={styles.progressHeader}>
              <span>Budget Used</span>
              <strong>{percentage.toFixed(1)}%</strong>
            </div>

            <div style={styles.progressTrack}>
              <div style={{
                ...styles.progressBar,
                width: `${percentage}%`,
                background: remaining < 0 ? "#ff7777" : "#ffb36b"
              }} />
            </div>

            <div style={styles.status}>
              {remaining < 0
                ? "⚠️ Your expenses exceed your budget. Try reducing some costs!"
                : remaining === 0
                ? "🎉 Your full budget is allocated!"
                : "✅ Great! You are within your travel budget."}
            </div>
          </div>
        </div>

        <div style={styles.breakdown}>
          <h2>📌 Expense Breakdown</h2>
          <p style={{ color: "#627d98", marginBottom: 20 }}>
            See where your travel money is going.
          </p>

          {expenses.map(item => {
            const amount = Math.max(0, Number(item.value) || 0);
            const share = total > 0 ? (amount / total) * 100 : 0;

            return (
              <div key={item.label} style={styles.breakdownItem}>
                <div style={styles.breakdownTop}>
                  <strong>{item.icon} {item.label}</strong>
                  <strong>{money(amount)}</strong>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{
                    ...styles.progressBar,
                    width: `${share}%`,
                    background: "#ff8755"
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "85vh",
    padding: "35px 5%",
    background: "linear-gradient(135deg, #fff8f2, #edf9fa)"
  },
  hero: {
    maxWidth: "1150px",
    margin: "0 auto 30px",
    padding: "30px",
    borderRadius: "22px",
    background: "linear-gradient(120deg, #102a43, #176b78)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px"
  },
  tag: {
    color: "#ffd1b9",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1.5px"
  },
  heading: {
    color: "white",
    fontSize: "clamp(27px, 4vw, 40px)",
    margin: "12px 0"
  },
  subtitle: {
    color: "#e0edf3",
    maxWidth: "570px"
  },
  heroIcon: { fontSize: "80px" },
  container: { maxWidth: "1150px", margin: "auto" },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "25px",
    alignItems: "stretch"
  },
  card: {
    background: "white",
    padding: "28px",
    borderRadius: "22px",
    boxShadow: "0 10px 30px rgba(16,42,67,0.08)"
  },
  title: { color: "#102a43", fontSize: "24px" },
  description: { color: "#627d98", margin: "5px 0 22px" },
  label: {
    display: "block",
    fontWeight: "600",
    color: "#243b53",
    marginTop: "13px"
  },
  input: {
    width: "100%",
    padding: "13px",
    marginTop: "8px",
    border: "1px solid #dce5ed",
    borderRadius: "11px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none"
  },
  subheading: {
    marginTop: "25px",
    color: "#102a43",
    borderBottom: "2px solid #ffede4",
    paddingBottom: "12px"
  },
  expenseField: { marginBottom: "15px" },
  resetButton: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "12px",
    background: "#ff6b35",
    color: "white",
    fontWeight: "bold"
  },
  summaryCard: {
    background: "linear-gradient(145deg, #102a43, #176b78)",
    borderRadius: "22px",
    padding: "28px",
    color: "white",
    boxShadow: "0 10px 30px rgba(16,42,67,0.13)"
  },
  totalBox: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    marginTop: "25px"
  },
  totalAmount: {
    color: "#ff6b35",
    fontSize: "34px",
    marginTop: "5px"
  },
  statBox: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    margin: "25px 0"
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    marginBottom: "10px"
  },
  progressTrack: {
    height: "12px",
    background: "#e7e9ec",
    borderRadius: "20px",
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    borderRadius: "20px",
    transition: "width 0.3s"
  },
  status: {
    background: "rgba(255,255,255,0.13)",
    padding: "15px",
    borderRadius: "12px",
    marginTop: "25px",
    color: "white",
    fontWeight: "600"
  },
  breakdown: {
    background: "white",
    padding: "28px",
    borderRadius: "22px",
    marginTop: "25px",
    boxShadow: "0 8px 25px rgba(16,42,67,0.07)"
  },
  breakdownItem: { marginBottom: "20px" },
  breakdownTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "9px",
    color: "#243b53"
  }
};

export default Budget;
