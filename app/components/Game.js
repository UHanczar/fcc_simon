// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Plate from './Plate';

class Game extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      buttons: ['green', 'red', 'yellow', 'blue'], // for clicking buttons
      gameOn: false, // switch on and off game
      strictMode: false, // switch on and off strict mode
      start: false, // start game
      count: 0, // counting turns
      turns: [] // array of random turns which AI takes during the game
    };

    this.handleTurns = this.handleTurns.bind(this);
    this.switchGame = this.switchGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.turnStrictMode = this.turnStrictMode.bind(this);
  }

  state: {
    buttons: Array<string>,
    gameOn: boolean,
    strictMode: boolean,
    start: boolean,
    count: number,
    turns: Array<string>
  };

  handleTurns: Function;
  switchGame: Function;
  startGame: Function;
  turnStrictMode: Function;

  handleTurns(color: string) {
    const { gameOn, turns } = this.state;
    if (gameOn) {
      console.log(`New Turn is done ${color}`);
      const newTurns = turns.slice();
      newTurns.push(color);
      console.log(this.state.turns);
      this.setState(() => {
        return {
          turns: newTurns
        };
      });
    }
  }

  switchGame() {
    console.log('Game is switched!');
    const { gameOn } = this.state;
    const newGameOn = !gameOn;

    if (newGameOn === false) {
      this.setState({
        strictMode: false,
        start: false,
        count: 0,
        turns: []
      });
    }

    this.setState({
      gameOn: newGameOn
    });
  }

  startGame() {
    const { gameOn, start } = this.state;
    if (gameOn) {
      // console.log('Game has started!');
      this.setState({
        start: !start
      });
      // console.log(this.state.start);
    }
  }

  turnStrictMode() {
    const { gameOn, strictMode } = this.state;
    if (gameOn) {
      console.log('StrictMode is available!');
      this.setState({
        strictMode: !strictMode
      });
      console.log(this.state.strictMode);
    }
  }

  render() {
    const { buttons, gameOn, strictMode } = this.state;
    return (
      <div className='game'>
        <Plate
          buttons={buttons}
          gameOn={gameOn}
          strictMode={strictMode}
          onHandleClick={this.handleTurns}
          switchGame={this.switchGame}
          startGame={this.startGame}
          turnStrictMode={this.turnStrictMode}
        />
      </div>
    );
  }
}

export default Game;
