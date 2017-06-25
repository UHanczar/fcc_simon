// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Plate from './Plate';

class Game extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      buttons: ['green', 'red', 'yellow', 'blue'],
      gameOn: false,
      strictMode: false,
      start: false,
      count: 0,
      turns: []
    };

    this.handleTurns = this.handleTurns.bind(this);
    this.switchGame = this.switchGame.bind(this);
  }

  state: {
    buttons: Array<string>,
    gameOn: boolean,
    strictMode: false,
    start: false,
    count: number,
    turns: Array<string>
  };

  handleTurns: Function;
  switchGame: Function;

  handleTurns(color: string) {
    console.log(`New Turn is done ${color}`);
    const newTurns = this.state.turns.slice();
    newTurns.push(color);
    console.log(this.state.turns);
    this.setState(() => {
      return {
        turns: newTurns
      };
    });
  }

  switchGame() {
    console.log('Game is switched!');
    this.setState({
      gameOn: !this.state.gameOn
    });
    console.log(this.state.gameOn);
  }

  render() {
    const { buttons, gameOn } = this.state;
    return (
      <div className='game'>
        <Plate
          buttons={buttons}
          gameOn={gameOn}
          onHandleClick={this.handleTurns}
          switchGame={this.switchGame}
        />
      </div>
    );
  }
}

export default Game;
