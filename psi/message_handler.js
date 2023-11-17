const wax = new waxjs.WaxJS({ rpcEndpoint: 'http://api.waxsweden.org', tryAutoLogin: false });


  async function login() { 
    try { 
        const userAccount = await wax.login();  
    } catch(e) { 

    } 
} 




const getMineDelay = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getBagMiningParams(bag);
    const land_params = getLandMiningParams(land);
    params.delay *= land_params.delay / 10;
    params.difficulty += land_params.difficulty;
    var minedelay = await getNextMineDelay(
      mining_account,
      account,
      params,
      wax.api.rpc
    );
    return minedelay;
  } catch (error) {
    return error;
  }
};


const getBagDifficulty = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const params = getBagMiningParams(bag);
    return params.difficulty;
  } catch (error) {
    return error;
  }
};

const getLandDifficulty = async function (account) {
  try {
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getLandMiningParams(land);
    return params.difficulty;
  } catch (error) {
    return error;
  }
};

const background_mine = async (account) => {
  return new Promise(async (resolve, reject) => {
  const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);
  findNonce (account, last_mine_tx).then(
      (mine_work) => {
        resolve(mine_work);
      }
    );
  });
};


