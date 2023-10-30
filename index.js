const rates = {};
const nominal = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const elementKZT = document.querySelector('[data-value="KZT"]');
const elementAUD = document.querySelector('[data-value="AUD"]');
const elementAZN = document.querySelector('[data-value="AZN"]');
const elementAMD = document.querySelector('[data-value="AMD"]');
const elementBYN = document.querySelector('[data-value="BYN"]');
const elementCNY = document.querySelector('[data-value="CNY"]');

const convertButton = document.querySelector('#convertButton');

const conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

getCurrencies();
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;
    console.log(result);

    rates.RUB = 1;
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.KZT = result.Valute.KZT;
    rates.AUD = result.Valute.AUD;
    rates.AZN = result.Valute.AZN;
    rates.AMD = result.Valute.AMD;
    rates.BYN = result.Valute.BYN;
    rates.CNY = result.Valute.CNY;

    console.log(rates);
    console.log(nominal);

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
    elementKZT.textContent = rates.KZT.Value.toFixed(2);
    elementAUD.textContent = rates.AUD.Value.toFixed(2);
    elementAZN.textContent = rates.AZN.Value.toFixed(2);
    elementAMD.textContent = rates.AMD.Value.toFixed(2);
    elementBYN.textContent = rates.BYN.Value.toFixed(2);
    elementCNY.textContent = rates.CNY.Value.toFixed(2);

    // цвет для информера USD
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('down');
    }
    // цвет для информера EUR
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('down');
    }
    // цвет для информера GBP
    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('down');
    }
    // цвет для информера KZT
    if (rates.KZT.Value > rates.KZT.Previous) {
        elementKZT.classList.add('top');
    } else {
        elementKZT.classList.add('down');
    }
    // цвет для информера AUD
    if (rates.AUD.Value > rates.AUD.Previous) {
        elementAUD.classList.add('top');
    } else {
        elementAUD.classList.add('down');
    }
    // цвет для информера AZN
    if (rates.AZN.Value > rates.AZN.Previous) {
        elementAZN.classList.add('top');
    } else {
        elementAZN.classList.add('down');
    }
    // цвет для информера AMD
    if (rates.AMD.Value > rates.AMD.Previous) {
        elementAMD.classList.add('top');
    } else {
        elementAMD.classList.add('down');
    }
    // цвет для информера BYN
    if (rates.BYN.Value > rates.BYN.Previous) {
        elementBYN.classList.add('top');
    } else {
        elementBYN.classList.add('down');
    }
    // цвет для информера CNY
    if (rates.CNY.Value > rates.CNY.Previous) {
        elementCNY.classList.add('top');
    } else {
        elementCNY.classList.add('down');
    }
}

convertButton.addEventListener('click' , () => {
    const input = document.querySelector('#amount');
    const historyInput = document.querySelector('.result_convert');

    const taskElement = document.createElement('span')
    let taskText = input.value;
    if (taskText === '') {
        return;
    }

    taskElement.textContent = input.value + ' RUB = ' + ((parseFloat(input.value) * rates[targetCurrency.value].Nominal) / rates[targetCurrency.value].Value).toFixed(2) + ' ' + rates[targetCurrency.value].CharCode;

    conversionHistory.push(taskElement.textContent);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));

    historyInput.appendChild(taskElement);
    input.value = '';



    const taskElementSave = taskElement.textContent;
    taskElement.onmouseover = function() {
        taskElement.style.background= "brown";
        taskElement.textContent = "УДАЛИТЬ";
    };

    taskElement.onmouseleave = function() {
        taskElement.style.background= "#1e192d";
        taskElement.textContent = taskElementSave;
    };


    taskElement.addEventListener('click', (event) => {
        event.target.remove()
        conversionHistory.splice(conversionHistory.indexOf(taskElement.textContent), 1);
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    });
});

for (let index = 0; index < conversionHistory.length; index++) {
    const entry = conversionHistory[index];
    const historyInput = document.querySelector('.result_convert');
    const taskElement = document.createElement('span');
    taskElement.textContent = entry;

    taskElement.onmouseover = function () {
        taskElement.style.background = 'brown';
        taskElement.textContent = 'УДАЛИТЬ';
    };

    taskElement.onmouseleave = function () {
        taskElement.style.background = '#1e192d';
        taskElement.textContent = entry;
    };

    taskElement.addEventListener('click', (event) => {
        event.target.remove()
        conversionHistory.splice(conversionHistory.indexOf(taskElement.textContent));
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    });

    historyInput.appendChild(taskElement);
}







