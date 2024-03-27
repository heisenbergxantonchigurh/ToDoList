import "./App.css";
import data from "./data.json";
import { useState } from "react";

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
    data = [...data, {
      "id": listItems.length + 1,
      "task" : newItem,
      complete: false,
    }]
    setListItems(makeList());
  }

  const [updatedValue, setUpdatedValue] = useState(null)
  function handleUpdateValue(e){
    if(e.target.value !== null) setUpdatedValue(e.target.value);
  }

  const [updateId, setUpdateId] = useState(null)
  function handleUpdateId(e){
    if(e.target.value !== null) {
      if(e.target.value !== 0) {
        setUpdateId(e.target.value);
      }
      else setUpdateId(null)
    }
    
  }

  function handleUpdate(e){
    e.preventDefault();
    if(updateId !== null){
      data[updateId - 1].task = updatedValue;
    }
    else{
      alert("Please enter ID");
      return;
    }
    setListItems(makeList());
  }

  return (
    <div className="App">
      <div className="heading">
        <h2 className="title heading">ToDo List App</h2>
      </div>
      <div className="list">
        <ol className="listItems">{listItems}</ol>
      </div>
      <div className="footer">
        <button className="deleteButton" onClick={deleteCompleted}>
          Delete
        </button>
        <form className="addNewForm">
          <input
            className="addInput"
            placeholder="Add New Task"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" onClick={(e) => handleAdd(e)} >
            Add
          </button>
        </form>
        <form className="changeForm">
          <input
            id="changeId"
            placeholder="Id of the element"
            onChange={(e) => handleUpdateId(e)}
          />
          <input
            className="updateValue"
            placeholder="Updated Task"
            onChange={(e) => handleUpdateValue(e)}
          />
          <button type="submit" onClick={(e) => handleUpdate(e)} >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}




export default App;