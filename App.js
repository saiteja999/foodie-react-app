import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => (
  <h1 className="title" tabIndex="5">
    Title Component - invoked in HeadingComponent
  </h1>
)

const number = 1000;

//Component Composition
const HeadingComponent = () => (
  <div>
    <Title />
    <h1>Heading Component</h1>
  </div>
);

//React element can be placed in {}
const jsxHeading = (
    <h1 className="heading" tabIndex="5">
    <HeadingComponent/>
      Hello React
    </h1>
  );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);
