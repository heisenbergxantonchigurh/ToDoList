import "./App.css";
import { useState } from "react";
import data from "./Components/data.json";

function ListItem({ id, task, complete, handleClick }) {
  return (
    <li className="listItem" id={id} onClick={handleClick}>
      {task}
    </li>
  );
}

function App() {
  const [listItems, setListItems] = useState(
    data.map((item) => (
      <ListItem
        key={item.id}
        task={item.task}
        handleClick={(e) => itemClicked(e, item.id)}
      />
    ))
  );
  function itemClicked(e, id) {
    e.target.classList.toggle("completed");
    data[id - 1].complete = !data[id - 1].complete;
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

  const [newItem, setNewItem] = useState(null);
  const handleChange = (event) => {
    let temp = event.target.value;
    setNewItem(temp);
  };

  const addNewItem = (e) => {
    e.preventDefault();
    if (newItem !== null) {
      setListItems([
        ...listItems,
        <ListItem
          key={listItems.length}
          task={newItem}
          handleClick={(e) => itemClicked(e)}
        />,
      ]);
      setNewItem(null);
    }
  };
  const deleteCompleted = () => {
    let temp = data.filter((item) => item.complete === false);
    setListItems(
      temp.map((item) => (
        <ListItem
          key={item.id}
          task={item.task}
          handleClick={(e) => itemClicked(e, item.id)}
        />
      ))
    );
  };

  return (
    <div className="toDoListContainer">
      <div className="toDoHeader">
        <h2 className="toDoListTitle">Simple ToDo List App</h2>
      </div>
      <div className="toDoList">{listItems}</div>
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
            <button className="newTaskAddButton" onClick={(e) => addNewItem(e)}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
