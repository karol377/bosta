const flagContainer = document.getElementById('flag-container');
const flagImage = document.getElementById('flag');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next-button');

let countries = [];
let currentCountry;

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v2/all');
    countries = await response.json();
    startGame();
}

function startGame() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];
    
    // CORREÇÃO 1: A API v2 retorna "name" diretamente (string), e não "name.common"
    // Por isso usamos currentCountry.name
    flagImage.src = currentCountry.flags.png;
    generateOptions();
}

function generateOptions() {
    // CORREÇÃO 2: mesma coisa aqui – "name" direto, não "name.common"
    const options = [currentCountry.name];

    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex].name;

        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }

    options.sort(() => Math.random() - 0.5);
    
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected) {
    // CORREÇÃO 3: novamente, usamos "name" direto em vez de "name.common"
    if (selected === currentCountry.name) {
        resultContainer.textContent = 'Correto!';
    } else {
        // CORREÇÃO 4: uso de crase para template literal `${}` funcionar
        // ANTES estava com aspas simples, o que impede a interpolação
        resultContainer.textContent = `Errado! A resposta correta é ${currentCountry.name}.`;
    }

    nextButton.style.display = 'block';
}

nextButton.onclick = () => {
    resultContainer.textContent = '';
    nextButton.style.display = 'none';
    startGame();
};

fetchCountries();