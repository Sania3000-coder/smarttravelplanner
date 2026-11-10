
import { useState } from "react";

function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Explore the Beauty of Manali",
      place: "Manali, Himachal Pradesh",
      category: "Mountain",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      description: "Discover beautiful mountains, snow-covered valleys, peaceful rivers and amazing adventure activities in Manali.",
      full: "Manali is a beautiful hill station surrounded by the Himalayas. You can visit Solang Valley, Hadimba Temple, Old Manali and enjoy snow activities."
    },
    {
      id: 2,
      title: "Enjoy the Beaches of Goa",
      place: "Goa, India",
      category: "Beach",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      description: "Experience beautiful beaches, amazing sunsets, delicious food and unforgettable holidays in Goa.",
      full: "Goa is famous for its beaches, nightlife, churches and Portuguese architecture. Visit Baga Beach, Calangute Beach and Fort Aguada."
    },
    {
      id: 3,
      title: "Discover Royal Jaipur",
      place: "Jaipur, Rajasthan",
      category: "Heritage",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      description: "Explore royal palaces, historic forts, colourful markets and the rich culture of Rajasthan.",
      full: "Jaipur is known as the Pink City. Visit Hawa Mahal, Amber Fort, City Palace and enjoy traditional Rajasthani food and shopping."
    },
    {
      id: 4,
      title: "Experience Peaceful Kerala",
      place: "Kerala, India",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      description: "Enjoy peaceful backwaters, green landscapes, beautiful tea gardens and relaxing houseboat journeys.",
      full: "Kerala offers beautiful destinations like Munnar, Alleppey and Wayanad. Enjoy houseboat rides, waterfalls and delicious South Indian food."
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      padding: "45px 6%",
      background: "linear-gradient(180deg, #edf9fa 0%, #fff8f2 100%)",
      fontFamily: "Arial, sans-serif"
    }}>

      <div style={{
        textAlign: "center",
        marginBottom: "42px"
      }}>
        <span style={{
          display: "inline-block",
          background: "#d9f0ef",
          color: "#176b78",
          padding: "8px 18px",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "13px",
          letterSpacing: "1px"
        }}>
          ✈ TRAVEL STORIES & INSPIRATION
        </span>

        <h1 style={{
          fontSize: "clamp(30px, 5vw, 43px)",
          color: "#102a43",
          margin: "18px 0 12px"
        }}>
          Explore Our Travel Blogs
        </h1>

        <p style={{
          color: "#587080",
          fontSize: "16px",
          lineHeight: "1.7",
          maxWidth: "650px",
          margin: "auto"
        }}>
          Discover beautiful destinations, explore new cultures and find
          inspiration for your next unforgettable journey.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "28px",
        maxWidth: "1250px",
        margin: "auto"
      }}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{
            background: "#ffffff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(16,42,67,0.09)",
            border: "1px solid #e5eeee",
            display: "flex",
            flexDirection: "column"
          }}>

            <div style={{
              height: "220px",
              overflow: "hidden"
            }}>
              <img
                src={blog.image}
                alt={blog.place}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>

            <div style={{
              padding: "23px",
              display: "flex",
              flexDirection: "column",
              flex: 1
            }}>

              <span style={{
                background: "#e5f4f3",
                color: "#176b78",
                padding: "7px 13px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                alignSelf: "flex-start"
              }}>
                {blog.category}
              </span>

              <h2 style={{
                fontSize: "21px",
                color: "#102a43",
                margin: "15px 0 10px",
                lineHeight: "1.4"
              }}>
                {blog.title}
              </h2>

              <p style={{
                color: "#ff6b35",
                fontSize: "13px",
                fontWeight: "bold",
                margin: "0 0 13px"
              }}>
                📍 {blog.place}
              </p>

              <p style={{
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.7",
                margin: "0 0 12px"
              }}>
                {blog.description}
              </p>

              {selectedBlog === blog.id && (
                <div style={{
                  background: "#f0f8f8",
                  borderLeft: "4px solid #176b78",
                  padding: "13px",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}>
                  <p style={{
                    color: "#334e68",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    margin: 0
                  }}>
                    {blog.full}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedBlog(
                  selectedBlog === blog.id ? null : blog.id
                )}
                style={{
                  marginTop: "auto",
                  padding: "12px 20px",
                  background: "#ff6b35",
                  color: "white",
                  border: "none",
                  borderRadius: "9px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                  alignSelf: "flex-start"
                }}
              >
                {selectedBlog === blog.id ? "Read Less ↑" : "Read More →"}
              </button>

            </div>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: "900px",
        margin: "55px auto 5px",
        padding: "30px 20px",
        textAlign: "center",
        background: "#102a43",
        borderRadius: "18px",
        color: "white"
      }}>
        <h2 style={{ margin: "0 0 10px", fontSize: "25px" }}>
          Your Next Adventure Starts Here! ✈️
        </h2>
        <p style={{
          color: "#d7e5ed",
          lineHeight: "1.7",
          margin: 0
        }}>
          Explore destinations and plan your dream trip with Smart Travel Planner.
        </p>
      </div>

    </div>
  );
}

export default Blogs;
