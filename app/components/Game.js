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
      player: true, // if false AI turn, else player
      count: 0, // counting turns
      turns: [], // array of random turns which AI takes during the game
      playerCount: 0,
      currentButton: undefined
    };

    this.handleTurns = this.handleTurns.bind(this);
    this.switchGame = this.switchGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.turnStrictMode = this.turnStrictMode.bind(this);
    this.randomAITurns = this.randomAITurns.bind(this);
    this.mapTurns = this.mapTurns.bind(this);
  }

  state: {
    buttons: Array<string>,
    gameOn: boolean,
    strictMode: boolean,
    start: boolean,
    player: boolean,
    count: number,
    playerCount: number,
    turns: Array<string>
  };

  componentDidUpdate(prevProp, prevState) {
    const { player, gameOn, start, count } = this.state;
    if (player !== prevState.player && gameOn && start) {
        if (player === false) {
          this.randomAITurns();
          // console.log('Turn is done!!!');
        } else {
          console.log('Timer is cleared!!!');
          // clearTimeout(this.turn);
          // clearInterval(this.makeTurns);
        }
    }
  }


  handleTurns: Function;
  switchGame: Function;
  startGame: Function;
  turnStrictMode: Function;
  randomAITurns: Function;
  mapTurns: Function;

  // handleTurns(color: string) {
  //   const { gameOn, turns, buttons } = this.state;
  //   if (gameOn) {
  //     console.log(`New Turn is done ${color}`);
  //     const newTurns = turns.slice();
  //     newTurns.push(color);
  //     console.log(this.state.turns);
  //     this.setState(() => {
  //       return {
  //         turns: newTurns
  //       };
  //     });
  //   }
  // }

  handleTurns(color: string) {
    const { gameOn, turns, buttons, count, player, playerCount } = this.state;
    // bacause every time on click we create counter === 0;
    if (gameOn && player) {
      const newTurns = turns.slice();
      let counter = playerCount;

      if (color !== turns[counter]) {
        console.log('Damn!!!!!');
        this.repeateMapTurns(newTurns, 0);
      }

      counter++;
      this.setState({
        playerCount: counter,
      });
      console.log('upper counter', counter);
      if (counter === turns.length) {
        console.log(counter);
        this.setState({
          player: !this.state.player,
          playerCount: 0
        });
        // counter = 0;
      }





      // if (color !== turns[counter]) {
      //   console.log('Damn!!!!!');
      // }
      //
      // console.log(newTurns[counter]);
      //
      // counter += 1;
      // console.log(counter, newTurns.length);
      //
      // if (counter === newTurns.length) {
      //   const newPlayer = !player;
      //   this.setState({
      //     player: newPlayer
      //   });
      //
      //   counter = 0;
      //   // console.log(counter);
      // }
    }
  }

  mapTurns(turns: Array<string>, index: number) {
    const { player } = this.state;
    this.makeTurns = setInterval(() => {

      if (index < turns.length) {
        console.log('turn', turns[index]);
        const currentButton = turns[index];
        this.setState({
          currentButton: currentButton
        });
        index += 1;
        setTimeout(() => this.setState({currentButton: undefined}), 1000);
      }
    }, 1500);

    this.clearTurns = setTimeout(() => {
      this.setState({
        currentButton: undefined,
        player: !this.state.player
      });
    }, (turns.length * 1500) + 1000);
  }

  repeateMapTurns(turns: Array<string>, index: number) {
    this.makeTurns = setInterval(() => {

      if (index < turns.length) {
        console.log('turn', turns[index]);
        const currentButton = turns[index];
        this.setState({
          currentButton: currentButton
        });
        index += 1;
        setTimeout(() => this.setState({currentButton: undefined}), 1000);
      }
    }, 1500);

    this.clearTurns = setTimeout(() => {
      this.setState({
        currentButton: undefined
      });
    }, (turns.length * 1500) + 1000);
  }

  randomAITurns() {
    const { start } = this.state;
    const interval = this.state.count > 10 ? 1500 : 3000;
    if (start) {
      // this.turn = setTimeout(() => {
      const { turns, buttons, player, count } = this.state;
      const newCount = count + 1;
      this.setState({
        count: newCount
      });
      const randomColorIndex = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      const newColor = buttons[randomColorIndex];
      const newTurns = turns.slice();
      // console.log(randomColorIndex, newColor);

      newTurns.push(newColor);
      console.log('newTurns: ', newTurns);

      this.mapTurns(newTurns, 0);

      const newPlayer = !player;

      this.setState(() => {
        return {
          turns: newTurns,
          // player: newPlayer
        };
      });
      // }, interval);
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
        player: true,
        count: 0,
        turns: [],
        playerCount: 0
      });

      clearInterval(this.makeTurns);
      clearTimeout(this.clearTurns);
    }

    this.setState({
      gameOn: newGameOn
    });
  }

  startGame() {
    const { gameOn, start, player } = this.state;
    if (gameOn) {
      // console.log('Game has started!');
      const newStart = !start;
      const newPlayer = !player;
      if (newStart === true) {
        this.setState({
          start: newStart,
          player: newPlayer
        });
      } else {
        this.setState({
          start: false,
          strictMode: false,
          player: true,
          count: 0,
          turns: [],
          playerCount: 0
        });
        console.log('Start is false');
        clearInterval(this.makeTurns);
        clearTimeout(this.clearTurns);
      }
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
    const { buttons, gameOn, strictMode, count, currentButton } = this.state;
    return (
      <div className='game'>
        <Plate
          buttons={buttons}
          gameOn={gameOn}
          strictMode={strictMode}
          count={count}
          onHandleClick={this.handleTurns}
          switchGame={this.switchGame}
          startGame={this.startGame}
          turnStrictMode={this.turnStrictMode}
          currentButton={currentButton}
        />
      </div>
    );
  }
}

export default Game;
