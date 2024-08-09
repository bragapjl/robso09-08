import express from 'express'
const servidor = express()
servidor.use(express.json())

//parametro de rota

servidor.get('/treino/acaizaobrabo/:n1/:n2/:n3', (req,resp) => {

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
servidor.post('/treino/acaibolado', (req, resp) => {

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

servidor.get('/treino/media/:n1/:n2/:n3', (req,resp) => {
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

servidor.get('/treino/coress', (req,resp) => {
    const combinacaoCor = {
        "azul:amarelo": "verde",
        "amarelo:azul": "verde",
        "amarelo:vermelho": "laranja",
        "vermelho:amarelo": "laranja",
        "vermelho:azul": "roxo",
        "azul:vermelho": "roxo"
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

servidor.post('/treino/cinema/validacao', (req,resp) => {
        try {
            if(isNaN(req.body.idadePessoa1)){
                throw new Error('verifique a idade de uma das pessoas')
            }
    
            if(isNaN(req.body.idadePessoa2)){
                throw new Error('verifique a idade de uma das pessoas')
            }
    
            if(!req.body.classificacao){
                throw new Error('O parametro classificacao está incorreto')
            }
    
    
            let idade1 = Number(req.body.idadePessoa1);
            let idade2 = Number(req.body.idadePessoa2);
            let clas = Number(req.body.classificacao);
    
            let poder = true
    
            if(idade1 < clas || idade2 < clas){
                poder = false
               return resp.send({
                    podemAssistir: poder
                })
            }
    
            resp.send({
                podemAssistir: poder
            })
        } 
    
        catch (err){
            return resp.status(400).send({
                erro: err.message
            })
        }
    })


servidor.get('/treino/tabuada/:n1', (req,resp) => {
    let nums = req.params.n1
    let nums2 = []
    for(let i = 0; i < 11; i++){
        nums2[i] = nums * i
    }

    resp.send({
        tabuada: nums2
    })
})


servidor.post('/treino/ordenacao', (req,resp) => {
    let n1 = req.body.ordem[0]
    let n2 = req.body.ordem[1]
    let n3 = req.body.ordem[2]

    let ordem = ''
    if(n1 < n2 && n1 < n3 && n2 > n1 && n2 < n3){
        ordem = 'crescente'
    }
    else if(n1 > n2 && n1 > n3 && n2 > n3 && n2 < n1){
        ordem = 'decrescente'
    }else {
        ordem = 'desordenada'
    }

    resp.send({
        ordem: ordem
    })
})

servidor.post('/treino/analisedenotas', (req,resp) => {

    let n1 = req.body.n1[0]
    let n2 = req.body.n2[1]
    let n3 = req.body.n3[2]
    let n4 = req.body.n4[3]
    let n5 = req.body.n5[4]

    let soma = n1 + n2 + n3 + n4 + n5 

    let notas = []
    let maiorNota = notas / soma.length
    let menorNota = Infinity

    resp.send({
        notas: notas,
        maior: maiorNota,
        menor: menorNota
    })
})






    servidor.listen(
        5001,
        () => console.log('API SUBIU BOLADO NA PORTA 5001'))