let result = '';

const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber p');
const mathSign = document.querySelector('.mathSign');
const numbersButtons = document.querySelectorAll('.button');
const operatorsButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equals');
const clear = document.querySelector('.clear');

let sqrtLength = 0; 
const maxTotalLength = 15;

function displayNumbers() {
  if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) //sprawdzenie czy kliknięty przycisk jest kropką i czy liczba nie zawiera już kropki
  return;

 
  if (currentNumber.innerHTML === '0' && this.textContent !== '.') {  //jesli wynik to 0 zastąp go inną liczbą po wpisaniu jej
    currentNumber.innerHTML = this.textContent;
  } else if (this.textContent === '.' && currentNumber.innerHTML === '') { //jeśli nie ma żadnego znaku na kalkulatorze i kliknięmy . ma się zrobić 0.
    currentNumber.innerHTML = '0.';
  } else {

  //sprawdzenie, czy liczba znaków nie przekracza 15
    if (previousNumber.innerHTML.length + currentNumber.innerHTML.length + sqrtLength < maxTotalLength) {
      currentNumber.innerHTML += this.textContent;
    }

    if (previousNumber.innerHTML !== '' && currentNumber.innerHTML.length >= maxTotalLength) {
      showResult();
      mathSign.innerHTML = this.textContent;
      currentNumber.innerHTML = this.textContent;
      previousNumber.innerHTML = result;
    }
  }
}

function operate() {
  if (currentNumber.innerHTML === '' && this.textContent === '-') {
    currentNumber.innerHTML = '-';
    return;
  } else if (currentNumber.innerHTML === '') {
    return;
  }

  if (mathSign.innerHTML !== '') {
    showResult();
  }

  if (this.textContent === '√') {
    sqrtLength = 1; //ustawienie długości pierwiastkowanej liczby na 1(żeby cała liczba razem z tym co jest po przecinku nie była odbierana jako 1 znak)
    let operand = Number(currentNumber.innerHTML);
    let sqrtResult = Math.sqrt(operand);
    if (Number.isInteger(sqrtResult)) { //jeśli wynik pierwiastkowania jest całkowity to nie pokazuj miejsc po przecinku
      currentNumber.innerHTML = parseInt(sqrtResult);
    } else {
      currentNumber.innerHTML = parseFloat(sqrtResult.toFixed(8));
    }
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
    return;
  }

  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = '';
}

function showResult() {
  if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case '+':
      result = b + a;
      break;
    case '-':
      result = b - a;
      break;
    case '×':
      result = b * a;
      break;
    case '÷':
      result = b / a;
      break;
    case '^':
      result = b ** a;
      break;
    case '%':
      result = (b * 1 / 100) * a;
      break;
  }

  // formatowanie, żeby przy przekroczeniu maksymalnej długości wynik przekształcił się na taki z liczbą eulera i użycie parseFloat, żeby jeśli w liczbie po przecinku na końcu są zera to zostały one usunięte
  if (result.toString().length <= maxTotalLength) {
    currentNumber.innerHTML = parseFloat(result);
    sqrtLength = 0; //resetowanie długości pierwiastkowanej liczby
  } else {
    currentNumber.innerHTML = parseFloat(result.toExponential(8)); //formatowanie wyniku na taki z liczbą eulera, jeśli jest taka konieczność
    sqrtLength = 0; //resetowanie długości pierwiastkowanej liczby
  }

  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

function clearScreen() {
  result = '';
  currentNumber.innerHTML = '';
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
  sqrtLength = 0; //resetowanie długości pierwiastkowanej liczby
}

operatorsButtons.forEach((button) => button.addEventListener('click', operate));

equalButton.addEventListener('click', showResult);

clear.addEventListener('click', clearScreen);

numbersButtons.forEach((button) => {
  button.addEventListener('click', displayNumbers);
});

