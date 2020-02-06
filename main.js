'use strict';

class Calculator {
  constructor() {
    this.screen = document.getElementsByClassName('screen')[0];
    [this.countScreen, this.operatorScreen] = document.getElementsByClassName(
      'mini-screen'
    );
    this.characters = document.getElementsByClassName('character');
    this.operators = document.getElementsByClassName('operator');

    this.screen.innerText = '0';
    this.countScreen.innerText = 0;
    this.operatorScreen.innerText = '=';
    this.output = '0';
    this.operatorPressed = false;
    this.outOfRange = false;

    this.numberOne = '';
    this.numberTwo = '';
    this.currentOperator = '';
    this.numberCount = 0;

    this.message = '¯\\(ツ)/¯';
  }

  on() {
    for (let character of this.characters) {
      character.addEventListener('click', event => this.handleCharacter(event));
    }

    for (let operator of this.operators) {
      operator.addEventListener('click', event => this.handleOperator(event));
    }
  }

  handleCharacter(event) {
    if (this.operatorPressed) {
      this.output = '0';
      this.operatorPressed = false;
    }
    if (this.output.length === 7) {
      this.output = 'E' + this.output;
      this.outOfRange = true;
    } else if (event.target.innerText === '.' && this.outOfRange === false) {
      if (!this.output.includes('.')) {
        if (this.output === '') this.output = '0';
        this.output += event.target.innerText;
      }
    } else if (this.output === '0') {
      this.output = event.target.innerText;
    } else if (this.output.length < 7) {
      this.output += event.target.innerText;
    }
    this.countScreen.innerText = this.numberCount;
    this.screen.innerText = this.output;
  }

  handleOperator(event) {
    if (this.output === this.message) {
      this.reset();
      return;
    }
    this.isOutOfRange();
    if (this.outOfRange) {
      this.output = this.output.substring(1, 8);
      this.outOfRange = false;
    }
    switch (event.target.innerText) {
      case 'CE':
        this.reset();
        break;
      case 'del':
        this.output = this.output.substring(0, this.output.length - 1);
        if (this.output.length === 0) this.output = '0';
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
      case '=':
        if (this.output.indexOf('.') === this.output.length - 1) {
          this.output = this.output.substring(0, this.output.length - 1);
        }
        if (!this.operatorPressed && this.currentOperator) {
          if (this.currentOperator !== '=') {
            this.countScreen.innerText = ++this.numberCount;
          }
          this.numberTwo = this.output;
          this.stringToResult();
        }
        this.operatorPressed = true;
        if (this.outOfRange) {
          this.numberOne = this.output.substring(1, 8);
          this.outOfRange = false;
        } else {
          this.numberOne = this.output;
        }
        this.currentOperator = event.target.innerText;
        this.operatorScreen.innerText = this.currentOperator;
        if (this.numberCount === 0) {
          this.countScreen.innerText = ++this.numberCount;
        }
        if (event.target.innerText === '=') {
          this.numberCount = 0;
          this.currentOperator = '';
        }
        break;
    }
    this.screen.innerText = this.output;
  }

  stringToResult() {
    const x = parseFloat(this.numberOne);
    const y = parseFloat(this.numberTwo);
    switch (this.currentOperator) {
      case '/':
        if (y === 0) {
          this.output = this.message;
          break;
        }
        this.output = `${x / y}`;
        break;
      case 'x':
        this.output = `${x * y}`;
        break;
      case '-':
        this.output = `${x - y}`;
        break;
      case '+':
        this.output = `${x + y}`;
        break;
    }
    if (this.output.length > 7) {
      this.output = 'E' + this.output.substring(0, 7);
      this.outOfRange = true;
    }
  }

  isOutOfRange() {
    this.outOfRange = Boolean(this.output.length > 7);
  }

  reset() {
    this.screen.innerText = '0';
    this.countScreen.innerText = 0;
    this.operatorScreen.innerText = '=';
    this.output = '0';
    this.operatorPressed = false;
    this.outOfRange = false;

    this.numberOne = '';
    this.numberTwo = '';
    this.currentOperator = '';
    this.numberCount = 0;
  }

  log(text = '') {
    console.log('_______________________', text);
    console.log('output', this.output);
    console.log('out of range', this.outOfRange);
    console.log('operator pressed', this.operatorPressed);
    console.log('number1', this.numberOne);
    console.log('number2', this.numberTwo);
    console.log('current operator', this.currentOperator);
  }
}

const calc = new Calculator();
calc.on();
