import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Machines } from "../api/machines";
export class RegisterLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      border: "",
      start: "",
      end: "",
      machines: [],
    };
  }

  componentDidMount() {
    Machines.getMachines()
      .then((res) => this.setState({ machines: res.data.items }))
      .catch((e) => {
        alert("データの取得に失敗しました。");
        console.log(e);
      });
  }

  handleInputChange(key, e) {
    let input = {};
    if (key !== "name") {
      input[key] = e.target.value;
    } else {
      if (e.target.innerText !== "") {
        let name = e.target.innerText;
        input[key] = name;
        let machineInfo = this.state.machines.find(
          (machine) => machine.name === name
        );
        console.log(machineInfo);
        input["border"] = machineInfo.border;
      } else {
        input[key] = e.target.value;
      }
    }
    this.setState(input);
  }

  render() {
    return (
      <div>
        <Card>
          <form id="inputArea" className="area" style={{ textAlign: "left" }}>
            <div>
              <Autocomplete
                freeSolo
                options={this.state.machines.map(
                  (machineInfo) => machineInfo.name
                )}
                value={this.state.name}
                onChange={(e) => this.handleInputChange("name", e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="機種"
                    size="small"
                    margin="dense"
                    variant="standard"
                    onChange={(e) => this.handleInputChange("name", e)}
                  />
                )}
              />

              <TextField
                label="ボーダー"
                size="small"
                margin="dense"
                variant="standard"
                value={this.state.border}
                type="number"
                onChange={(e) => this.handleInputChange("border", e)}
              ></TextField>
            </div>
            <div>
              <TextField
                label="開始回転数"
                size="small"
                margin="dense"
                variant="standard"
                value={this.state.start}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => this.handleInputChange("start", e)}
              ></TextField>
            </div>
            <div>
              <TextField
                label="終了回転数"
                size="small"
                margin="dense"
                variant="standard"
                value={this.state.end}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => this.handleInputChange("end", e)}
              ></TextField>
            </div>
            <div style={{ textAlign: "right", margin: "0.5em" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => this.props.onRegisterLog(this.getInputParams())}
              >
                登録
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  getInputParams() {
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
      name: this.state.name,
      border: Number(this.state.border),
      cnt: Number(this.state.end - this.state.start) / 2,
    };
    this.setState({ start: this.state.end });
    return input;
  }

  searchModels() {
    console.log(Machines);
  }
}
