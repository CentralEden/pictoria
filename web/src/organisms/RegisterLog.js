import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { NumberField } from "../molecules/NumberField";
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
        if (typeof e.target.value === "undefined") {
          // 機種の×押下時
          input[key] = "";
        } else {
          // 機種選択時
          let name = e.target.innerText;
          input[key] = name;
          let machineInfo = this.state.machines.find(
            (machine) => machine.name === name
          );
          if (machineInfo) {
            input["border"] = machineInfo.border;
          }
        }
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
              <NumberField
                label="ボーダー"
                value={this.state.border}
                onChange={(e) => this.handleInputChange("border", e)}
              ></NumberField>
            </div>
            <div>
              <NumberField
                label="開始回転数"
                value={this.state.start}
                onChange={(e) => this.handleInputChange("start", e)}
              ></NumberField>
            </div>
            <div>
              <NumberField
                label="終了回転数"
                value={this.state.end}
                onChange={(e) => this.handleInputChange("end", e)}
              ></NumberField>
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
