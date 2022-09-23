import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/fonts.css";
import background from "../../assets/img/noiraude.png";

const Header = () => {
  return (
    <header>
      <div className="d-flex flex-column flex-md-row p-3 border-bottom bg-dark text-white">
        <h2 className="me-auto mb-auto">
          <img
            className="me-2"
            src={background}
            alt="background"
            style={{ height: "40px" }}
          />

          <a
            href="/ghibli"
            className="text-decoration-none text-white align-bottom"
          >
            Ghiblist
          </a>
        </h2>

        <nav className="mt-2">
          <Link to="/mylists" className="modalBtnIco me-3">
            My lists
          </Link>
          <Link to="/search" className="modalBtnIco me-4">
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
