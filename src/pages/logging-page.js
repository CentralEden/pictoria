import React from "react";

class LoggingPage extends React.Component {
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
    return (
      <div>
        <form id="inputArea" className="area" style={{ textAlign: "left" }}>
          <div>
            <label htmlFor="modelName" width="50">
              台名:
            </label>
            <input type="text" id="modelName" name="modelName" />
          </div>
          <div>
            <label htmlFor="border">ボーダー:</label>
            <input type="number" id="border" name="border" />
          </div>
          <div>
            <label htmlFor="border">開始回転数:</label>
            <input type="number" id="startCnt" name="startCnt" />
          </div>
          <div>
            <label htmlFor="border">終了回転数:</label>
            <input type="number" id="endCnt" name="endCnt" />
          </div>
          <div style={{ textAlign: "right", margin: "0.5em" }}>
            <input
              id="registerButton"
              type="button"
              value="登録"
              onClick={this.addLogs}
            ></input>
          </div>
        </form>
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }

  formatDatetime(dt) {
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    let hms = h + ":" + m + ":" + s;
    return hms;
  }

  addLogs() {
    let tableElm = document.getElementById("table");
    console.log(this);
    const formatDatetime = (dt) => {
      let h = dt.getHours();
      let m = dt.getMinutes();
      let s = dt.getSeconds();
      if (h < 10) h = "0" + h;
      if (m < 10) m = "0" + m;
      if (s < 10) s = "0" + s;
      let hms = h + ":" + m + ":" + s;
      return hms;
    };

    let input = {
      date: formatDatetime(new Date()),
      name: document.getElementById("modelName").value,
      border: Number(document.getElementById("border").value),
      cnt:
        Number(
          document.getElementById("endCnt").value -
            document.getElementById("startCnt").value
        ) / 2,
    };
    let row = tableElm.insertRow(-1);
    row.insertCell(-1).innerHTML = input.date;
    row.insertCell(-1).innerHTML = input.name;
    row.insertCell(-1).innerHTML = input.border;
    row.insertCell(-1).innerHTML = input.cnt;
    row.style.backgroundColor =
      input.cnt - input.border >= 0 ? "lightcyan" : "pink";
    row.style.color = "dimgray";
    console.log(input);
  }
}
export default LoggingPage;
