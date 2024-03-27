import "./App.css";
import data from "./Components/data.json";
import React, { useState } from "react";

function ListItem({ key, task, handleClick }) {
  return (
    <li key={key} onClick={handleClick}>
      {task}
    </li>
  );
}

function App() {
  const [listItems, setListItems] = useState(makeList());

  function makeList() {
    const list = data.map((item) => (
      <ListItem
        key={item.id}
        task={item.task}
        handleClick={(e) => toggleCompletion(e, item.id)}
      />
    ));
    return list;
  }

  function toggleCompletion(e, id) {
    e.target.classList.toggle("complete");
    data[id - 1].complete = !data[id - 1].complete;
  }

  function deleteCompleted() {
    data = data.filter((item) => item.complete === false);
    setListItems(makeList());
  }

  let [newItem, setNewItem] = useState(null);

  function handleChange(e) {
    if (e.target.value !== null) {
      setNewItem(e.target.value);
    }
  }

  function handleAdd(e) {
    e.preventDefault();
    if (newItem) {
      data = [
        ...data,
        {
          id: listItems.length + 1,
          task: newItem,
          complete: false,
        },
      ];
      setListItems(makeList());
    }
    setNewItem(null);
  }

  let display = 0;
  function togglevisiblity() {
    let div = document.getElementById("addInput");
    if (display === 1) {
      div.style.display = "flex";
      display = 0;
    } else {
      div.style.display = "none";
      display = 1;
    }
  }

  

  return (
    <div className="toDoListContainer">
      <div className="toDoHeader">
        <h2 className="toDoListTitle">ToDo List App</h2>
      </div>
      <div className="toDoList">
        <ul className="listItems">{listItems}</ul>
      </div>
      <div className="toDoFooter">
        <div className="addDeleteButtons">
          <button className="deleteButton" onClick={deleteCompleted}>
            Delete Completed
          </button>
          <button className="addButton" onClick={togglevisiblity}>
            Add New Task
          </button>
        </div>
        <div className="addInput" id="addInput">
          <form className="addNewForm">
            <input
              type="text"
              className="newTaskInput"
              placeholder="Add a new task"
              onChange={(e) => handleChange(e)}
            />
            <button className="newTaskAddButton" onClick={(e) => handleAdd(e)}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
