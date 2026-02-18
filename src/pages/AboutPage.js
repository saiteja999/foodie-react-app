const AboutPage = () => (
  <div className="body">
    <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#2d3436", marginBottom: "1rem" }}>
        About Foodie
      </h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "18px", color: "#2d3436", lineHeight: "1.8", marginBottom: "1.5rem", fontWeight: 500 }}>
          Welcome to Foodie, your ultimate destination for discovering and ordering delicious meals from the best restaurants in town!
        </p>
        
        <p style={{ fontSize: "16px", color: "#636e72", lineHeight: "1.8", marginBottom: "1rem" }}>
          At Foodie, we believe that great food should be accessible to everyone, anytime, anywhere. Our platform connects food lovers with a curated selection of top-rated restaurants, offering everything from quick bites to gourmet dining experiences.
        </p>
        
        <p style={{ fontSize: "16px", color: "#636e72", lineHeight: "1.8", marginBottom: "1rem" }}>
          Whether you're craving authentic Indian cuisine, international flavors, or comfort food classics, Foodie makes it easy to explore menus, read reviews, and place orders with just a few clicks. Our intuitive interface and seamless ordering process ensure that your favorite meals are just moments away.
        </p>
        
        <p style={{ fontSize: "16px", color: "#636e72", lineHeight: "1.8", marginBottom: "1rem" }}>
          We're committed to providing an exceptional user experience, featuring real-time menu updates, secure payment processing, and reliable delivery tracking. Our team works tirelessly to partner with the finest restaurants and bring you the best culinary experiences.
        </p>
        
        <p style={{ fontSize: "16px", color: "#636e72", lineHeight: "1.8" }}>
          Join thousands of satisfied customers who trust Foodie for their daily dining needs. From breakfast to late-night snacks, we've got you covered!
        </p>
      </div>

      <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "2px solid #e9ecef" }}>
        <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#2d3436", marginBottom: "1rem" }}>Built With Modern Technology</h3>
        <p style={{ fontSize: "14px", color: "#636e72", marginBottom: "1rem" }}>
          Foodie is built using cutting-edge web technologies to ensure fast, reliable, and scalable performance:
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "0.5rem 0", color: "#636e72" }}>⚛️ React 18 - Modern UI framework</li>
          <li style={{ padding: "0.5rem 0", color: "#636e72" }}>🔄 Redux Toolkit - State management</li>
          <li style={{ padding: "0.5rem 0", color: "#636e72" }}>🛣️ React Router - Seamless navigation</li>
          <li style={{ padding: "0.5rem 0", color: "#636e72" }}>🎣 Custom Hooks - Reusable logic</li>
          <li style={{ padding: "0.5rem 0", color: "#636e72" }}>🌐 External API Integration - Real-time data</li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutPage;
