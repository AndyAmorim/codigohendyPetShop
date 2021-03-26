const moment = require('moment');
const nomePetshop = "PETSHOP AVANADE";

let pets = [{
        nome: 'Costelinha',
        tipo: 'cachorro',
        idade: 5,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Doug',
        contato: '(11) 98899-4545',
        vacinado: false,
        servicos: ['banho', 'tosa']
    },
    {
        nome: 'Snoopy',
        tipo: 'cachorro',
        idade: 13,
        raca: 'Beagle',
        peso: 5,
        tutor: 'Charlie Brown',
        contato: '(11) 95656-4545',
        vacinado: true,
        servicos: ['banho']
    },
    {
        nome: 'Satanas',
        tipo: 'gato',
        idade: 5,
        raca: 'Vira-lata',
        peso: 3,
        tutor: 'Bruxa do 71',
        contato: '(11) 97171-7171',
        vacinado: true,
        servicos: ['banho', 'corte de unha']
    }
];

const listarPets = () => {

    for (let pet of pets) {
        //template string
        console.log(`${pet.nome}, ${pet.idade}, ${pet.tipo}, ${pet.raca}`);
    }

}

const vacinarPet = pet => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
}

const campanhaVacina = () => {
    console.log("Campanha de vacina 2020");
    console.log("vacinando...");

    let petVacinadosCampanha = 0;
    for (let pet of pets) {
        if (!pet.vacinado) {
            vacinarPet(pet);
            petVacinadosCampanha++;
        }
    }
    console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
};

const adicionarPet = novoPet => {
    if (typeof novoPet == "object" && validarDados(novoPet)) {
        // adiciona o pet
        novoPet.nome = String(novoPet.nome);
        novoPet.idade = parseInt(novoPet.idade);

        if (!novoPet.servicos) {
            novoPet.servicos = [];
        }

        pets.push(novoPet);
    } else {
        console.log("Ops, insira um argumento valido!");
    }
}

const darBanhoPet = pet => {
    pet.servicos.push({
        'serviço':'banho',
        'data': moment().format('DD-MM-YYYY')
    });
    console.log(`${pet.nome} está de banho tomado!`);
};

const tosarPet = pet => {
    pet.servicos.push({
        'serviço':'tosa',
        'data': moment().format('DD-MM-YYYY')
    });
    console.log(`${pet.nome} está com cabelinho na régua :)`);
};

const apararUnhasPet = pet => {
    pet.servicos.push({
        'serviço':'corte de unhas',
        'data': moment().format('DD-MM-YYYY')
    });
    console.log(`${pet.nome} está de unhas aparadas!`);
};


darBanhoPet(pets[0]);
console.log(pets[0])