const { ethers, run } = require("hardhat")

async function main() {
    
    // Deploying StoreAccessControl contract
    const StoreAccessControlFactory = await ethers.getContractFactory("StoreAccessControl")
    console.log("Contract is being deployed..")
    const StoreAccessControl = await StoreAccessControlFactory.deploy()
    await StoreAccessControl.deployed()
    console.log(`Contract was deployed at: ${StoreAccessControl.address}`)
        
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })