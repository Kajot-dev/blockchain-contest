const { ethers, getNamedAccounts } = require("hardhat")
require('dotenv').config();

async function main() {

    const StoreAccessControl = await ethers.getContract("StoreAccessControl")
    
    const { nikeRetailer, rolexRetailer, ticketRetailer, coinTrader } = await getNamedAccounts()

    const nikeStore = {
      address: await nikeRetailer,
      name: 'Nike',
    }
    
    const rolexStore = {
      address: await rolexRetailer,
      name: 'Rolex',
    }

    const ticketStore = {
      address: await ticketRetailer,
      name: 'Ticketmaster',
    }

    const coinStore = {
      address: await coinTrader,
      name: 'Coin Afficionado'
    }

    const storeList = [nikeStore, rolexStore, ticketStore, coinStore];

    console.log(`Adding privileges to every store.`)

    for(let i=0;i<storeList.length; i++) {
      tx = await StoreAccessControl.markUserAsStore(storeList[i].address, storeList[i].name)
    }

    console.log(`Veryfing input...`)

    for(let i=0;i<storeList.length; i++) {
      txSearch = await StoreAccessControl.getStoreByIndex(i)
 
      console.log(txSearch)
    }

        
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })