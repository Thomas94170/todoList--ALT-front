import React from "react";
import { Link } from "react-router-dom";
import "../dropdown/dropdowns.css";

function Dropdown() {
  return (
    <>
      <div class="container mt-3">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to="/">Task list</Link>
            </li>
            <li>
              <Link to="/create">Create a task</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Dropdown;
