import React from "react";
import ReactDOM from "react-dom/client";


const Header = () => {
  return (
  <div className="header">
    <div>
        <img class = "logo" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-Stp3j9l7A7FmeODEQvEwQcBTz_-55i1uZrCXG6lyA&s" alt = "image"/>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
  </div>
  );
};


const RestaurantCard = (props) =>{
  
  const {restaurant, cuisine} = props;

  return(
    <div className="res-card" style={{backgroundColor: "#f0f0f0"}}>
      <img className="res-logo" src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/irnwr59vlrmciau11or0" alt ="" />
      <h3>{restaurant}</h3>
      <h4>{cuisine}</h4>
      <h4> 4.5 stars </h4>
      <h4> 38 mins </h4>
    </div>
  )
}

const Body = () => {
  return (
  <div className="Body">
    <div className="search"> search </div>
    <div className="res-container">
      <RestaurantCard resName = "Meghana Foods" cuisine = "Biryani, Fast Food"/>
      <RestaurantCard resName = "KFC" cuisine = "French Fries"/>
    </div>
  </div>);
};

const Footer = () => {
  return <div className="Footer">Footer</div>;
};

const AppLayOut = () => {
  return (<div className="LayOut">
    <Header />
    <Body />
    <Footer />
  </div>)
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayOut/>);