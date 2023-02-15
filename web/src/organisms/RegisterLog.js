import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { NumberField } from "../molecules/NumberField";
import { SelectMachineField } from "../molecules/SelectMachineField";

export class RegisterLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      border: "",
      start: "",
      end: "",
      machines: [],
      isOpenWebDialog: false,
    };
  }

  handleInputChange(key, e) {
    let input = {};
    input[key] = e.target.value;
    this.setState(input);
  }

  handleMachineChange(machineInfo) {
    let input = {};
    if (machineInfo.border) {
      input["border"] = machineInfo.border;
    }
    this.setState(input);
  }

  render() {
    return (
      <div>
        <Card>
          <form id="inputArea" className="area" style={{ textAlign: "left" }}>
            <SelectMachineField
              onChange={(machineInfo) => this.handleMachineChange(machineInfo)}
            ></SelectMachineField>
            <NumberField
              label="ボーダー"
              value={this.state.border}
              onChange={(e) => this.handleInputChange("border", e)}
            ></NumberField>
            <NumberField
              label="開始回転数"
              value={this.state.start}
              onChange={(e) => this.handleInputChange("start", e)}
            ></NumberField>
            <NumberField
              label="終了回転数"
              value={this.state.end}
              onChange={(e) => this.handleInputChange("end", e)}
            ></NumberField>
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
}
