import React from "react";

class RegisterLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPageComponent() {
    const pages = {
      logging: <LoggingPage />,
    };
    return pages[this.state.pages];
  }

  render() {
    return <div></div>;
  }
}
export default RegisterLog;
