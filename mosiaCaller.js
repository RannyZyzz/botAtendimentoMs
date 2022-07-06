export async function sendBotMessage(protocolo,type,message) {
    var http = require("https");
    
    const options = {
      "method": "POST",
      "hostname": "api.mosia.chat",
      "path": `/v1/chatbot/call/${protocolo}/${type}`,
      "headers": {
        "content-type": "application/json",
        "authorization": "tKKKs5P9L36ZvJg51ad4d6f01ba41e6da2bca94eff2c578475cf2994c71c7db9863532822dd90b0"
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
    }else{
      await req.write(JSON.stringify({
      message: `${message}`
    }));
    req.end();
    }

  }