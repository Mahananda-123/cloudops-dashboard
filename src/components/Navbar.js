import React from "react";

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #334155",
      }}
    >
      <h2>CloudOps Platform</h2>

      <div>
        <span style={{ marginRight: "20px" }}>Monitoring Active</span>
        <span>Admin</span>
      </div>
    </div>
  );
}

export default Navbar;