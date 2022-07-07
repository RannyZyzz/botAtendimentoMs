import { sendBotMessage } from './mosiaCaller.js'
import { requestGs } from './googleSheets.js'

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
  await sendBotMessage(chatProtocol,'message',`ATENÇÃO!\nImplementamos um pequeno healthchecks das aplicações da Mobile Saúde, verifique abaixo o status de nossos serviços e aplicações.\n\n${result}`)
  
  //menu de help
  await botOptionHelper(chatProtocol)
}

export async function botOption2(chatProtocol){
  await sendBotMessage(chatProtocol,'message','ATENÇÃO!\nEstamos implementando a funcionalidade para abrir chamados diretamente pelo MosiaChat'+
    '\n\nAté lá, acesse este link e abra seu ticket.\nhttps://mobilesaude.zendesk.com/hc/pt-br/requests/new')
  
    //menu de help
  await botOptionHelper(chatProtocol)
}

export async function botOption3(chatProtocol){
  await sendBotMessage(chatProtocol,'message','Só um momento iremos direcionar para um de nossos Atendentes').then(
    await sendBotMessage(chatProtocol,"transfer")
  )
}

export async function botOption4(chatProtocol){
    await sendBotMessage(chatProtocol,'close','message')
}

export async function botWrongOption(chatProtocol){
    const chatMessageWrongOption = "Desculpe não entendi a opção desejada, poderia selecionar uma novamente."
    await sendBotMessage(chatProtocol,'message',chatMessageWrongOption)
    
    //envio menu opcoes
    await typeAttend(chatProtocol)
}

export async function botOptionHelper(chatProtocol){
    const chatMessageHelper = ('Conseguimos ajudar?\n0-Retornar ao Menu\n4-Encerrar atendimento')
    await sendBotMessage(chatProtocol,'message',chatMessageHelper)
}