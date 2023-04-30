const { ethers, run } = require("hardhat")

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
    
    const [ admin, nike, adidas ] = await ethers.getSigners()
    const nikeStore = {
      address: await nike.address,
      name: 'Nike',
    }
    const adidasStore = {
      address: await adidas.address,
      name: 'Adidas',
    }
    console.log(nikeStore.address)
    console.log(nikeStore.name)

    //Making nike and adidas a store
    await StoreAccessControl.markUserAsStore(nikeStore.address, nikeStore.name)
    await StoreAccessControl.markUserAsStore(adidasStore.address, adidasStore.name)
    console.log(`There are currently ${await StoreAccessControl.numberOfPartneredStores()} stores.`)

        
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })