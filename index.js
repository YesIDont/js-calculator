const _ = document.querySelector.bind(document);

const domRefrences = {
  number: {},
  operations: {},
  result: _('.result'),
};

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
  domRefrences.number[`${number}`] = _(`.number-${number}`);
});

['multiply', 'subtract', 'add', 'divide', 'equals', 'clear'].forEach(
  (operation) => {
    domRefrences.operations[`${operation}`] = _(`.operation-${operation}`);
  }
);

const numbersRefs = Object.values(domRefrences.number);

numbersRefs.forEach((ref) => {
  ref.addEventListener('click', () => {
    domRefrences.result.innerHTML += ref.innerHTML;
  });
});

const opsRefs = Object.values(domRefrences.operations);

function handleOperation(equationAsString) {
  const elements = equationAsString.split(' ');
  let result = undefined;

  let operationTypes = [];
  elements.forEach((element, index) => {
    if (element === '*') {
      operationTypes.push({
        index,
        type: '*',
      });
    } else if (element === '/') {
      operationTypes.push({ index, type: '/' });
    }
  });

  operationTypes.forEach((operation) => {
    const firstNumber = result ?? parseFloat(elements[operation.index - 1]);
    const secondNumber = parseFloat(elements[operation.index + 1]);

    if (firstNumber !== undefined && secondNumber !== undefined) {
      switch (operation.type) {
        case '*':
          result = firstNumber * secondNumber;
          break;
        case '/':
          result = firstNumber / secondNumber;
          break;
      }
    }
  });

  domRefrences.result.innerHTML += ` = ${result}`;
}

opsRefs.forEach((ref) => {
  const { innerHTML } = ref;

  switch (innerHTML) {
    case '=':
      ref.addEventListener('click', () => {
        handleOperation(domRefrences.result.innerHTML);
      });
      break;

    case 'clear':
      ref.addEventListener('click', () => {
        domRefrences.result.innerHTML = '';
      });
      break;

    default:
      ref.addEventListener('click', () => {
        domRefrences.result.innerHTML += ` ${innerHTML} `;
      });
  }
});
