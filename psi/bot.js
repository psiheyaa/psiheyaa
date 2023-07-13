class bot{

  constructor() {
    this.isBotRunning = false;
    this.alertCaptcha = false;
    this.checkCpuPercent = 90;
    this.timerDelay = 810000;
    this.timerDelayCpu = 180000;
    this.checkMinedelay = false;
    this.firstMine = true;
    this.previousMineDone = false;
    this.df = 10;
    // this.serverGetNonce = 'alien';
    this.interval;
    
    
}

delay = (millis) =>
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });

isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

async postData(url = '', data = {}, method = 'POST',header = {'Content-Type': 'application/json'},returnMode = 'json') {
  try {
    // Object.assign(header,{'pragma':'no-cache' ,'cache-control':'no-cache'})
    const init = (method == 'POST') ? {method: method,mode: 'cors', cache: 'no-cache',credentials: 'same-origin',headers: header,redirect: 'follow',referrerPolicy: 'no-referrer',body: JSON.stringify(data)} : {method: method,mode: 'cors', cache: 'no-cache',credentials: 'same-origin',headers: header,redirect: 'follow',referrerPolicy: 'no-referrer'}
    if(returnMode == 'json'){
      const response = await fetch(url, init);
      return response.json(); // parses JSON response into native JavaScript objects
    }else{
      const response = await fetch(url, init).then(function(response) {
          if(response.ok)
          {
            return response.text(); 
          }
    
          throw new Error('Something went wrong.');
      })  
      .then(function(text) {
        console.log('Request successful', text);
        return text;
      })  
      .catch(function(error) {
        console.log('Request failed', error);
        return '';
      });

      return response
    }
  }catch (err) {
    this.appendMessage(`Error:${err.message}`)
    //send bypass line notify
    if(this.lineToken !== ''){
      await this.postData(this.lineBypassUrl, { token: this.lineToken, message:`Fetch:error, User:${userAccount}, Message:${err.message}` })
    }
    return false;
  }
}







async start() {
  const userAccount = await wax.login();
  document.getElementById("text-user").innerHTML = userAccount
  document.getElementsByTagName('title')[0].text = userAccount
  const cpuTimer = parseFloat(document.getElementById("cpu-timer").value) 
  bott.timerDelayCpu = (cpuTimer * 60) * 1000;
    
    

  

  await this.delay(2000);
  console.log("bot StartBot");
  document.getElementById('response').innerHTML = 'bot started'
  await this.mine()
  
 
  
  while (true) {
    let minedelay = 0

    if(document.getElementById("auto-claimnfts").checked == true){
      minedelay = await getMineDelay(wax.userAccount);
      const RandomTimeWait = 5000 + Math.floor(1000 + (Math.random() * 15000))
      // this.appendMessage(`Cooldown for ${minedelay/60/1000}`)
      let date = new Date();
      // boxMessage.value = (`${date.getHours}:${date.getMinutes} Mine cd is ${minedelay/60/1000}`)
      document.getElementById('response').innerHTML = (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Mine cd is ${ (minedelay/60/1000).toFixed(1) }`)
      await this.delay(minedelay+RandomTimeWait);



    }
   // do {
      // if(this.timerDelay != 0){
      //   if(this.checkMinedelay){
      //     minedelay = await getMineDelay(wax.userAccount);
      //   }
      // }else{
      //   minedelay = await getMineDelay(wax.userAccount);
      // }
      // console.log(`%c[Bot] Cooldown for ${Math.ceil((minedelay / 1000)/60)} min`, 'color:green');      
      //const RandomTimeWait = minedelay + Math.floor(1000 + (Math.random() * 9000))
      
     // this.appendMessage(`Cooldown for ${Math.ceil((RandomTimeWait / 1000)/60)} min`)
     // await this.delay(RandomTimeWait);
     //  minedelay = 0;      
   // } while (minedelay !== 0 && (this.previousMineDone || this.firstMine));
    await this.mine()
  }
}

async mine(){
 

    const nonce = await this.getNonce()
    let actions = [
      {
        account: "m.federation",
        name: "mine",
        authorization: [
          {
            actor: wax.userAccount,
            permission: "active",
          },
        ],
        data: {
          miner: wax.userAccount,
          nonce: nonce,
        },
      },
    ];
    
   
      
      
      
      const result = wax.api.transact({actions},{blocksBehind: 3,expireSeconds: 90});
      //console.log(`%c[Bot] result is = ${result}`, 'color:green');
      
      
        
        // this.firstMine = false;
        // this.previousMineDone = true;
        // this.checkMinedelay = true;
        // this.appendMessage(`Delay  min ${Math.ceil((this.timerDelayCpu / 1000)/60)} min`)
        let date = new Date()
        
        document.getElementById('response').innerHTML  =  (` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Delay ${Math.ceil((this.timerDelayCpu / 1000)/60)} min`)  
        await this.delay(this.timerDelayCpu );
        

      
    
    
    
}

  async getNonce(){
    let nonce = '';
    let message = ''
    const mine_work = await background_mine(wax.userAccount, bot.df)
      nonce = mine_work
     // console.log('nonce-alien',nonce)
  //     message = 'Alien: ' + nonce
    
  // this.appendMessage(`${message}`)
    return nonce;
  }

  

  

}