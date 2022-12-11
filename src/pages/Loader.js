import React from "react";
import LoopIcon from "@mui/icons-material/Loop";
function Loader() {
  return (
    <div style={{ padding: "25% 0" }}>
      <LoopIcon
        sx={{
          width: "100%",
          fontSize: "300px",
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(360deg)",
            },
            "100%": {
              transform: "rotate(0deg)",
            },
          },
        }}
      />
    </div>
  );
}

export default Loader;
