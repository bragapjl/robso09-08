import express from 'express'
const servidor = express()
servidor.use(express.json())

//parametro de rota

servidor.get('/acaizaobrabo/:n1/:n2/:n3', (req,resp) => {

    let qtdpequeno = Number(req.params.n1)
    let qtdmedio = Number(req.params.n2)
    let qtdgrande = Number(req.params.n3)

    
    let peq = qtdpequeno * 13.50
    let med = qtdmedio * 15.0
    let grande = qtdgrande * 17.50

    let total = peq + med + grande

    resp.send({
        pagar: total
    })
})

//queryy

servidor.get('/acai/preco/', (req,resp) => {
    let qtdpequeno = Number(req.query.n1)
    let qtdmedio = Number(req.query.n2)
    let qtdgrande = Number(req.query.n3)

    let peq = qtdpequeno * 13.50
    let med = qtdmedio * 15.0
    let grande = qtdgrande * 17.50

    let total = peq + med + grande
    resp.send({
        pagar: total
    })
})

//parametro de corpoo(body)
servidor.post('/acaibolado', (req, resp) => {

    let qtdpequeno = Number(req.body.qtdpequeno)
    let qtdmedio = Number(req.body.qtdmedio)
    let qtdgrande = Number(req.body.qtdgrande)

    let peq = qtdpequeno * 13.50
    let med = qtdmedio * 15.0
    let grande = qtdgrande * 17.50

    let total = peq + med + grande
    
    resp.send({
        pagar: total
    })
})

//media com rota

servidor.get('/media/:n1/:n2/:n3', (req,resp) => {
    let nota1 = Number(req.params.n1)
    let nota2 = Number(req.params.n2)
    let nota3 = Number(req.params.n3)

    let media = (nota1 + nota2 + nota3) /3

    resp.send({
        media: media.toFixed(1)
    })
})

//media com query

servidor.get('/mediatico/', (req,resp) => {
    let nota1 = Number(req.query.n1)
    let nota2 = Number(req.query.n2)
    let nota3 = Number(req.query.n3)

    let media = (nota1 + nota2 + nota3) /3

    resp.send({
        media: media
    })
})

//treino leitura, parametro de corpo com msg erro

servidor.post('/treino/leituralivro', (req,resp) => {
    
    try{

        if(isNaN(req.body.pag)){
            throw new Error('alguns dos paramns esta incorreto. tente colocar outro numeros')
        }

        if(isNaN(req.body.tempo)){
            throw new Error('o tempo ta errado chefe')
        }

        if(!req.body.livro){
            throw new Error('verifique o nome do livro')
        }
        let livro = req.body.livro
        let pag = req.body.pag
        let tempoPag = req.body.tempo
        
        let tempolt = (tempoPag * pag) /3600

        resp.send({
            livro: livro,
            tempoLeitura: tempolt.toFixed(2)
        })
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

servidor.get('/coress', (req,resp) => {
    const combinacaoCor = {
        "azul:amarelo": "verde",
        "amarelo:vermelho": "laranja",
        "vermelho:azul": "roxo"
      }

      const coresPrimarias = ["amarelo", "vermelho", "azul"]

    try{
        const corUm = req.query.cor1;
        const corDois = req.query.cor2;
    
        if (!coresPrimarias.includes(corUm) || !coresPrimarias.includes(corDois)) {
          throw new Error("Uma das cores não são primarias.")
        }   
    
        const corCombinada = `${corUm}:${corDois}`;

        const resultado = combinacaoCor[corCombinada];

        return resp.send({
            corResultante: resultado
          })
        } catch(error){
        return resp.status(400).send({
            erro: error.message
        })
    }
})




    servidor.listen(
        5001,
        () => console.log('API SUBIU BOLADO NA PORTA 5001'))