
import { useNavigate } from "react-router-dom";
import TravelChatbot from "../components/TravelChatbot";

function Home() {
  const navigate = useNavigate();

  const destinations = [
    {
      name: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700",
      description: "Beautiful beaches and unforgettable sunsets."
    },
    {
      name: "Manali",
      country: "Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700",
      description: "Mountains, snow and peaceful nature."
    },
    {
      name: "Jaipur",
      country: "Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=700",
      description: "Explore royal palaces and rich culture."
    },
    {
      name: "Agra",
      country: "Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700",
      description: "Discover the beauty of the Taj Mahal."
    }
  ];

  const features = [
    {
      icon: "🗺️",
      title: "Smart Trip Planner",
      desc: "Plan your dream trip with customized travel itineraries.",
      path: "/planner"
    },
    {
      icon: "💰",
      title: "Budget Calculator",
      desc: "Calculate your travel expenses and manage your budget.",
      path: "/budget"
    },
    {
      icon: "🌤️",
      title: "Live Weather",
      desc: "Check weather information before starting your journey.",
      path: "/weather"
    }
  ];

  return (
    <div className="home-page">

      <style>{`
        .home-page {
          font-family: Arial, sans-serif;
          color: #102a43;
          background: #f5f7fa;
          overflow: hidden;
        }

        .hero {
          min-height: 590px;
          display: flex;
          align-items: center;
          padding: 70px 8%;
          background:
            linear-gradient(90deg, rgba(10,30,48,.88), rgba(10,30,48,.25)),
            url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800")
            center/cover;
          color: white;
        }

        .hero-content {
          max-width: 650px;
        }

        .hero-tag {
          display: inline-block;
          background: rgba(255,183,3,.2);
          color: #ffcf55;
          padding: 10px 18px;
          border-radius: 30px;
          margin-bottom: 22px;
          font-weight: bold;
        }

        .hero h1 {
          color: white;
          font-size: clamp(38px, 6vw, 65px);
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .hero p {
          color: #edf4fa;
          font-size: 17px;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 15px 27px;
          border-radius: 9px;
          font-weight: bold;
          font-size: 15px;
          border: 2px solid #087e8b;
          background: #087e8b;
          color: white;
          cursor: pointer;
          transition: .3s;
        }

        .hero-btn:hover {
          background: #ffb703;
          border-color: #ffb703;
          color: #102a43;
          transform: translateY(-3px);
        }

        .hero-btn.secondary {
          background: transparent;
          border-color: white;
        }

        .hero-btn.secondary:hover {
          background: white;
          color: #102a43;
        }

        .section {
          padding: 75px 8%;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-heading span {
          color: #087e8b;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 13px;
        }

        .section-heading h2 {
          font-size: 35px;
          margin: 12px 0;
          color: #102a43;
        }

        .section-heading p {
          color: #66788a;
          line-height: 1.7;
        }

        .destination-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 23px;
        }

        .destination-card {
          background: white;
          border-radius: 17px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(16,42,67,.08);
          transition: .3s;
        }

        .destination-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(16,42,67,.15);
        }

        .destination-card img {
          width: 100%;
          height: 210px;
          object-fit: cover;
          display: block;
        }

        .destination-info {
          padding: 20px;
        }

        .destination-info small {
          color: #087e8b;
          font-weight: bold;
        }

        .destination-info h3 {
          margin: 9px 0;
          font-size: 22px;
        }

        .destination-info p {
          color: #718096;
          font-size: 14px;
          line-height: 1.6;
          min-height: 45px;
        }

        .destination-info button {
          margin-top: 15px;
          background: #087e8b;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 11px 17px;
          font-weight: bold;
          cursor: pointer;
        }

        .destination-info button:hover {
          background: #102a43;
        }

        .features-section {
          background: #102a43;
        }

        .features-section .section-heading h2 {
          color: white;
        }

        .features-section .section-heading p {
          color: #cbd5e1;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .feature-card {
          background: #1c3b56;
          border: 1px solid rgba(255,255,255,.1);
          padding: 32px 25px;
          border-radius: 16px;
          text-align: center;
          transition: .3s;
        }

        .feature-card:hover {
          transform: translateY(-7px);
          background: #244b68;
        }

        .feature-icon {
          font-size: 42px;
          margin-bottom: 18px;
        }

        .feature-card h3 {
          color: white;
          margin-bottom: 13px;
        }

        .feature-card p {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 14px;
          min-height: 48px;
        }

        .feature-card button {
          margin-top: 20px;
          background: #ffb703;
          color: #102a43;
          border: none;
          padding: 11px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .cta-section {
          margin: 65px 8%;
          padding: 55px 25px;
          border-radius: 20px;
          text-align: center;
          color: white;
          background: linear-gradient(120deg, #087e8b, #102a43);
        }

        .cta-section h2 {
          color: white;
          font-size: 32px;
          margin-bottom: 15px;
        }

        .cta-section p {
          color: #e5f5f5;
          margin-bottom: 24px;
        }

        .cta-section button {
          background: #ffb703;
          color: #102a43;
          border: none;
          padding: 14px 25px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        @media(max-width: 1000px) {
          .destination-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 650px) {
          .hero {
            min-height: 520px;
            padding: 55px 6%;
          }

          .section {
            padding: 55px 6%;
          }

          .destination-grid,
          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-heading h2 {
            font-size: 28px;
          }

          .cta-section {
            margin: 35px 5%;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">✈️ YOUR JOURNEY STARTS HERE</span>

          <h1>Explore The World, Your Way.</h1>

          <p>
            Discover amazing destinations, create personalized travel plans
            and explore the world without worrying about your budget.
            Your perfect journey starts with us!
          </p>

          <div className="hero-buttons">
            <button className="hero-btn" onClick={() => navigate("/explore")}>
              Explore Destinations →
            </button>

            <button
              className="hero-btn secondary"
              onClick={() => navigate("/planner")}
            >
              Plan My Trip ✈️
            </button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section">
        <div className="section-heading">
          <span>Explore Places</span>
          <h2>Popular Destinations</h2>
          <p>Find your next favourite destination and make beautiful memories.</p>
        </div>

        <div className="destination-grid">
          {destinations.map((place) => (
            <div className="destination-card" key={place.name}>
              <img src={place.image} alt={place.name} />

              <div className="destination-info">
                <small>📍 {place.country}</small>
                <h3>{place.name}</h3>
                <p>{place.description}</p>

                <button onClick={() => navigate("/destination/" + place.name)}>
                  Explore More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="section-heading">
          <span>Why Choose Us</span>
          <h2>Everything You Need To Travel</h2>
          <p>Make your travel planning simple, smart and stress-free.</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <button onClick={() => navigate(feature.path)}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <h2>Ready For Your Next Adventure?</h2>
        <p>Start planning your dream trip today with Smart Travel Planner.</p>
        <button onClick={() => navigate("/planner")}>
          Start Planning Now ✈️
        </button>
      </section>

      {/* CHATBOT */}
      <TravelChatbot />

    </div>
  );
}

export default Home;
