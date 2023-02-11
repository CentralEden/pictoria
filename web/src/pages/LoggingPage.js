import React from "react";
import { RegisterLog } from "../organisms/RegisterLog";
import { LogTable } from "../organisms/LogTable";
class LoggingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
  }

  render() {
    return (
      <div>
        <LogTable logs={this.state.logs}></LogTable>
        <RegisterLog
          onRegisterLog={(log) => this.registerLog(log)}
        ></RegisterLog>
      </div>
    );
  }

  registerLog(log) {
    const logs = this.state.logs.slice().concat([log]);
    this.setState({
      logs: logs,
    });
    console.log(this.state.logs);
  }
}
export default LoggingPage;
