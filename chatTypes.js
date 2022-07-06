import { sendBotMessage } from './mosiaCaller.js'

export async function typeAttend(chatProtocol){
    const chatMenuOptions = 'Escolha uma das opções:\n1- Abrir chamado;\n2- Falar com um de nossos atendentes;\n3- Consultar status online;\n4- Encerrar Atendimento'
    try{
      await sendBotMessage(chatProtocol,"message",chatMenuOptions)  
    }
    catch(err){
      console.log(err.message)
    }
}

export async function botOption1(chatProtocol){
    await sendBotMessage(chatProtocol,'message','ATENÇÃO!\nEstamos implementando a funcionalidade para abrir chamados diretamente pelo MosiaChat'+
    '\n\nAté lá, acesse este link e abra seu ticket.\nhttps://mobilesaude.zendesk.com/hc/pt-br/requests/new'+
    '\n\nDeseja encerrar este atendimento?\n0-Retornar ao Menu\n4-Encerrar atendimento')
}

export async function botOption2(chatProtocol){
  await sendBotMessage(chatProtocol,chatType,'Só um momento iremos direcionar para um de nossos Atendentes').then(
    await sendBotMessage(chatProtocol,"transfer")
  )
}

export async function botOption4(chatProtocol){
    await sendBotMessage(chatProtocol,'close','message')
}

export async function botWrongOption(chatProtocol,chatType){
    const chatMessageWrongOption = "Desculpe não entendi a opção desejada, poderia selecionar uma novamente."
    await sendBotMessage(chatProtocol,chatType,chatMessageWrongOption)
}