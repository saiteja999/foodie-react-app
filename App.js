import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => (
  <h1 className="title" tabIndex="5">
    Title Component - invoked in HeadingComponent
  </h1>
);

//Component Composition
const HeadingComponent = () => (
  <div>
    <Title />
    <h1>Heading Component</h1>
  </div>
);

//const HeadingComponent = () => <h1>Functional Component</h1>

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(HeadingComponent());
root.render(<HeadingComponent />);
