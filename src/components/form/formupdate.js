import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

function Formupdate() {
  const { _id } = useParams();
  const [taskUpdate, setTaskUpdate] = useState({
    created_by: "",
    name: "",
    description: "",
    category: "",
    status: "",
    priority: "",
    due_time: "",
    created_on: "",
    updated: getCurrentDate(),
    assigned_for: [],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("function useEffect lancée");
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5555/work/${_id}`);
        const result = await response.json();
        setTaskUpdate(result);
        console.log("requete effectuée recup des données");
        console.log(result);

        const userNickname = await fetch(
          `http://localhost:5555/user/${result.created_by}`
        );
        const userResult = await userNickname.json();
        console.log(userResult);
        setTaskUpdate((prevTaskUpdate) => ({
          ...prevTaskUpdate,
          created_by: userResult.nickname,
        }));
        console.log(userResult.nickname);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de la tâche",
          error
        );
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5555/user");
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchTask();
    fetchUsers();
  }, [_id]);

  const handleChange = (e) => {
    setTaskUpdate({
      ...taskUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (userId) => {
    const isChecked = taskUpdate.assigned_for.includes(userId);

    if (isChecked) {
      // Si l'utilisateur est déjà coché, le retirez de la liste
      setTaskUpdate((prevTaskUpdate) => ({
        ...prevTaskUpdate,
        assigned_for: prevTaskUpdate.assigned_for.filter((id) => id !== userId),
      }));
    } else {
      // Sinon, l'ajoutez à la liste
      setTaskUpdate((prevTaskUpdate) => ({
        ...prevTaskUpdate,
        assigned_for: [...prevTaskUpdate.assigned_for, userId],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5555/work/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskUpdate.name,
        description: taskUpdate.description,
        category: taskUpdate.category,
        status: taskUpdate.status,
        priority: taskUpdate.priority,
        due_time: taskUpdate.due_time,
        updated: getCurrentDate(),
        assigned_for: taskUpdate.assigned_for,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tâche mise à jour avec succès", data);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de la tâche", error)
      );
  };

  return (
    <>
      <div className="container mt-3">
        <h2>Modifier la tâche</h2>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-3">
            <label htmlFor="created_by">Edité par:</label>
            <input
              type="text"
              id="created_by"
              name="created_by"
              value={taskUpdate.created_by}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label>
              Sélectionnez les utilisateurs :
              {users.map((user) => (
                <div key={user._id}>
                  <input
                    type="checkbox"
                    id={user._id}
                    name="assigned_for"
                    value={user._id}
                    checked={taskUpdate.assigned_for.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                  <label htmlFor={user._id}>{user.nickname}</label>
                </div>
              ))}
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Nom de la tâche:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={taskUpdate.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={taskUpdate.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category">Catégorie:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={taskUpdate.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority">Priorité:</label>
            <select
              id="priority"
              name="priority"
              value={taskUpdate.priority}
              onChange={handleChange}
              required
            >
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status">Statut:</label>
            <select
              id="status"
              name="status"
              value={taskUpdate.status}
              onChange={handleChange}
              required
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="due_time">Date d'échéance:</label>
            <input
              type="date"
              id="due_time"
              name="due_time"
              value={taskUpdate.due_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="created_on">Date de création:</label>
            <input
              type="text"
              id="created_on"
              value={taskUpdate.created_on}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="updated">Mise à jour:</label>
            <input
              type="text"
              id="updated"
              name="updated"
              value={taskUpdate.updated}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-success">
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </>
  );
}
export default Formupdate;
