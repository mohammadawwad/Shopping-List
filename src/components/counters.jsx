import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const {
      onReset,
      onCreate,
      counters,
      onDelete,
      onIncrement,
      onDecrement,
      onInfo,
      onBack,
    } = this.props;
    return (
      //Renders the 3 buttons at the top
      <div>
        <div className="button" id="buttons">
          {" "}
          <button onClick={onReset} className="btn btn-primary btn-sml my-2">
            Reset
          </button>
          <button
            onClick={onCreate}
            className="btn btn-secondary btn-sml my-2 mx-2"
          >
            Create
          </button>
          <button onClick={onInfo} className="btn btn-success btn-sml my-2">
            Print
          </button>
        </div>

        <div id="back">
          {" "}
          <button onClick={onBack} className="btn btn-primary btn-sml my-2">
            Back
          </button>
          <style>
            {/**Makes the BACK button not displayed at the main page*/}
            {`
            #back{
              display: none;
            }
            `}
          </style>
        </div>

        <div id="addOns">
          {counters.map((counter) => (
            <Counter
              key={counter.id}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              counter={counter}
              text={counter.text}
              onInfo={onInfo}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Counters;
