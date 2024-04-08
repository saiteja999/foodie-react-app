import React from "react";
import ReactDOM from "react-dom/client";

const Title = function () {
  return (
    <h1 className="title" tabIndex="5">
      Title Component - invoked in HeadingComponent
    </h1>
  );
};

//Component Composition
const HeadingComponent = function () {
  return (
    <div>
      <Title />
      <h1>Heading Component</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
