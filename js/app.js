///////////////////////////////////////////////
////////////// fetching elements //////////////
///////////////////////////////////////////////
// calc display
const calcPrevOperand = document.getElementById('calc-prev-operand');
const calcCurrOperand = document.getElementById('calc-current-operand');
const calcCurrOperator = document.getElementById('operator');
// calc
const calculator = document.getElementById('calculator');

// functions
const getInnerValue = (elementId) => {
	const elementInnerValue = elementId.innerText;

	return elementInnerValue;
};

const updateField = (field, newValue) => {
	field.innerText = newValue;
};

// using arguments object in the arrow function by destructuring
const clearField = (...arguments) => {
	for (field of arguments) {
		field.innerText = '';
	}
};


const getOperator = (operator) => {
	if (operator == '+' || operator == '-' || operator == '%') {
		return operator;
	} else if (operator == '×') {
		return '*';
	} else if (operator == '÷') {
		return '/';
	}
};

const calculate = (operator, firstOperand, secondOperand) => {
	const firstOperandValue = parseFloat(firstOperand);
	const secondOperandValue = parseFloat(secondOperand);
	switch (operator) {
		case '+':
			return firstOperandValue + secondOperandValue;
			break;
		case '-':
			return firstOperandValue - secondOperandValue;
			break;
		case '*':
			return firstOperandValue * secondOperandValue;
			break;
		case '/':
			return firstOperandValue / secondOperandValue;
			break;
		case '%':
			return firstOperandValue % secondOperandValue;
	}
};

// event listeners
calculator.addEventListener('click', (event) => {
	// variables
	let currOperand = getInnerValue(calcCurrOperand);
	let prevOperand = getInnerValue(calcPrevOperand);
	const clickedItem = event.target;
	const currentTargetText = getInnerValue(clickedItem);
	const currOperatorText = getInnerValue(calcCurrOperator);

	if (clickedItem.classList.contains('btn-number')) {
		//-------------------------------------------//
		//------------- if any number is clicked ----//
		//-------------------------------------------//

		const newOperand = currOperand + currentTargetText;
		// decreased font size if operand is bigger
		if(currOperand.length > 9) {
			calcCurrOperand.style.fontSize = '1.4rem';
		} else {
			calcCurrOperand.style.fontSize = '1.9rem';
		}
		// updating current field
		updateField(calcCurrOperand, newOperand);
	} else if (clickedItem.classList.contains('btn-operator')) {
		//---------------------------------------------//
		//------------- if any operator is clicked ----//
		//--------------------------------------------//

		// making sure a number is already typed before selecting operator
		if(currOperand != '') {
			// if any operator is clicked
		const operator = getOperator(clickedItem);
		if (prevOperand == '') {
			// if previous operand is empty
			updateField(calcPrevOperand, currOperand);
		} else {
			// if previous operand is there
			const calcResult = calculate(
			getOperator(currOperatorText),
			prevOperand,
			currOperand
			);

			// updating the operand field
			updateField(calcPrevOperand, calcResult);
		}

		// updating the operator field
		updateField(calcCurrOperator, currentTargetText);

		calcCurrOperand.innerText = '';
		}
	} else if (clickedItem.classList.contains('btn-equal')) {
		//-------------------------------------------//
		//------------- if equal btn is clicked ----//
		//-------------------------------------------//

		// if there is no operand
		if(prevOperand == '' && currOperand != '') {
			updateField(calcCurrOperand, currOperand);
		}
		else if(currOperand != '') {
			// if equal button is clicked
		const calcResult = calculate(
			getOperator(currOperatorText),
			prevOperand,
			currOperand
		);

		// updating the operand field
		updateField(calcCurrOperand, calcResult);
		clearField(calcPrevOperand, calcCurrOperator);
		}
	} else if(clickedItem.classList.contains('btn-clear')) {
		//-------------------------------------------//
		//------------- if clear button is clicked ----//
		//-------------------------------------------//

		clearField(calcPrevOperand, calcCurrOperand, calcCurrOperator);
	} else if(clickedItem.classList.contains('btn-prev-clear')) {
		//-------------------------------------------//
		//------------- if prev clear is clicked ----//
		//-------------------------------------------//

		if(currOperand.length == 2 && currOperand.includes('-')) {
			updateField(calcCurrOperand, currOperand.slice(0, currOperand.length - 2));
		} else if(currOperand != '') {
			updateField(calcCurrOperand, currOperand.slice(0, currOperand.length - 1));
		}
	} else if(clickedItem.classList.contains('btn-plusMinus')) {
		//-------------------------------------------//
		//------------- if plus minus is clicked ----//
		//-------------------------------------------//

		if(parseFloat(currOperand) > 0) {
			currOperand = '-' + currOperand;
		} else if(currOperand != '') {
			currOperand = parseFloat(currOperand) * (-1);
		}

		updateField(calcCurrOperand, currOperand);
	} else if(clickedItem.classList.contains('btn-dots')) {
		//-------------------------------------------//
		//------------- if dots btn is clicked ----//
		//-------------------------------------------//

		let newOperand = '';
		if(currOperand == '') {
			newOperand = '0';
		}
		if(!currOperand.includes('.')) {
			newOperand += currOperand + currentTargetText;
			updateField(calcCurrOperand, newOperand);
		}
	}
});


// toggle btn all functionalities
const modeBtn = document.getElementById('toggle-btn');
const toggleCircle = modeBtn.children[0];
const calcBtns = document.querySelectorAll('.calc-btn');

modeBtn.addEventListener('click', () => {
	toggleCircle.classList.toggle('toggle-action');
	calculator.classList.toggle('change-background');
	calcBtns.forEach(btn => {
		btn.classList.toggle('change-color');
	})
	calcCurrOperand.classList.toggle('change-color');
	calcPrevOperand.classList.toggle('change-color');
	calcCurrOperator.classList.toggle('change-color');
})
