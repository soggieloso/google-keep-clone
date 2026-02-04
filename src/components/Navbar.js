import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="logo-area">
        {/* Make sure this entire div is hoverable */}
        <div className="tooltip">
          <span className="material-symbols-outlined">menu</span>
          <span className="tooltip-text">Main Menu</span>
        </div>
        <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="Google Keep logo"
          style={{ width: "40px", height: "40px" }}
        />
        <span className="logo-text">Keep</span>
      </div>

      <div className="search-area">
        <div className="tooltip">
          <span className="material-symbols-outlined">search</span>
          <span className="tooltip-text">Search</span>
        </div>
        <input type="text" placeholder="Search" />
      </div>

      <div className="settings-area">
        <div className="tooltip">
          <span className="material-symbols-outlined">refresh</span>
          <span className="tooltip-text">Refresh</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined">view_agenda</span>
          <span className="tooltip-text">View List</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined">settings</span>
          <span className="tooltip-text">Settings</span>
        </div>
      </div>

      <div className="profile-actions-area">
        <div className="tooltip">
          <span className="material-symbols-outlined">apps</span>
          <span className="tooltip-text">Apps</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="tooltip-text">Accounts</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
