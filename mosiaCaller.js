import http from "https"
import { botMessageAttendantsOffline } from './chatTypes.js'

export async function sendBotMessage(protocolo,type,message) {
    
    const options = {
      "method": "POST",
      "hostname": "api.mosia.chat",
      "path": `/v1/chatbot/call/${protocolo}/${type}`,
      "headers": {
        "content-type": "application/json",
        "authorization": "tKK3JbgqGY0PW3251ad4d6f01ba41e6da2bca94eff2c57850866fa8d8328c7f32ac6fb9b60a41f2"
      }
    };
    
    var req = await http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", async function (chunk) {
        await chunks.push(chunk);
      });
    
      res.on("end", async function () {
        var body = await Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
  
    if(type == 'transfer'){
        req.write(JSON.stringify({queue: '0001'}));
        req.end();
    }else if(type == 'close'){
        req.write(JSON.stringify({compulsoryClose: false}));
        req.end();
    }
    else{
      await req.write(JSON.stringify({
      message: `${message}`
    }))

    console.log(JSON.stringify(message))

    req.end();
    }

  }