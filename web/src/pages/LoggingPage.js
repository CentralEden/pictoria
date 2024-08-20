import React, { useState } from "react";
import { RegisterLog } from "../organisms/RegisterLog";
import { LogTable } from "../organisms/LogTable";

function LoggingPage() {
  const [logs, setLogs] = useState([]);

  const registerLog = (log) => {
    setLogs(prevLogs => [...prevLogs, log]);
    console.log(logs);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1 }}> {/* 残りの領域をLogTableに使う */}
        <LogTable logs={logs} />
      </div>
      <div style={{ width: '100%' }}> {/* RegisterLogのサイズを子要素に合わせて固定 */}
        <RegisterLog onRegisterLog={registerLog} />
      </div>
    </div>
  );
}

export default LoggingPage;

