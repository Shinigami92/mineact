import React from "react";
import "./App.css";
import { BoardModel } from "./shared/BoardModel";

class App extends React.Component<{}, { board: BoardModel }> {
  constructor(props: any) {
    super(props);
    this.state = { board: new BoardModel() };
    this.state.board.generate();

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => {
      state.board.generate();
      return state;
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Generate</button>
        <table>
          <tbody>
            {this.state.board.grid.map((x, ix) => (
              <tr key={`x-${ix}`}>
                {x.map((y, iy) => (
                  <td key={`y-${iy}`}>{y}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
