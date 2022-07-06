import { sendBotMessage } from './mosiaCaller.js'

export async function typeAttend(){
    const chatMenuOptions = 'Escolha uma das opções:\n1- Abrir chamado;\n2- Consultar chamado aberto;\n3- Consultar documentação técnica;\n4- Encerrar Atendimento'
    try{
      await sendBotMessage(chatProtocol,"message",chatMenuOptions)  
    }
    catch(err){
      console.log(err.message)
    }
}