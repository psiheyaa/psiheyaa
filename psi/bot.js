class bot{

  constructor() {
    this.isBotRunning = false;
    this.timerDelayCpu = 180000;
    // this.checkMinedelay = false;
    this.firstMine = true;
    this.previousMineDone = false;
    this.interval;
  }

delay = (millis) =>
  new Promise((resolve, reject) =>  {
    setTimeout((_) => resolve(), millis);
  });

isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
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
  const RandomTimeWait = 5000 + Math.floor(1000 + (Math.random() * 15000))
  await this.delay(this.timerDelayCpu + RandomTimeWait );
  
 
  
  while (true) {
    let minedelay = 0

    if(document.getElementById("auto-claimnfts").checked == true){
      minedelay = await getMineDelay(wax.userAccount);
      const RandomTimeWait = 5000 + Math.floor(1000 + (Math.random() * 15000))
      // let date = new Date();
      // document.getElementById('response').innerHTML = (`${date.getHours()}:${date.getMinutes()} Mine cd is ${ (minedelay/60/1000).toFixed(1) }`)
      await this.delay(minedelay+RandomTimeWait);
    }
   
    await this.mine()
    const RandomTimeWait = 5000 + Math.floor(1000 + (Math.random() * 15000))
    await this.delay(this.timerDelayCpu + RandomTimeWait );
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
    //console.log(result)
    // let date = new Date()
      // document.getElementById('response').innerHTML  =  (` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Delay ${Math.ceil((this.timerDelayCpu / 1000)/60)} min`)  
      
        
}

  async getNonce(){
    let nonce = '';
    const mine_work = await background_mine(wax.userAccount)
    nonce = mine_work
    return nonce;
  }

  

  

}