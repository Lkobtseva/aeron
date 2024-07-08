import React, { useState, useEffect } from "react";
import plane from "../../images/Plane.png";
import line from "../../images/line.png";

const Header = ({ onAddTemplateClick }) => {
  return (
    <div className="header">
      <div className="header_block">
        <p className="header_p">AeroN</p>
        <img className="header_icon" src={line} style={{    marginLeft: "20px",
    width: "30px"}}/>
        <img className="header_icon" src={plane} />
      

      </div>
      <button className="header-button" onClick={onAddTemplateClick}>
        <p className="header-button_p">Add template</p>
      </button>
    </div>
  );
};

export default Header;
