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
        <div>
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
              {logs.map((log) => (
                <tr
                  style={{
                    backgroundColor:
                      log.cnt - log.border >= 0 ? "lightcyan" : "pink",
                  }}
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
