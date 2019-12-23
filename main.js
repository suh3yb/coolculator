'use strict';

class Calculator {
  constructor() {
    this.screen = document.getElementsByClassName('screen')[0];
    this.characters = document.getElementsByClassName('character');
    this.operators = document.getElementsByClassName('operator');

    this.screen.innerText = '0';
    this.output = '0';
    this.result = '';
    this.operatorPressed = false;
    this.outOfRange = false;

    this.firstNumber = '';
    this.secondNumber = '';

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
    this.screen.innerText = this.output;
  }

  handleOperator(event) {
    if (this.outOfRange || this.output === this.message) {
      this.reset();
      return;
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
        this.operatorPressed = true;
        if (this.output.indexOf('.') === this.output.length - 1) {
          this.output = this.output.substring(0, this.output.length - 1);
        }
        if (this.includesSymbol()) {
          this.secondNumber = this.output;
          this.result += this.output;
          this.stringToResult();
          this.firstNumber = this.output;
        }
        this.result = this.output + event.target.innerText;
        this.firstNumber = this.output;
        break;
    }
    this.screen.innerText = this.output;
  }

  includesSymbol() {
    let symbol = false;
    ['/', 'x', '-', '+'].forEach(operator => {
      if (this.result.indexOf(operator) !== -1) {
        symbol = operator;
      }
    });
    return symbol;
  }

  stringToResult() {
    const x = parseFloat(this.firstNumber);
    const y = parseFloat(this.secondNumber);
    switch (this.includesSymbol()) {
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

  reset() {
    this.screen.innerText = '0';
    this.output = '0';
    this.result = '';
    this.operatorPressed = false;
    this.outOfRange = false;

    this.firstNumber = '';
    this.secondNumber = '';
  }

  log(text) {
    console.log('_______________________', text);
    console.log('output', this.output);
    console.log('result', this.result);
    console.log('out of range', this.outOfRange);
    console.log('operator pressed', this.operatorPressed);
  }
}

const calc = new Calculator();
calc.on();
