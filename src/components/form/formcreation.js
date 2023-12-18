import React, { useState, useEffect } from "react";

const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};

function Formcreation() {
  const [formData, setFormData] = useState({
    created_by: "",
    name: "",
    description: "",
    category: "",
    status: "",
    priority: "",
    due_time: "",
    created_on: getCurrentDate(),
    updated: getCurrentDate(),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des utilisateurs", error)
      );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à l'API pour créer la tâche
    fetch("http://localhost:5555/work/setWorks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gérer la réponse de l'API si nécessaire
        console.log("Tâche créée avec succès", data);
      })
      .catch((error) =>
        console.error("Erreur lors de la création de la tâche", error)
      );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="mb-3">
        <label htmlFor="created_by">Edité par:</label>
        <select
          id="created_by"
          name="created_by"
          value={formData.created_by}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez un utilisateur
          </option>
          {users.map((user) => (
            <option key={user._id} value={user.nickname}>
              {user.nickname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="name">Nom de la tâche:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div class="mb-3">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div class="mb-3">
        <label htmlFor="category">Catégorie:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div class="mb-3">
        <label htmlFor="priority">Priorité:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez la priorité
          </option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
      </div>
      <div class="mb-3">
        <label htmlFor="status">Statut:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez le statut
          </option>
          <option value="À faire">À faire</option>
        </select>
      </div>
      <div class="mb-3">
        <label htmlFor="due_time">Date d'échéance:</label>
        <input
          type="date"
          id="due_time"
          name="due_time"
          value={formData.due_time}
          onChange={handleChange}
          required
        />
        <label htmlFor="created_on">Date de création:</label>
        <input
          type="text"
          id="created_on"
          name="created_on"
          value={formData.created_on}
          readOnly
        />

        <label htmlFor="updated">Mise à jour:</label>
        <input
          type="text"
          id="updated"
          name="updated"
          value={formData.updated}
          readOnly
        />
      </div>
      <button type="submit" class="btn btn-success">
        Validate
      </button>
      <button type="button" class="btn btn-danger">
        Cancel
      </button>
    </form>
  );
}

export default Formcreation;
