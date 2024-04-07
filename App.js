import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1",{id:"child"},"Hello World 123 from React");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);