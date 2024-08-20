import React, { useState } from "react";
import LoggingPage from "./pages/LoggingPage";

import Header from "./organisms/Header"; // Header component imported

function Router() {
  const [page, ] = useState("logging");

  const getPageComponent = () => {
    const pages = {
      logging: <LoggingPage />,
    };
    return pages[page];
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%' }}> {/* Headerのサイズを子要素に合わせて固定 */}
        <Header /> {/* Header component added */}
      </div>
      <div style={{ flex: 1 }}> {/* Header以外の範囲すべてに広がるようにスタイルを追加 */}
        {getPageComponent()}
      </div>
    </div>
  );
}

export default Router;
