import React, { useState, useRef } from "react";
import "./Main.css";

function Main() {
  const [inputValue, setInputValue] = useState([]);
  const [editInputValue, setEditInputValue] = useState("");
  const inputTag = useRef();

  function handleAddNewList() {
    const newInputValue = inputTag.current.value;
    setInputValue([...inputValue, { value: newInputValue, isChecked: false }]);
    inputTag.current.value = ""; // clear input field
  }

  function handleCheckBoxChecked(index) {
    const newInputValue = [...inputValue];
    newInputValue[index].isChecked = !newInputValue[index].isChecked;
    setInputValue(newInputValue);
  }

  function handleEditText(index) {
    const newInputValue = [...inputValue];
    newInputValue[index].isEditing = true;
    setInputValue(newInputValue);
    setEditInputValue(newInputValue[index].value);
  }

  function handleSaveText(event, index, newText) {
    event.preventDefault();
    const newInputValue = [...inputValue];
    newInputValue[index].value = newText;
    newInputValue[index].isEditing = false;
    setInputValue(newInputValue);
    setEditInputValue("");
  }

  function handleEditInputChange(event) {
    setEditInputValue(event.target.value);
  }

  function handleRemoveList(index) {
    setInputValue((prevState) => {
      const newList = [...prevState];
      newList.splice(index, 1);
      return newList;
    });
  }

  return (
    <>
      <div
        className="page-content page-container container mt-5"
        id="page-content"
      >
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Awesome Todo list</h4>
                  <div className="add-items d-flex">
                    <input
                      type="text"
                      className="form-control todo-list-input"
                      placeholder="What needs to be done today?"
                      ref={inputTag}
                    />
                    <button
                      className="add btn btn-primary font-weight-bold todo-list-add-btn"
                      onClick={handleAddNewList}
                    >
                      Add
                    </button>
                  </div>
                  <div className="list-wrapper">
                    <ul className="d-flex flex-column todo-list">
                      {inputValue.map((item, index) => {
                        const labelStyles = item.isChecked
                          ? { textDecoration: "line-through" }
                          : {};
                        return (
                          <React.Fragment key={index}>
                            <li key={index}>
                              <div className="form-check">
                                {item.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control todo-list-input"
                                    value={editInputValue}
                                    onChange={handleEditInputChange}
                                  />
                                ) : (
                                  <label
                                    className="form-check-label"
                                    style={labelStyles}
                                  >
                                    <input
                                      className="checkbox"
                                      type="checkbox"
                                      onChange={() =>
                                        handleCheckBoxChecked(index)
                                      }
                                      checked={item.isChecked}
                                    />
                                    {item.value}
                                    <i className="input-helper"></i>
                                  </label>
                                )}
                              </div>
                              <span className="ms-auto">
                                {item.isEditing ? (
                                  <i
                                    className="fa-solid fa-check-square edit pe-5"
                                    style={{ color: "#405189" }}
                                    onClick={(event) =>
                                      handleSaveText(
                                        event,
                                        index,
                                        editInputValue
                                      )
                                    }
                                  ></i>
                                ) : (
                                  <i
                                    className="fa-solid fa-pen-to-square edit pe-5"
                                    style={{ color: "#405189" }}
                                    onClick={() => handleEditText(index)}
                                  ></i>
                                )}
                                <i
                                  className="mdi mdi-close-circle-outline remove"
                                  onClick={() => handleRemoveList(index)}
                                ></i>
                              </span>
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
