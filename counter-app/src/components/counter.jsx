import React, { Component } from "react";
import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevSate) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevSate);
    if (prevProps.counter.value !== this.props.counter.value) {
      console.log(
        "there was an error, the previouse prop is !== to the current prop value"
      );
    }
  }

  componentWillUnmount() {
    //informs when the component will unmount
    console.log("counter - unmount");
  }

  doHandleIncrement = () => {
    //incharge of carryong out the increment action
    console.log("add");
    this.handleIncrement({ id: 1 });
  };

  doHandleDecrement = () => {
    //incharge of carryong out the decrement action
    console.log("add");
    this.doHandleDecrement({ id: 1 });
  };

  render() {
    return (
      <div>
        {/**Renders the name of the item */}
        <text class={"text-info"}>{this.props.counter.text}</text>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          //Renders the + button and calls the neccessary function to do so
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          //Renders the - button and calls the neccessary function to do so
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-warning btn-sm m-2"
        >
          -
        </button>
        <button
          //Renders the DELETE button and calls the neccessary function to do so
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    //changes the color of the quantity of the item based on if it (== 0), ( < 0), or (> 0)
    if (this.props.counter.value < 0) {
      classes += "danger";
      return classes;
    } else {
      classes += this.props.counter.value === 0 ? "warning" : "primary";
      return classes;
    }
  }

  formatCount() {
    //makes it say Zero instead of 0 for the items value
    const { value: count } = this.props.counter;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
