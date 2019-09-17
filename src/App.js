import React, { Component } from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: uuid(),
      item: "",
      editItem: false
    };
  }

  handleChange = e => {
    this.setState({ item: e.target.value });
  };

  clearList = () => {
    this.setState({ items: [] });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    const updatedItems = [...this.state.items, newItem];
    this.setState(
      { items: updatedItems, item: "", id: uuid(), editItem: false },
      () => {
        console.log(this.state.items);
      }
    );
  };

  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id;
    });

    this.setState({ items: filteredItems });
  };

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => {
      return item.id !== id;
    });

    const selectedItems = this.state.items.find(item => {
      return item.id === id;
    });

    this.setState({
      items: filteredItems,
      item: selectedItems.title,
      editItem: true,
      id: id // this is because whenever this add again after editing same id will use to set in submit method
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">Todo Input</h3>
            <ToDoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <ToDoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
