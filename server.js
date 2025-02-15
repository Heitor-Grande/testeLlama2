const express = require("express")
const axios = require("axios")
const server = express()


server.listen(8080, function () {
    console.log("rodando server teste")
})

const jsonData = {
    perfilCliente: {
        nome: 'Heitor Grande',
        idade: '20 anos',
        sexo: 'Masculino.'
    },
    ultimosPedidos: [
        {
            pedido: "#001",
            total_pedido: "R$42,00",
            items: [
                {
                    item: 'x-tudo',
                    preco: 'R$15,00'
                },
                {
                    item: 'batata-frita',
                    preco: 'R$20,00'
                },
                {
                    item: 'coca-lata',
                    preco: 'R$7,00'
                }
            ]
        },
        {
            pedido: "#002",
            total_pedido: "R$35,00",
            items: [
                {
                    item: 'x-salada',
                    preco: 'R$13,00'
                },
                {
                    item: 'batata-inteira',
                    preco: 'R$10,00'
                },
                {
                    item: 'coca cola 2 litros',
                    preco: 'R$12,00'
                }
            ]
        }
    ]
}

const jsonDataString = JSON.stringify(jsonData)

const perguntaDoUsuario = "Olá, gostaria de saber o que foi pedido no pedido #002 e o total. Por gentileza."
axios.post("http://localhost:11434/api/generate", {
    model: "llama2",
    prompt: `Você é um atentende de um comércio. Com base nos dados do cliente, responda a perguta do usuario: ${perguntaDoUsuario}? ${jsonDataString}`,
    stream: false
}).then(function (resposta) {
    console.log(resposta.data.response)
}).catch(function (erro) {
    console.log(erro)
})