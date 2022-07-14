import axios from "axios"

export async function ticketZendesk(idTicket,emailAuthentication){
    let array = []

    const ticket = `https://mobilesaude.zendesk.com/api/v2/tickets/${idTicket}.json`

    function formatDate(date){
        try{
            var data  = date.replace("T","-")
            var dia = data.split("-")[2]
            var mes = data.split("-")[1]
            var ano = data.split("-")[0]
        }
        catch (ex) {
            console.error("outer", ex.message);
          }
        return (dia + '/' + mes + '/' + ano)
        
    }

    async function requestApi(url){
        const response = await axios.get(url, {
            headers: {
            'authorization': 'Basic cmFubmllckBtb2JpbGVzYXVkZS5jb20uYnI6NzIzMDk5UkBubmllcg==',
            'Content-Type': 'application/json'
            }
        })

        return response
    }
    //Verificando nome do Cliente pelo organizationId
    const objTicket = await requestApi(ticket)
    const ticketRequester = objTicket.data.ticket.requester_id
    const organizationId = objTicket.data.ticket.organization_id
    const ticketStatus = objTicket.data.ticket.status
    const ticketCreatedAt = objTicket.data.ticket.created_at
    const ticketUpdatedAt = objTicket.data.ticket.updated_at
    const ticketSubject = objTicket.data.ticket.subject
    const ticketPriority = objTicket.data.ticket.priority
    const ticketAssigneeId = objTicket.data.ticket.assignee_id
    const ticketDataEntrega = objTicket.data.ticket.fields

    
    const requester = `https://mobilesaude.zendesk.com/api/v2/users/${ticketRequester}.json`
    const objRequester = await requestApi(requester)
    if(emailAuthentication == objRequester.data.user.email){
        console.log('Aberto por: ' + objRequester.data.user.email)
        const organization = `https://mobilesaude.zendesk.com/api/v2/organizations/${organizationId}`
        const objOrganization = await requestApi(organization)
        console.log('Cliente: ' + objOrganization.data.organization.name)
        array.push('Cliente: ' + objOrganization.data.organization.name)
    
        const assingnee = `https://mobilesaude.zendesk.com/api/v2/users/${ticketAssigneeId}.json`
        const objAssingnee = await requestApi(assingnee)
        console.log('Atribuído: ' + objAssingnee.data.user.name)
        array.push('Atribuído: ' + objAssingnee.data.user.name)
    
        ticketDataEntrega.map((id) =>{
            if(id.id == '360007234013'){
                var dateDelivery = formatDate(id.value)
                console.log("Previsão de entrega: " + dateDelivery)
                array.push("Previsão de entrega: " + dateDelivery)
            }
        })
    
        console.log('Status: ' + ticketStatus)
        array.push('Status: ' + ticketStatus)
    
        var dateCreatedAt = formatDate(ticketCreatedAt)
        console.log('Data abertura: ' + dateCreatedAt)
        array.push('Data abertura: ' + dateCreatedAt)
    
        var dateUpdatedAt = formatDate(ticketUpdatedAt)
        console.log('Última atualização: ' + dateUpdatedAt)
        array.push('Última atualização: ' + dateUpdatedAt)
    
        console.log('Assunto: ' + ticketSubject)
        array.push('Assunto: ' + ticketSubject)
        console.log('Prioridade: ' + ticketPriority)
        array.push('Prioridade: ' + ticketPriority)
    }
    else if(emailAuthentication != objRequester.data.user.email){
        array.push('Este ticket não foi aberto pela sua conta de email')
        array.push('\nConseguimos ajudar?\n0-Retornar ao Menu\n5-Pesquisar novo Ticket')
    }
    

    

    return array
}