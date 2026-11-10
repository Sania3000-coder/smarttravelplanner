
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const destinationData = {
  goa: {
    name: "Goa",
    location: "India",
    rating: "4.8",
    budget: "₹8,000",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    description: "Goa is famous for its beautiful beaches, relaxing atmosphere, nightlife and delicious food. It is a perfect destination for a fun and memorable holiday."
  },
  manali: {
    name: "Manali",
    location: "Himachal Pradesh",
    rating: "4.7",
    budget: "₹10,000",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    description: "Manali is a beautiful mountain destination surrounded by snow-covered peaks, valleys and rivers. It is perfect for nature lovers and adventure seekers."
  },
  jaipur: {
    name: "Jaipur",
    location: "Rajasthan",
    rating: "4.6",
    budget: "₹7,000",
    category: "City",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    description: "Jaipur, the Pink City, is famous for its magnificent forts, palaces, traditional culture and delicious Rajasthani food."
  },
  rishikesh: {
    name: "Rishikesh",
    location: "Uttarakhand",
    rating: "4.8",
    budget: "₹6,000",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    description: "Rishikesh is known for adventure activities, the Ganges, yoga and peaceful natural surroundings."
  },
  amritsar: {
    name: "Amritsar",
    location: "Punjab",
    rating: "4.7",
    budget: "₹5,000",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80",
    description: "Amritsar is a cultural and historical destination famous for the Golden Temple, delicious Punjabi food and rich heritage."
  },
  ladakh: {
    name: "Ladakh",
    location: "India",
    rating: "4.9",
    budget: "₹15,000",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    description: "Ladakh is famous for dramatic mountains, beautiful lakes, monasteries and unforgettable road-trip experiences."
  }
};

function DestinationDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const place = destinationData[name?.toLowerCase()];

  if (!place) {
    return (
      <div style={styles.notFound}>
        <div style={{ fontSize: "65px" }}>🌍</div>
        <h1 style={{ color: "#102a43" }}>
          Destination Not Found
        </h1>
        <p style={{ color: "#64748b" }}>
          Sorry! We couldn't find this destination.
        </p>
        <button
          style={styles.backButton}
          onClick={() => navigate("/explore")}
        >
          ← Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <div style={styles.topSection}>
        <button
          style={styles.backButton}
          onClick={() => navigate("/explore")}
        >
          ← Back to Explore
        </button>

        <span style={styles.topLabel}>
          DISCOVER YOUR NEXT DESTINATION
        </span>
      </div>

      <div style={styles.card}>

        <div style={styles.imageContainer}>
          <img
            src={place.image}
            alt={place.name}
            style={styles.image}
          />

          <div style={styles.imageOverlay}>
            <span style={styles.imageBadge}>
              ✨ {place.category} Destination
            </span>

            <h1 style={styles.imageTitle}>
              Explore {place.name}
            </h1>

            <p style={styles.imageLocation}>
              📍 {place.location}
            </p>
          </div>
        </div>

        <div style={styles.content}>

          <div style={styles.headingSection}>
            <div>
              <span style={styles.category}>
                {place.category.toUpperCase()}
              </span>

              <h2 style={styles.heading}>
                About {place.name}
              </h2>
            </div>

            <div style={styles.rating}>
              ⭐ {place.rating}/5
              <span style={{
                display: "block",
                fontSize: "11px",
                color: "#718096",
                marginTop: "4px"
              }}>
                Destination Rating
              </span>
            </div>
          </div>

          <p style={styles.description}>
            {place.description}
          </p>

          <div style={styles.infoGrid}>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>📍</div>
              <span style={styles.infoLabel}>Location</span>
              <strong style={styles.infoValue}>
                {place.location}
              </strong>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>⭐</div>
              <span style={styles.infoLabel}>Rating</span>
              <strong style={styles.infoValue}>
                {place.rating}/5
              </strong>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>💰</div>
              <span style={styles.infoLabel}>Starting Budget</span>
              <strong style={styles.infoValue}>
                {place.budget}
              </strong>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>🏷️</div>
              <span style={styles.infoLabel}>Category</span>
              <strong style={styles.infoValue}>
                {place.category}
              </strong>
            </div>

          </div>

          <div style={styles.ctaSection}>
            <div>
              <h2 style={styles.ctaHeading}>
                Ready for your next adventure?
              </h2>
              <p style={styles.ctaText}>
                Create your travel plan and make unforgettable memories.
              </p>
            </div>

            <button
              style={styles.planButton}
              onClick={() =>
                  navigate("/planner", {
                  state: {
                  destination: place.name,
                  autoGenerate: true
                  }
                  })
                  }
              >
              ✈️ Plan My Trip →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "35px 6%",
    background: "linear-gradient(180deg, #edf9fa, #fff8f2)",
    fontFamily: "Arial, sans-serif"
  },

  topSection: {
    maxWidth: "1100px",
    margin: "0 auto 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  topLabel: {
    color: "#176b78",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "1px"
  },

  backButton: {
    border: "1px solid #e2e8f0",
    background: "white",
    color: "#176b78",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px"
  },

  card: {
    maxWidth: "1100px",
    margin: "auto",
    background: "white",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow: "0 15px 45px rgba(16,42,67,0.10)"
  },

  imageContainer: {
    height: "420px",
    position: "relative",
    overflow: "hidden",
    background: "#102a43"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.85
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, rgba(16,42,67,0.8), transparent)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px"
  },

  imageBadge: {
    background: "#ff6b35",
    color: "white",
    padding: "9px 16px",
    borderRadius: "25px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  imageTitle: {
    color: "white",
    fontSize: "clamp(32px, 5vw, 48px)",
    margin: "18px 0 8px"
  },

  imageLocation: {
    color: "white",
    fontSize: "17px"
  },

  content: {
    padding: "35px"
  },

  headingSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px"
  },

  category: {
    background: "#e5f4f3",
    color: "#176b78",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },

  heading: {
    color: "#102a43",
    fontSize: "27px",
    margin: "18px 0 5px"
  },

  rating: {
    background: "#fff5e9",
    color: "#d97706",
    padding: "13px 18px",
    borderRadius: "12px",
    fontWeight: "bold",
    textAlign: "center"
  },

  description: {
    color: "#64748b",
    lineHeight: "1.9",
    fontSize: "16px",
    margin: "15px 0 28px"
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginBottom: "35px"
  },

  infoBox: {
    background: "#f5fafb",
    border: "1px solid #e4eeee",
    borderRadius: "14px",
    padding: "20px 15px"
  },

  infoIcon: {
    fontSize: "25px",
    marginBottom: "12px"
  },

  infoLabel: {
    display: "block",
    color: "#718096",
    fontSize: "12px",
    marginBottom: "8px"
  },

  infoValue: {
    color: "#102a43",
    fontSize: "16px"
  },

  ctaSection: {
    background: "#102a43",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  ctaHeading: {
    color: "white",
    fontSize: "21px",
    margin: "0 0 8px"
  },

  ctaText: {
    color: "#d5e2eb",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0
  },

  planButton: {
    border: "none",
    background: "#ff6b35",
    color: "white",
    padding: "15px 23px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold"
  },

  notFound: {
    minHeight: "70vh",
    background: "#edf9fa",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "30px"
  }
};

export default DestinationDetails;
