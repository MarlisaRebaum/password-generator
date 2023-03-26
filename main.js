// DOM Elements
const resultInput = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const lengthSlider = document.querySelector('.pass-length input');
const optionDiv = document.querySelectorAll('.option');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Add event listener to option div's so entire div can be clicked, not just checkbox
optionDiv.forEach(function(div) {
  div.addEventListener('click', function() {
    const checkbox = div.querySelector('.checkbox');
    checkbox.checked = !checkbox.checked;
  });
});

// Add event listener to generate password button
generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
  // Display generated password in the input field with the id result 
  const resultInput = document.getElementById("result");
  resultInput.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Add event listener to clipboard button
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultInput.value;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();

  // The clipboard icon is changed to a checked icon and then changed back after 2 seconds
  const icon = clipboard.querySelector("i");
  icon.classList.remove("fa-clipboard");
  icon.classList.add("fa-check");
  setTimeout(() => {
    icon.classList.remove("fa-check");
    icon.classList.add("fa-clipboard");
  }, 2000);
});

// Function for generating random password
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

// Funcions for generating random characters
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = +lengthEl.value;
}
updateSlider()

lengthSlider.addEventListener("click", updateSlider)