import React, { useEffect, useState } from "react";

function Task() {
  const [data, setData] = useState([]);

  const getNicknameById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5555/user/${userId}`);
      const result = await response.json();
      return result.nickname;
    } catch (error) {
      console.error("Erreur lors de la récupération du nickname " + error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5555/work");
      const result = await response.json();

      const tasksWithNickname = await Promise.all(
        result.map(async (work) => {
          const nickname = await getNicknameById(work.created_by);
          console.log(`UserID: ${work.created_by}, Nickname: ${nickname}`);
          return { ...work, created_by: nickname };
        })
      );

      setData(tasksWithNickname);
    } catch (error) {
      console.error("Erreur lors de la récupération " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-3">
          {data.map((item, index) => (
            <div className="col mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Titre: {item.name}</h5>
                  <p className="card-text">Description: {item.description}</p>
                  <p className="card-text">Catégorie: {item.category}</p>
                  <p className="card-text">État: {item.status}</p>
                  <p className="card-text">Priorité: {item.priority}</p>
                  <p className="card-text">Date d'échéance: {item.due_time}</p>
                  <p className="card-text">
                    Date de création: {item.created_on}
                  </p>
                  <p className="card-text">Mise à jour: {item.updated}</p>
                  <p className="card-text">
                    Fiche éditée par : {item.created_by}
                  </p>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">
                    Mettre à jour
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Task;
