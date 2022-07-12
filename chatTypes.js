import { sendBotMessage } from './mosiaCaller.js'
import { requestGs } from './googleSheets.js'
import { ticketZendesk } from './axios.js'

export async function typeAttend(chatProtocol){
    const chatMenuOptions = 'Escolha uma das opções:\n1- Consultar status de nossos serviços;\n2- Abrir chamado;\n3- Falar com um de nossos atendentes;\n4- Encerrar Atendimento'
    try{
      await sendBotMessage(chatProtocol,"message",chatMenuOptions)  
    }
    catch(err){
      console.log(err.message)
    }
}

export async function botOption1(chatProtocol){
  //Retornando dados da googleSheets e tratando para exibição no MosiaChat
  const googleSheets = await requestGs()
  const result = googleSheets.toString().replace(/,/g,'\n')
  const messageOption1 = `ATENÇÃO!\nImplementamos um pequeno healthchecks das aplicações da Mobile Saúde, verifique abaixo o status de nossos serviços e aplicações.\n\n${result}`+
  '\n\nConseguimos ajudar?\n0-Retornar ao Menu\n4-Encerrar atendimento'
  await sendBotMessage(chatProtocol,'message',messageOption1)
}

export async function botOption2(chatProtocol){
  const messageOption2 = 'ATENÇÃO!\nEstamos implementando a funcionalidade para abrir chamados diretamente pelo MosiaChat'+
  '\n\nAté lá, acesse este link e abra seu ticket.\n<a href="https://mobilesaude.zendesk.com/hc/pt-br/requests/new" target="_blank"> >>>Clique aqui<<< </a>'+
  '\n\nConseguimos ajudar?\n0-Retornar ao Menu\n4-Encerrar atendimento'
  await sendBotMessage(chatProtocol,'message',messageOption2)
}

export async function botOption3(chatProtocol){
  await sendBotMessage(chatProtocol,'message','Só um momento iremos direcionar para um de nossos Atendentes')
  .then(
    await sendBotMessage(chatProtocol,"transfer")
  )
}

export async function botOption4(chatProtocol){
    await sendBotMessage(chatProtocol,'close','message')
}

var check = 0
export async function botOption5(chatProtocol,message){
  if(check >= 1){
    const numberZendesk = message.toString().replace(/#/g,'')
    const zendesk = await ticketZendesk(numberZendesk)
    const result = zendesk.toString().replace(/,/g,'\n')
    await sendBotMessage(chatProtocol,'message',result)
    check += 0
  }
  if(check == 0){
    await sendBotMessage(chatProtocol,'message','Informe o número do ticket, Ex: #10000')
    check += 1
  }
}

export async function botWrongOption(chatProtocol){
    const chatMessageWrongOption = "Desculpe não entendi a opção desejada, poderia selecionar uma novamente." +
    '\n\nEscolha uma das opções:\n1- Consultar status de nossos serviços;\n2- Abrir chamado;\n3- Falar com um de nossos atendentes;\n4- Encerrar Atendimento'
    await sendBotMessage(chatProtocol,'message',chatMessageWrongOption)
}

export async function botCallerDontClose(chatProtocol){
  const chatMessageCallerDontclose = 'Tudo bem, podemos ajudar em mais alguma coisa?\nSe SIM selecione uma de nossas opções abaixo, caso constrário basta digitar 4 para encerrar o atendimento' +
  '\n\nEscolha uma das opções:\n1- Consultar status de nossos serviços;\n2- Abrir chamado;\n3- Falar com um de nossos atendentes;\n4- Encerrar Atendimento'
  await sendBotMessage(chatProtocol,'message',chatMessageCallerDontclose)
}


export async function botMessageAttendantsOffline(chatProtocol){
  const botMessageAttendantsOffline = 'Todos os atendentes encontram-se indisponíveis no momento, por favor tente mais tarde.' +
  '\n\nConseguimos ajudar?\n0-Retornar ao Menu\n4-Encerrar atendimento'
  await sendBotMessage(chatProtocol,'message',botMessageAttendantsOffline)
}