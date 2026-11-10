
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    name: "Goa",
    location: "India",
    category: "Beach",
    budget: "₹8,000",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Manali",
    location: "Himachal Pradesh",
    category: "Mountain",
    budget: "₹10,000",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jaipur",
    location: "Rajasthan",
    category: "City",
    budget: "₹7,000",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rishikesh",
    location: "Uttarakhand",
    category: "Adventure",
    budget: "₹6,000",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Amritsar",
    location: "Punjab",
    category: "Culture",
    budget: "₹5,000",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ladakh",
    location: "India",
    category: "Mountain",
    budget: "₹15,000",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  },
];

function Explore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Beach", "Mountain", "City", "Adventure", "Culture"];

  const filteredDestinations = destinations.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || place.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page">

      <style>{`
        .explore-page {
          background: #f5f7fa;
          min-height: 100vh;
          color: #102a43;
          font-family: Arial, sans-serif;
        }

        .explore-hero {
          padding: 75px 7%;
          text-align: center;
          color: white;
          background:
            linear-gradient(120deg, rgba(16,42,67,.96), rgba(8,126,139,.82)),
            url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1500")
            center/cover;
        }

        .explore-hero .tag {
          color: #ffcf55;
          font-weight: bold;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .explore-hero h1 {
          color: white;
          font-size: clamp(35px, 5vw, 52px);
          margin: 18px 0;
        }

        .explore-hero h1 span {
          color: #ffb703;
        }

        .explore-hero p {
          color: #e5edf5;
          max-width: 650px;
          margin: auto;
          font-size: 17px;
          line-height: 1.8;
        }

        .explore-content {
          max-width: 1250px;
          width: 88%;
          margin: auto;
          padding: 55px 0 75px;
        }

        .explore-search {
          max-width: 650px;
          margin: 0 auto 30px;
          background: white;
          border: 1px solid #e0e7ef;
          border-radius: 50px;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 6px 22px rgba(16,42,67,.07);
        }

        .explore-search input {
          border: none;
          outline: none;
          box-shadow: none;
          margin: 0;
          width: 100%;
          background: transparent;
          padding: 12px 5px;
          font-size: 15px;
        }

        .explore-search input:focus {
          box-shadow: none;
        }

        .explore-categories {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 50px;
        }

        .explore-category {
          background: white;
          color: #087e8b;
          border: 1px solid #087e8b;
          padding: 11px 23px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          transition: .3s;
        }

        .explore-category:hover {
          background: #e2f4f4;
          transform: translateY(-2px);
        }

        .explore-category.active {
          background: #087e8b;
          color: white;
          box-shadow: 0 5px 14px rgba(8,126,139,.2);
        }

        .explore-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 15px;
          margin-bottom: 28px;
        }

        .explore-heading small {
          color: #087e8b;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .explore-heading h2 {
          color: #102a43;
          font-size: 30px;
          margin: 10px 0 0;
        }

        .places-count {
          color: #66788a;
          font-size: 14px;
        }

        .explore-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px;
        }

        .explore-card {
          background: white;
          border-radius: 17px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(16,42,67,.08);
          transition: .3s ease;
        }

        .explore-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 12px 28px rgba(16,42,67,.15);
        }

        .explore-image-box {
          height: 225px;
          position: relative;
          overflow: hidden;
        }

        .explore-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: .4s;
        }

        .explore-card:hover .explore-image {
          transform: scale(1.06);
        }

        .explore-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #ffb703;
          color: #102a43;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .explore-info {
          padding: 21px;
        }

        .explore-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .explore-title-row h3 {
          color: #102a43;
          font-size: 23px;
          margin: 0;
        }

        .explore-rating {
          color: #bd8300;
          font-weight: bold;
          font-size: 14px;
        }

        .explore-location {
          color: #718096;
          margin: 12px 0 20px;
          font-size: 14px;
        }

        .explore-bottom {
          border-top: 1px solid #edf0f3;
          padding-top: 17px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }

        .explore-price small {
          display: block;
          color: #8996a5;
          font-size: 12px;
        }

        .explore-price strong {
          display: block;
          color: #087e8b;
          font-size: 20px;
          margin-top: 5px;
        }

        .explore-details {
          background: #087e8b;
          color: white;
          border: none;
          padding: 11px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: .3s;
        }

        .explore-details:hover {
          background: #102a43;
          transform: translateY(-2px);
        }

        .explore-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 65px 20px;
          background: white;
          border-radius: 16px;
        }

        .explore-empty h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .explore-empty p {
          color: #718096;
        }

        @media(max-width: 950px) {
          .explore-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media(max-width: 600px) {
          .explore-hero {
            padding: 60px 5%;
          }

          .explore-content {
            width: 90%;
          }

          .explore-grid {
            grid-template-columns: 1fr;
          }

          .explore-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .explore-heading h2 {
            font-size: 25px;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="explore-hero">
        <span className="tag">✈️ DISCOVER YOUR NEXT ADVENTURE</span>
        <h1>
          Explore Amazing <span>Destinations</span>
        </h1>
        <p>
          Find beautiful places, exciting experiences and unforgettable
          journeys with Smart Travel Planner.
        </p>
      </section>

      {/* CONTENT */}
      <section className="explore-content">

        {/* SEARCH */}
        <div className="explore-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search destination or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="explore-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={`explore-category ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* HEADING */}
        <div className="explore-heading">
          <div>
            <small>POPULAR DESTINATIONS</small>
            <h2>Where Will You Go Next?</h2>
          </div>
          <span className="places-count">
            {filteredDestinations.length} places found
          </span>
        </div>

        {/* DESTINATION CARDS */}
        <div className="explore-grid">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((place) => (
              <div className="explore-card" key={place.name}>

                <div className="explore-image-box">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="explore-image"
                  />
                  <span className="explore-badge">
                    {place.category}
                  </span>
                </div>

                <div className="explore-info">
                  <div className="explore-title-row">
                    <h3>{place.name}</h3>
                    <span className="explore-rating">
                      ⭐ {place.rating}
                    </span>
                  </div>

                  <p className="explore-location">
                    📍 {place.location}
                  </p>

                  <div className="explore-bottom">
                    <div className="explore-price">
                      <small>Starting from</small>
                      <strong>{place.budget}</strong>
                    </div>

                    <button
                      className="explore-details"
                      onClick={() =>
                        navigate(`/destination/${place.name.toLowerCase()}`)
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="explore-empty">
              <h3>😔 No Destinations Found</h3>
              <p>Try another destination or select a different category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Explore;
