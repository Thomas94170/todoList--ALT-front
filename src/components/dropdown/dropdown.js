import React from "react";
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
              <a class="dropdown-item" href="#">
                Liste des tâches
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Création d'une tâche
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Modification d'une tâche
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Dropdown;
