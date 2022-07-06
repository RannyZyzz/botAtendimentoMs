import { sendBotMessage } from './mosiaCaller.js'

export async function typeAttend(chatProtocol){
    const chatMenuOptions = 'Escolha uma das opções:\n1- Abrir chamado;\n2- Consultar chamado aberto;\n3- Consultar documentação técnica;\n4- Encerrar Atendimento'
    try{
      await sendBotMessage(chatProtocol,"message",chatMenuOptions)  
    }
    catch(err){
      console.log(err.message)
    }
}

export async function botOption1(chatProtocol){
    const chatMessageOption1 = 'Acesse este link e abra seu ticket.\nhttps://mobilesaude.zendesk.com/hc/pt-br/requests/new'
    await sendBotMessage(chatProtocol,'message',chatMessageOption1)
}