import React from "react";
import LoggingPage from "./pages/LoggingPage";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "logging",
      pages: {
        logging: <LoggingPage />,
      },
    };
  }

  getPageComponent() {
    const pages = {
      logging: <LoggingPage />,
    };
    return pages[this.state.page];
  }

  render() {
    return <div>{this.getPageComponent()}</div>;
  }
}
export default Router;
