import axios from "axios";
import { machinesUrl } from "./endpoint";
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Content-Type"] = "application/json;charset=utf-8";
export class Machines {
  static getMachines(rolloutDateBefore) {
    return axios.get(machinesUrl, {
      params: {
        rolloutDateBefore,
      },
    });
  }
}
