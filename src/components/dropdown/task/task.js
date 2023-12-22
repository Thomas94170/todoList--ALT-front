import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

      const workFinished = result.filter((work) => work.status !== "Finished");

      const tasksWithNickname = await Promise.all(
        workFinished.map(async (work) => {
          const nickname = await getNicknameById(work.created_by);
          const taskAssignedForName = await Promise.all(
            work.assigned_for.map(async (userId) => {
              return await getNicknameById(userId);
            })
          );
          console.log(`UserID: ${work.created_by}, Nickname: ${nickname}`);
          return {
            ...work,
            created_by: nickname,
            assigned_for: taskAssignedForName.join(", "),
          };
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
                  {item.status === "In progress" ? (
                    <h5 className="card-title" style={{ color: "green" }}>
                      Title: {item.name}
                    </h5>
                  ) : (
                    <h5 className="card-title" style={{ color: "red" }}>
                      Title: {item.name}
                    </h5>
                  )}
                  <p className="card-text">Assigned for: {item.assigned_for}</p>
                  <p className="card-text">Description: {item.description}</p>
                  <p className="card-text">Category: {item.category}</p>
                  <p className="card-text">State: {item.status}</p>
                  <p className="card-text">Priority: {item.priority}</p>
                  <p className="card-text">Due time: {item.due_time}</p>
                  <p className="card-text">Created on: {item.created_on}</p>
                  <p className="card-text">Update: {item.updated}</p>
                  <p className="card-text">Edited by : {item.created_by}</p>
                </div>
                <div className="card-footer">
                  <NavLink to={`/updated/${item._id}`}>Update task</NavLink>
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
