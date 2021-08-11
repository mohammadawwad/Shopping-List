import React, { Component } from "react";
import NavBar from "./components/navbar";
import PriceBar from "./components/pricebar";
import "./App.css";
import Counters from "./components/counters";
import data from "./shoppingData.json";
//test
//blah
//pls work 

console.log(data.name + "," + data.price);

class App extends Component {

  state = {
    counters: [
      //example of objects in array
      /*{ id: 1, value: 2, text: "apples" },*/
    ],
  };

  constructor(props) {
    super(props);
    console.log("app- constructor");
  }

  componentDidMount() {
    //notofies when the the app is mounted
    console.log("app- mouneted");
  }

  handleIncrement = (counter) => {
    //increments the value of the specific item when the + button is clicked
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    //decrements the value of the specific item when the - button is clicked
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    //called when reset button is clicked
    //resets all the values of the items
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      //clears the chart
      this.clearInfo();
      return c;
    });
    this.setState({ counters });
    
  };

  handleName = () => {
    //askes for the name of the item that you will add to your list
    var name = prompt("Item name:");
    return name;
  };

  handleCreate = () => {
    //creates a new object in the array with default values
    const create = this.state.counters.length + 1;
    const counter = this.state.counters.push({
      id: create,
      value: 0,
      text: this.handleName(),
    });
    this.setState({ counter });
  };

  handleDelete = (counterId) => {
    //deletes an item
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleInfo = () => {
    //hides the other buttons
    this.hideButtons(1);
    //Show The back buttons that will remove the table and bring the other elements back
    this.visibleBack(1);

    //removes all data from chart to prevent duplicates when u click print
    this.clearInfo();

    let x;
    for (x = 0; x <= this.state.counters.length; x++) {
      //breaks loop if x is == to counters array
      if (this.state.counters.length == x) {
        break;
      }
      const info = this.state.counters[x]["text"];
      const quantity = this.state.counters[x]["value"];
      console.log(info, quantity);

      //creates rows based on input
      var table = document.getElementById("myList");
      var row = table.insertRow(1);

      if (quantity == 1) {
        var itemCell = row.insertCell(0);
        itemCell.setAttribute("colspan", "2");
        itemCell.innerHTML = info;
      } else if (quantity > 1) {
        var itemCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        itemCell.innerHTML = info;
        quantityCell.innerHTML = quantity;
      } else {
        console.log("Item quantitiy is not == or more than 1");
      }
    }
    //calls the print function
    setTimeout(2000);
    return window.print();
  };

  clearInfo = () => {
    //clears all info from the chart
    let x;
    var table = document.getElementById("myList");
    for (x = table.rows.length; x > 1; x--) {
      //creates deletes all data in the chart
      table.deleteRow(1);
    }
  };

  hideButtons = (style) => {
    //removes the buttons and add ons to only display the table
    //that contains data
    let removeButtons = document.getElementById("buttons");
    let removeAddOns = document.getElementById("addOns");

    if (style == 1) {
      removeButtons.style.display = "none";
      removeAddOns.style.display = "none";
    } else if (style == 2) {
      removeButtons.style.display = "block";
      removeAddOns.style.display = "block";
    }
  };

  visibleBack = (style) => {
    //Back Button to remove table and show other elements
    let back = document.getElementById("back");
    let hideTable = document.getElementById("myList");

    if (style == 1) {
      back.style.display = "block";
      hideTable.style.display = "block";
    } else if (style == 2) {
      back.style.display = "none";
      hideTable.style.display = "none";
    }
  };

  handleBack = () => {
    this.hideButtons(2);
    this.visibleBack(2);
  };

  getPrice = () => {
    let price = data.price;
      return price;
  }

  render() {
    console.log("rendered");

    return (
      <React.Fragment>
        {/*Renders Title*/}
        <h3>Easy Shopping</h3>

        {/*Renders the navigation bar */}
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <PriceBar
          price={this.getPrice()}
        />
        <main className="container">
          {/**simplifies how to call the functions */}
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onCreate={this.handleCreate}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onInfo={this.handleInfo}
            onBack={this.handleBack}
          />
        </main>

        {/**Renders the table where data will be placed into */}
        <div className="mx-auto">
          <table id="myList">
            <tr>
              <th id="thTitle">Items</th>
              <th id="thQuantity">Quantity</th>
            </tr>
          </table>
        </div>

        <textarea id="notes">Add Notes Here...</textarea>

        <style>
          {/**CSS styling for the table */}
          {`

          h3{
            margin: 0px;
            padding: 0px;
            padding-bottom: 2px;
            text-align: center;
            background-color: #F8F9FA;
          }  

          main.container{
            margin: 0px;
            margin-left: 5px;
            padding: 0px;
          }

          #myList{
            position: relative;  
            display: none;
            margin: 5px;
          }

          th{
            border: 2px solid black;
            padding: 2px;
            min-width: 100px;
            font-size: 28px;
            font-style: bold;
          }
          
          td{
            border: 2px solid black;
            padding: 2px;
            font-size: 24px;
          }

          #noValue{
            border: 2px solid black;
            padding: 2px;
            font-size: 24px;
          }


          textarea {
            display: block;
            margin: 10px;
            height: 300px;
            width: 300px;
            color: black;
          }

          #notes{
            color: black;
            background-color: #F8F9FA;
            margin-top: 15px;
            margin: 5px;
          }

          #price{
            margin-left: 16px;
          }
          a.navbar-brand{
            color: rgba(0, 0, 0, 0.9);
          }
        
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default App;
