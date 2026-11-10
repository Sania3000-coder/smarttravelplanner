
import { useEffect, useState } from "react";

function MyTrips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchTrips() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login to view your trips.");
                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/trips/my-trips",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Unable to load trips");

            setTrips(data.trips || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    async function deleteTrip(id) {
        if (!window.confirm("Are you sure you want to delete this trip?")) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/trips/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Unable to delete trip");

            setTrips(prev => prev.filter(trip => trip._id !== id));
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.hero}>
                <div>
                    <span style={styles.tag}>✈ YOUR TRAVEL COLLECTION</span>
                    <h1 style={styles.heading}>
                        My <span style={{ color: "#ff7547" }}>Trips</span>
                    </h1>
                    <p style={styles.subtitle}>
                        All your saved adventures in one place.
                        Explore your memories and manage your journeys!
                    </p>
                </div>
                <div style={styles.heroIcon}>🧳</div>
            </div>

            <div style={styles.container}>
                <div style={styles.sectionHeading}>
                    <div>
                        <h2>🌍 Your Saved Adventures</h2>
                        <p>Trips planned by you</p>
                    </div>
                    <span style={styles.count}>
                        {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
                    </span>
                </div>

                {loading && (
                    <div style={styles.stateBox}>
                        <div style={{ fontSize: "40px" }}>✈️</div>
                        <h3>Loading your adventures...</h3>
                    </div>
                )}

                {!loading && error && (
                    <div style={styles.stateBox}>
                        <div style={{ fontSize: "45px" }}>⚠️</div>
                        <h3>Unable to load trips</h3>
                        <p>{error}</p>
                        <button style={styles.retryButton} onClick={() => {
                            setLoading(true);
                            setError("");
                            fetchTrips();
                        }}>
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && trips.length === 0 && (
                    <div style={styles.emptyBox}>
                        <div style={styles.emptyIcon}>🏝️</div>
                        <h2>No Trips Saved Yet!</h2>
                        <p>
                            Your next adventure is waiting.
                            Start planning a beautiful journey today.
                        </p>
                    </div>
                )}

                {!loading && !error && trips.length > 0 && (
                    <div style={styles.grid}>
                        {trips.map(trip => (
                            <div key={trip._id} style={styles.card}>
                                <div style={styles.cardTop}>
                                    <span style={styles.locationIcon}>📍</span>
                                    <span style={styles.savedLabel}>SAVED TRIP</span>
                                </div>

                                <h2 style={styles.destination}>
                                    {trip.destination}
                                </h2>

                                <div style={styles.details}>
                                    <div style={styles.detailItem}>
                                        <span>📅</span>
                                        <div>
                                            <small>Duration</small>
                                            <strong>{trip.days} Days</strong>
                                        </div>
                                    </div>

                                    <div style={styles.detailItem}>
                                        <span>👥</span>
                                        <div>
                                            <small>Travelers</small>
                                            <strong>{trip.travelers} People</strong>
                                        </div>
                                    </div>

                                    <div style={styles.detailItem}>
                                        <span>💰</span>
                                        <div>
                                            <small>Total Budget</small>
                                            <strong>₹{Number(trip.budget).toLocaleString("en-IN")}</strong>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteTrip(trip._id)}
                                    style={styles.deleteButton}
                                >
                                    🗑️ Delete Trip
                                </button>
                            </div>
                        ))}
                    </div>
                )}
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
        margin: "0 auto 35px",
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
        fontSize: "40px",
        margin: "12px 0"
    },
    subtitle: {
        color: "#e0edf3",
        maxWidth: "550px"
    },
    heroIcon: {
        fontSize: "85px"
    },
    container: {
        maxWidth: "1150px",
        margin: "auto"
    },
    sectionHeading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        marginBottom: "25px"
    },
    count: {
        background: "#ffede4",
        color: "#e65320",
        padding: "9px 18px",
        borderRadius: "25px",
        fontWeight: "bold"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px"
    },
    card: {
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(16,42,67,0.09)",
        border: "1px solid #edf0f4"
    },
    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    locationIcon: {
        fontSize: "30px"
    },
    savedLabel: {
        color: "#16834a",
        background: "#e9f8ef",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "bold"
    },
    destination: {
        color: "#ff6b35",
        fontSize: "25px",
        margin: "15px 0 20px"
    },
    details: {
        display: "grid",
        gap: "15px",
        marginBottom: "22px"
    },
    detailItem: {
        display: "flex",
        alignItems: "center",
        gap: "13px",
        background: "#f7fafc",
        padding: "12px",
        borderRadius: "12px"
    },
    deleteButton: {
        width: "100%",
        padding: "12px",
        background: "#fff0ef",
        color: "#d93636",
        borderRadius: "11px",
        fontWeight: "bold",
        border: "1px solid #ffd5d2"
    },
    stateBox: {
        textAlign: "center",
        background: "white",
        borderRadius: "20px",
        padding: "50px 20px",
        boxShadow: "0 8px 25px rgba(16,42,67,0.07)"
    },
    emptyBox: {
        textAlign: "center",
        background: "white",
        padding: "55px 20px",
        borderRadius: "22px",
        boxShadow: "0 8px 25px rgba(16,42,67,0.07)"
    },
    emptyIcon: {
        fontSize: "70px",
        marginBottom: "15px"
    },
    retryButton: {
        marginTop: "18px",
        background: "#ff6b35",
        color: "white",
        padding: "12px 25px",
        borderRadius: "10px"
    }
};

export default MyTrips;
