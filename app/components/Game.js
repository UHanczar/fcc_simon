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
      playerCount: 0, // number of players' turns
      currentButton: undefined,
      error: false,
      winner: false,
      preventTurn: false
    };

    this.handleTurns = this.handleTurns.bind(this);
    this.switchGame = this.switchGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.turnStrictMode = this.turnStrictMode.bind(this);
    this.randomAITurns = this.randomAITurns.bind(this);
    this.mapTurns = this.mapTurns.bind(this);
    this.repeateMapTurns = this.repeateMapTurns.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.addSound = this.addSound.bind(this);
  }

  state: {
    buttons: Array<string>,
    gameOn: boolean,
    strictMode: boolean,
    start: boolean,
    player: boolean,
    count: number,
    playerCount: number,
    turns: Array<string>,
    error: boolean,
    winner: boolean,
    preventTurn: boolean,
    currentButton: undefined | boolean
  };

  componentDidUpdate(prevProp, prevState) {
    const { player, gameOn, start, count, turns, playerCount } = this.state;
    if (player !== prevState.player && gameOn && start) {
        if (player === false) {
          this.randomAITurns();
          // console.log('Turn is done!!!');
        } else {
          // console.log('Timer is cleared!!!');
        }
    }
  }

  handleTurns: Function;
  switchGame: Function;
  startGame: Function;
  turnStrictMode: Function;
  randomAITurns: Function;
  mapTurns: Function;
  repeateMapTurns: Function;
  removeColor: Function;
  addSound: Function;

  removeColor() {
    this.setState({
      currentButton: undefined
    });
  }

  addSound(color: string) {
    switch (color) {
      case 'yellow':
        return 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
      case 'red':
        return 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
      case 'green':
        return 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
      case 'blue':
        return 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
      // no default
    }
  }

  mapTurns(turns: Array<string>, index: number) {
    const { player } = this.state;
    this.makeTurns = setInterval(() => {
      if (index < turns.length) {
        // console.log('turn', turns[index]);
        const currentButton = turns[index];
        const audio = new Audio(this.addSound(currentButton));
        audio.play();
        this.setState({
          currentButton: currentButton
        });
        index += 1;
        setTimeout(() => this.setState({ currentButton: undefined }), 1000);
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
    this.makeRepeatTurns = setInterval(() => {

      if (index < turns.length) {
        // console.log('turn', turns[index]);
        const currentButton = turns[index];
        const audio = new Audio(this.addSound(currentButton));
        audio.play();
        this.setState({
          currentButton: currentButton
        });
        index += 1;
        setTimeout(() => this.setState({ currentButton: undefined }), 1000);
      }
    }, 1500);

    this.clearTurns = setTimeout(() => {
      this.setState({
        currentButton: undefined,
        preventTurn: false
      });
    }, (turns.length * 1500) + 1000);
  }

  randomAITurns() {
    const { start, winner } = this.state;
    const interval = this.state.count > 10 ? 1500 : 3000;
    if (start && !winner) {
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
      // console.log('newTurns: ', newTurns);

      this.mapTurns(newTurns, 0);

      const newPlayer = !player;

      this.setState(() => {
        return {
          turns: newTurns
        };
      });
    }
  }

  handleTurns(color: string) {
    const { gameOn, turns, buttons, strictMode, count, player, playerCount, currentButton, preventTurn } = this.state;
    // bacause every time on click we create counter === 0;
    if (gameOn && player && !preventTurn) {
      clearInterval(this.checkTimeTurn);
      const newTurns = turns.slice();
      let counter = playerCount;
      clearInterval(this.makeRepeatTurns);

      this.setState({
        currentButton: color
      });

      const audio = new Audio(this.addSound(color));
      audio.play();

      if (color !== turns[counter]) {
        this.setState({
          preventTurn: true
        });

        if (strictMode === false) {
          // console.log('Damn!!!!!');
          counter = 0;
          const audioError = new Audio('http://www.pacdv.com/sounds/interface_sound_effects/beep-6.wav');
          audioError.play();
          this.setState({
            playerCount: counter,
            error: true
          });
          this.removeError = setTimeout(() => {
            this.setState({
              error: false
            });
            this.repeateMapTurns(newTurns, 0);
          }, 2000);
        } else {
          counter = 0;
          const audioError = new Audio('http://www.pacdv.com/sounds/interface_sound_effects/beep-6.wav');
          audioError.play();
          this.setState({
            error: true
          });
          this.removeError = setTimeout(() => {
            this.setState({
              player: true,
              count: 0,
              turns: [],
              playerCount: 0,
              currentButton: undefined,
              error: false,
              start: false,
              winner: false,
              preventTurn: false
            });
          }, 2000);
        }
      } else {
        counter++;
        this.setState({
          playerCount: counter,
        });
        // console.log('upper counter', counter);

        if (playerCount === 19) {
          const victorySound = turns[turns.length - 1];
          // console.log(victorySound);
          this.setState({
            winner: true
          });
          this.setWinner = setInterval(() => {
            const newSound = new Audio(this.addSound(victorySound));
            newSound.play();
            this.setState({
              currentButton: victorySound
            });

            this.removeWinner = setTimeout(() => {
              this.setState({
                currentButton: undefined,
              });
            }, 400);
          }, 500);

          setTimeout(() => {
            clearInterval(this.setWinner);
            this.setState({
              player: true,
              count: 0,
              turns: [],
              playerCount: 0,
              currentButton: undefined,
              error: false,
              start: false,
              winner: false
            });
          }, 5000);
        }


        if (counter === turns.length) {
          // console.log(counter);
          this.setState({
            player: !this.state.player,
            playerCount: 0
          });
          // counter = 0;
        }
      }
    }
  }

  switchGame() {
    // console.log('Game is switched!');
    const { gameOn } = this.state;
    const newGameOn = !gameOn;

    if (newGameOn === false) {
      this.setState({
        strictMode: false,
        start: false,
        player: true,
        count: 0,
        turns: [],
        playerCount: 0,
        currentButton: undefined,
        error: false,
        winner: false,
        preventTurn: false
      });

      clearInterval(this.makeTurns);
      clearTimeout(this.clearTurns);
      clearInterval(this.setWinner);
      clearInterval(this.makeRepeatTurns);
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
        // console.log('Start is false');
        clearInterval(this.makeTurns);
        clearTimeout(this.clearTurns);
        clearInterval(this.setWinner);
        clearInterval(this.makeRepeatTurns);
      }
    }
  }

  turnStrictMode() {
    const { gameOn, start, strictMode } = this.state;
    if (gameOn && !start) {
      // console.log('StrictMode is available!');
      this.setState({
        strictMode: !strictMode
      });
    }
  }

  render() {
    const { buttons, gameOn, start, strictMode, count, error, winner, currentButton } = this.state;
    return (
      <div className='game'>
        <Plate
          buttons={buttons}
          gameOn={gameOn}
          start={start}
          strictMode={strictMode}
          count={count}
          error={error}
          winner={winner}
          currentButton={currentButton}
          onHandleClick={this.handleTurns}
          switchGame={this.switchGame}
          startGame={this.startGame}
          turnStrictMode={this.turnStrictMode}
          removeColor={this.removeColor}
        />
      </div>
    );
  }
}

export default Game;
