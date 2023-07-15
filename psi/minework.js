const nameToArray = (name) => {
    const sb = new Serialize.SerialBuffer({
        textEncoder: new TextEncoder,
        textDecoder: new TextDecoder
    });

    sb.pushName(name);

    return sb.array;
}
const toHex = (arr) => {
    return Buffer.from(arr).toString('hex')
}
const fromHex = hex => {
    return Uint8Array.from(Buffer.from(hex, 'hex'))
}
const nextArr = (arr) => {
    let i = 7;
    while (arr[i] == 255) {
        arr[i] = 0
        i--
    }
    arr[i]++
}


async function findNonce (account,tx) {
    let last_mine_tx = (tx).slice(0, 16)
    let last_mine_arr = fromHex(last_mine_tx)
    account = nameToArray(account).slice(0, 8)

    let good = false, hash, hex_digest, last
    let nonce = new Uint8Array(8)

    nonce[0] = Math.floor(Math.random() * 200) // To prevent getting to limit of Uint8 in future
    for (let i = 0; i < 8; i++) nonce[i] = Math.floor(Math.random() * 256)
    // Random nonce as start for mining loop

    let combined = new Uint8Array(24)
    combined.set(account)
    combined.set(last_mine_arr, 8)

    while (!good) {
        nextArr(nonce)
        combined.set(nonce, 16)
        hash = createHash('sha256')
        hash.update(combined)
        hex_digest = hash.digest('hex')
        good = hex_digest.substr(0, 4) === '0000'
        if (good){
            last = parseInt(hex_digest.substr(4, 1), 16)
            good &= (last == 0)
        }
    }
    
   return toHex(nonce)
}