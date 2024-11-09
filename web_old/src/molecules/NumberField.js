import React from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
export class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
    };
  }

  handleInputChange(e) {
    let input = { val: e.target.value };
    this.setState(input);
    this.props.onChange(e);
  }

  clearInput(e) {
    e.target.value = "";
    this.handleInputChange(e);
  }

  render() {
    return (
      <div>
        <TextField
          label={this.props.label}
          size="small"
          margin="dense"
          variant="standard"
          value={this.props.value}
          type="number"
          onChange={(e) => this.handleInputChange(e)}
        ></TextField>
        <IconButton
          aria-label="clear"
          size="small"
          style={{ display: "inline-block", verticalAlign: "bottom" }}
          onClick={(e) => this.clearInput(e)}
        >
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
}
