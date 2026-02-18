const ContactPage = () => (
  <div className="body">
    <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#2d3436", marginBottom: "1rem" }}>
        Contact Us
      </h1>
      <p style={{ fontSize: "16px", color: "#636e72", lineHeight: "1.8", marginBottom: "2rem" }}>
        Have questions or feedback? We'd love to hear from you!
      </p>
      <div style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#2d3436", marginBottom: "0.5rem" }}>
            📧 Email
          </h3>
          <p style={{ color: "#636e72" }}>support@foodapp.com</p>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#2d3436", marginBottom: "0.5rem" }}>
            📱 Phone
          </h3>
          <p style={{ color: "#636e72" }}>+1 (555) 123-4567</p>
        </div>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#2d3436", marginBottom: "0.5rem" }}>
            🕒 Hours
          </h3>
          <p style={{ color: "#636e72" }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
