import React from "react";

export class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const logs = this.props.logs;
    return (
      <div>
        <div style={{ overflow: "auto", height: "50vh" }}>
          <table id="table">
            <thead>
              <tr>
                <th>時間</th>
                <th>台名</th>
                <th>ボーダー</th>
                <th>回転数</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr
                  style={{
                    backgroundColor:
                      log.cnt - log.border >= 0 ? "lightcyan" : "pink",
                  }}
                  key={i}
                >
                  <td>{log.date}</td>
                  <td>{log.name}</td>
                  <td>{log.border}</td>
                  <td>{log.cnt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
