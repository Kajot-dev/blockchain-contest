const { ethers, getNamedAccounts } = require("hardhat")
require('dotenv').config();

async function main() {

    const StoreAccessControl = await ethers.getContract("StoreAccessControl")
    
    const { nikeRetailer, rolexRetailer } = await getNamedAccounts()

    const nikeStore = {
      address: await nikeRetailer,
      name: 'Nike',
    }
    
    const rolexStore = {
      address: await rolexRetailer,
      name: 'Rolex',
    }

    await StoreAccessControl.markUserAsStore(nikeStore.address, nikeStore.name)
    await StoreAccessControl.markUserAsStore(rolexStore.address, rolexStore.name)

    console.log(`Veryfing input...`)

    const infoAboutStoreOne = await StoreAccessControl.getStoreByIndex(0)
    const infoAboutStoreTwo = await  StoreAccessControl.getStoreByIndex(1)

    console.log(infoAboutStoreOne)
    console.log(infoAboutStoreTwo)

        
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })