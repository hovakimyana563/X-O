import React, { Component } from 'react';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      block: new Array(9).fill(null),
      rot: 0,
      scl: 0,
      count: 0,
      x_sty: "color: deeppink; -webkit-text-stroke: 6px #faadd66f; text-shadow: 0 0 15px deeppink, 0 0 15px deeppink, 0 0 15px deeppink;",
      o_sty: "color: dodgerblue; -webkit-text-stroke: 5px #68B1F5; text-shadow: 0 0 20px dodgerblue, 0 0 20px dodgerblue, 0 0 20px dodgerblue;",
      t: 50,
      l: 50,
      w: 0,
      r_z: 0,
      opa: 0,
      win_x: 0,
      win_o: 0
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ rot: 360, scl: 1 })
    }, 1000);
  }

  program = (event) => {
    const data = event.target.getAttribute("data");

    if (this.state.block[data] !== null) {
      return;
    }

    const newBlock = [...this.state.block];
    const symbol = this.state.count % 2 === 0 ? "X" : "0";

    newBlock[data] = symbol;

    this.setState(
      {
        block: newBlock,
        count: this.state.count + 1
      },
      () => {
        this.program_winner(symbol);
      }
    );

    if (symbol === "X") {
      event.target.children[0].setAttribute("style", this.state.x_sty);
    } else {
      event.target.children[0].setAttribute("style", this.state.o_sty);
    }

    if (this.state.count === 8) {
      setTimeout(() => {
        this.setState({
          block: new Array(9).fill(null),
          count: 0
        });
      }, 500);
    }
  }


  winner_list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  program_winner = (winner) => {
    const block = this.state.block;

    for (let i = 0; i < this.winner_list.length; i++) {
      let line = this.winner_list[i];

      if (
        this.state.block[line[0]] === winner &&
        this.state.block[line[1]] === winner &&
        this.state.block[line[2]] === winner
      ) {

        setTimeout(() => {
          this.setState({ block: new Array(9).fill(null), count: 0, t: 50, l: 50 });
        }, 4000);

        setTimeout(() => {
          this.setState({ w: 0, opa: 0 });
        }, 3000);

        if (winner.includes("X")) {
          this.setState({ win_x: this.state.win_x + 1 });
        }

        else {
          this.setState({ win_o: this.state.win_o + 1 });
        }

        if (block[this.winner_list[0][0]] === winner && block[this.winner_list[0][1]] === winner && block[this.winner_list[0][2]] === winner) { this.setState({ t: 16 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[1][0]] === winner && block[this.winner_list[1][1]] === winner && block[this.winner_list[1][2]] === winner) { this.setState({ t: 50 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[2][0]] === winner && block[this.winner_list[2][1]] === winner && block[this.winner_list[2][2]] === winner) { this.setState({ t: 84 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[3][0]] === winner && block[this.winner_list[3][1]] === winner && block[this.winner_list[3][2]] === winner) { this.setState({ t: 50, l: 16, r_z: 90 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[4][0]] === winner && block[this.winner_list[4][1]] === winner && block[this.winner_list[4][2]] === winner) { this.setState({ r_z: 90 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[5][0]] === winner && block[this.winner_list[5][1]] === winner && block[this.winner_list[5][2]] === winner) { this.setState({ t: 50, l: 84, r_z: 90 }); setTimeout(() => { this.setState({ w: 100, opa: 1 }) }, 900); }
        if (block[this.winner_list[6][0]] === winner && block[this.winner_list[6][1]] === winner && block[this.winner_list[6][2]] === winner) { this.setState({ r_z: 45 }); setTimeout(() => { this.setState({ w: 130, opa: 1 }) }, 900); }
        if (block[this.winner_list[7][0]] === winner && block[this.winner_list[7][1]] === winner && block[this.winner_list[7][2]] === winner) { this.setState({ r_z: -45 }); setTimeout(() => { this.setState({ w: 130, opa: 1 }) }, 900); }


      }
    }

  }


  render() {
    return (
      <div className="game">

        <h3>{this.state.win_x} / X</h3>

        <div className="carcas" style={{ transform: `rotate3d(1,1,1, ${this.state.rot}deg) scale(${this.state.scl})` }}>
          {
            this.state.block.map((elem, index) => {
              return (
                <div className="block" data={index} onClick={this.program}>
                  <p>{elem}</p>
                </div>
              )
            })
          }

          <div className="winner" style={{ width: `${this.state.w}%`, transform: `translate(-50%, -50%) rotateZ(${this.state.r_z}deg)`, opacity: `${this.state.opa}`, top: `${this.state.t}%`, left: `${this.state.l}%` }}></div>
        </div>

        <h3>O / {this.state.win_o}</h3>

      </div>
    )
  }
}
