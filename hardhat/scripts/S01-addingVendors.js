const { ethers, run } = require("hardhat")
require('dotenv').config();

async function main() {
    
    //deployment
    const StoreAccessControlFactory = await ethers.getContractFactory("StoreAccessControl")
    console.log("Contract is being deployed..")
    const StoreAccessControl = await StoreAccessControlFactory.deploy()
    await StoreAccessControl.deployed()
    console.log(`Contract was deployed at: ${StoreAccessControl.address}`)
    
    //contract interactions
    const currentStoresAmount = await StoreAccessControl.numberOfPartneredStores()
    console.log(`There are currently ${currentStoresAmount} stores.`)
    
    let nike = await ethers.getSigner(process.env.NIKE_SHOP_PUB) // Account: 0
    let rolex = await ethers.getSigner(process.env.ROLEX_SHOP_PUB) //Account: 1

    const nikeStore = {
      address: await nike.address,
      name: 'Nike',
    }
    const rolexStore = {
      address: await rolex.address,
      name: 'Rolex',
    }
    console.log(nikeStore.address)
    console.log(rolexStore.address)

    await StoreAccessControl.markUserAsStore(nikeStore.address, nikeStore.name)
    await StoreAccessControl.markUserAsStore(rolexStore.address, rolexStore.name)
    console.log(`There are currently ${await StoreAccessControl.numberOfPartneredStores()} stores.`)
    
    const storeCheck = await StoreAccessControl.isAddressPrivileged(nikeStore.address)
    console.log(storeCheck)

        
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })