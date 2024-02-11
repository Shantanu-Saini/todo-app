import React, { useEffect, useState } from "react";
import github from './Components/images/github.png';
import linkedin from './Components/images/linkedin.png';
import instagram from './Components/images/instagram.png';
import gmail from './Components/images/gmail.png';

// retrieve data of list from local storage
const getLocalTaskList = () => {
  let List = localStorage.getItem("List");
  if (List) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};

const App = () => {
  const [taskList, setTaskList] = useState(getLocalTaskList);
  const [addTask, setAddTask] = useState("");

  const addTaskBtn = () => {
    if (!addTask) {
      return;
    } else {
      setTaskList([...taskList, { name: addTask, completed: false }]);
      setAddTask("");
    }
  };

  function handleDone(index) {
    setTaskList((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDelete(index) {
    const updatedList = taskList.filter((taskName, i) => {
      return i !== index;
    });
    setTaskList(updatedList);
  }

  function handleClearAll() {
    setTaskList([]);
  }

  const remainingUndoneTasks = taskList.filter((task) => !task.completed);

  //  add to local storage
  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <div className="contact">
        <a href="https://github.com/Shantanu-Saini" target="_blank"><img src={github} alt="Github" /></a>
        <a href="https://www.linkedin.com/in/shantanu-saini-525a9a27a/" target="_blank">
        <img src={linkedin} alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/whoshantanu_/?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D" target="_blank">
        <img src={instagram} alt="Instagram" />
        </a>
        <a href="mailto:shantanusaini7000@gmail.com"><img src={gmail} alt="Gmail" /></a>
      </div>
      <div className="container">
        {/* title and logo */}
        <div className="head-title">
          <img
            src="./images/tasktodoicon.png"
            alt="todo"
            style={{ height: "40px", width: "35px" }}
          />
          <h1>To-Do list</h1>
        </div>

        {/* Number of Remaining taskList and total taskList */}
        <div className="task-info">
          <h2>Total tasks : {taskList.length}</h2>
          <h2>Incomplete tasks : {remainingUndoneTasks.length}</h2>
        </div>

        {/* Taking input of task */}
        <div className="task-input">
          <input
            type="text"
            value={addTask}
            onChange={(e) => setAddTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTaskBtn(); // Call your addTaskBtn function here
              }
            }}
          />
          <button onClick={addTaskBtn}>+</button>
        </div>

        {/* List of taskList to do */}
        <h2>Task List</h2>
        <div>
          {taskList.map((taskName, i) => (
            <div className="list-card" key={i}>
              <div className="list-content">
                <span>{taskName.name}</span>
                <div className="list-btn">
                  <button className="done-btn" onClick={() => handleDone(i)}>
                    {taskName.completed ? "Undone" : "Done"}
                  </button>
                  <button className="dlt-btn" onClick={() => handleDelete(i)}>
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="done-btn"
          style={{ height: "60px", width: "160px", fontSize: "25px" }}
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default App;