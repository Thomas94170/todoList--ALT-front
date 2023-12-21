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
    status: "Waiting",
    priority: "Medium",
    due_time: "",
    created_on: getCurrentDate(),
    updated: getCurrentDate(),
    assigned_by: "",
  });

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;

    if (selectedUsers.includes(value)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== value));
    } else {
      setSelectedUsers([...selectedUsers, value]);
    }
  };

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

    fetch("http://localhost:5555/work/setWorks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        assigned_for: selectedUsers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tâche créée avec succès", data);
        alert("Tâche enregistrée, vous pouvez retourner à l'écran d'accueil");
      })
      .catch((error) =>
        console.error("Erreur lors de la création de la tâche" + error)
      );
  };

  const handleCancel = () => {
    setFormData({
      created_by: "",
      name: "",
      description: "",
      category: "",
      status: "Waiting",
      priority: "Medium",
      due_time: "",
      created_on: getCurrentDate(),
      updated: getCurrentDate(),
      assigned_for: "",
    });
  };

  return (
    <div className="container vh-100">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Creating a task</h2>
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-3">
              <label htmlFor="created_by">Edited by:</label>
              <select
                id="created_by"
                name="created_by"
                value={formData.created_by}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user._id} value={user.nickname}>
                    {user.nickname}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>
                Select the user(s):
                {users.map((user) => (
                  <div key={user._id}>
                    <input
                      type="checkbox"
                      id={user._id}
                      name="assigned_for"
                      value={user.nickname}
                      checked={selectedUsers.includes(user.nickname)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={user._id}>{user.nickname}</label>
                  </div>
                ))}
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="name">Task name:</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div class="mb-3">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div class="mb-3">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Waiting">Waiting</option>
                <option value="In progress">In progress</option>
                <option value="To be tested">To be tested</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="due_time">Due time:</label>
              <input
                type="date"
                className="form-control"
                id="due_time"
                name="due_time"
                value={formData.due_time}
                onChange={handleChange}
                required
              />
              <label htmlFor="created_on">Created on:</label>
              <input
                type="text"
                className="form-control"
                id="created_on"
                name="created_on"
                value={formData.created_on}
                readOnly
              />

              <label htmlFor="updated">Update:</label>
              <input
                type="text"
                className="form-control"
                id="updated"
                name="updated"
                value={formData.updated}
                readOnly
              />
            </div>
            <button type="submit" class="btn btn-success">
              Confirm
            </button>
            <button type="button" class="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formcreation;
