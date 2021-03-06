const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const atualizarBanco = () => {
    //conversão de objeto javascript para JSON
    let petsAtualizado = JSON.stringify(bancoDados, null, 2);
    //atualização do arquivo bancoDados.json
    fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
}

const listarPets = () => {

    bancoDados.pets.forEach((pet) => {
        let { nome, idade , tipo ,raca } = pet
        console.log(`${nome}, ${idade} anos, ${tipo}, ${raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'}`);
    
        pet.servicos.forEach((servico) => {
            let { data, nome} = servico
            console.log(`${data} - ${nome}`);
        })
    })
}


const vacinarPet = pet => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarBanco();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
}

const campanhaVacina = () => {
    console.log("Campanha de vacina 2021");
    console.log("vacinando...");

    let petVacinadosCampanha = 0;

    bancoDados.pets = bancoDados.pets.map((pet) => {
        if (!pet.vacinado) {
            vacinarPet(pet);
            petVacinadosCampanha++;
        }

        return pet;
    });

    // atualizarBanco();
    console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
};

const adicionarPet = novoPet => {
    bancoDados.pets.push(novoPet);
    atualizarBanco();
    console.log(`${novoPet.nome} foi adicionado com sucesso!`);
}

const darBanhoPet = pet => {
    pet.servicos.push({
        'nome':'banho',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${pet.nome} está de banho tomado!`);
};

const tosarPet = pet => {
    pet.servicos.push({
        'nome':'tosa',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${pet.nome} está com cabelinho na régua :)`);
};

const apararUnhasPet = pet => {
    pet.servicos.push({
        'nome':'corte de unhas',
        'data': moment().format('DD-MM-YYYY')
    });
    atualizarBanco();
    console.log(`${pet.nome} está de unhas aparadas!`);
};

const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}`);
    servico(pet);
    console.log('Até mais!');
}

const buscarPet = (nomePet) => {

    let petEncontrado = bancoDados.pets.find((pet) => {
        return pet.nome == nomePet;
    });

    return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
}

const filtrarTipoPet = (tipoPet) => {
    // && E - AND
    // || OU - OR
    // == verifica valores iguais
    // === verifica valores e tipos iguais
    let petsEncontrados = bancoDados.pets.filter((pet) => {
        return pet.tipo == tipoPet;
    });

    return petsEncontrados;
}

const clientePremium = (pet) => {
    let nServicos = pet.servicos.length;

    if (nServicos > 5) {
        console.log(`Olá, ${pet.nome}! Você é um cliente especial e ganhou um descontão!`);
    } else {
        console.log(`Olá, ${pet.nome}! Você ainda não tem descontos disponiveis!`);
    }
}
listarPets()
// darBanhoPet(bancoDados.pets[4]);
// darBanhoPet(bancoDados.pets[4]);
// darBanhoPet(bancoDados.pets[4]);
// darBanhoPet(bancoDados.pets[4]);
// darBanhoPet(bancoDados.pets[4]);
// darBanhoPet(bancoDados.pets[4]);
// clientePremium(bancoDados.pets[4])
// console.log(buscarPet('Bidu'));
// console.log(clientePremium(bancoDados.pets[2]));

// campanhaVacina();

// console.log("-----------")
// listarPets();
// adicionarPet({
//     "nome": "Romarinho",
//     "tipo": "cachorro",
//     "idade": 3,
//     "raca": "American",
//     "peso": 28,
//     "tutor": "Bruno",
//     "contato": "(11) 99999-9999",
//     "vacinado": true,
//     "servicos": []
// });