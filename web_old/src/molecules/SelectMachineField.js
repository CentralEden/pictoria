import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LaunchIcon from "@mui/icons-material/Launch";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import { Machines } from "../api/machines";
export class SelectMachineField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
      machineInfo: { name: "", info_url: "", border: null },
    };
  }

  componentDidMount() {
    // 機種一覧取得
    const today = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
    Machines.getMachines(today)
      .then((res) => this.setState({ machines: res.data.items }))
      .catch((e) => {
        alert("データの取得に失敗しました。");
        console.log(e);
      });
  }

  handleInputChange(e) {
    let name = "";
    let input = {};
    // 入力取得
    name =
      e.target.innerText === ""
        ? e.target.value
        : typeof e.target.value === "undefined"
        ? ""
        : e.target.innerText;
    // マスタに情報から検索
    let machineInfo = this.state.machines.find(
      (machine) => machine.name === name
    );
    input["machineInfo"] =
      typeof machineInfo !== "undefined"
        ? machineInfo
        : { name: name, info_url: "", border: null };
    this.setState(input);
    this.props.onChange(input["machineInfo"]);
  }

  render() {
    return (
      <div>
        <Grid container alignItems="flex-end">
          <Grid item xs={11}>
            <Autocomplete
              freeSolo
              options={this.state.machines.map(
                (machineInfo) => machineInfo.name
              )}
              value={this.state.machineInfo.name}
              onChange={(e) => this.handleInputChange(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="機種"
                  size="small"
                  margin="dense"
                  variant="standard"
                  onChange={(e) => this.handleInputChange(e)}
                />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton target="_blank" href={this.state.machineInfo.info_url}>
              <LaunchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}
