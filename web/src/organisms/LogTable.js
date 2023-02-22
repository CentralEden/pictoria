import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Table from "@mui/material/Table";
import { TableVirtuoso } from "react-virtuoso";

export class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  columns = [
    {
      width: 5,
      label: "",
      dataKey: "icon",
      numeric: true,
    },
    {
      width: 30,
      label: "time",
      dataKey: "date",
      numeric: true,
    },
    {
      label: "name",
      dataKey: "name",
    },
    {
      width: 25,
      label: "border",
      dataKey: "border",
      numeric: true,
    },
    {
      width: 25,
      label: "count",
      dataKey: "cnt",
      numeric: true,
    },
  ];

  rowContent(_index, row) {
    return (
      <React.Fragment>
        {this.columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "center" : "left"}
            size="small"
            padding="none"
          >
            {column.dataKey === "icon" ? (
              row.border - row.cnt < 0 ? (
                <ThumbUpIcon fontSize="small" color="success"></ThumbUpIcon>
              ) : (
                <ThumbDownIcon fontSize="small" color="error"></ThumbDownIcon>
              )
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  fixedHeaderContent() {
    return (
      <TableRow>
        {this.columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "center" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  render() {
    // const logs = this.props.logs;
    console.log(this.props.logs);
    return (
      <Paper style={{ height: "50vh", width: "100%" }}>
        <TableVirtuoso
          data={this.props.logs}
          components={this.VirtuosoTableComponents}
          fixedHeaderContent={() => this.fixedHeaderContent()}
          itemContent={(_index, row) => this.rowContent(_index, row)}
        />
      </Paper>
      // <div>
      //   <div style={{ overflow: "auto", height: "50vh" }}>
      //     <table id="table">
      //       <thead>
      //         <tr>
      //           <th>時間</th>
      //           <th>台名</th>
      //           <th>ボーダー</th>
      //           <th>回転数</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {logs.map((log, i) => (
      //           <tr
      //             style={{
      //               backgroundColor:
      //                 log.cnt - log.border >= 0 ? "lightcyan" : "pink",
      //             }}
      //             key={i}
      //           >
      //             <td>{log.date}</td>
      //             <td>{log.name}</td>
      //             <td>{log.border}</td>
      //             <td>{log.cnt}</td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
    );
  }
}
