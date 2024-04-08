import React from "react";
import ReactDOM from "react-dom/client";

const jsxHeading = (
  <h1 className="heading" tabIndex="5">
    Hello React
  </h1>
);

//React Functional Component
const HeadingComponent = ()=>{
    return <h1>Functional Component1</h1>
}

//const HeadingComponent = () => <h1>Functional Component</h1>


const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(HeadingComponent());
root.render(<HeadingComponent/>);