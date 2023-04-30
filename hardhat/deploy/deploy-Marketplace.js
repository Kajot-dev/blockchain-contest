const { ethers, run } = require("hardhat")

async function main() {
  
  // Deploying Marketplace contract
    const MarketplaceFactory = await ethers.getContractFactory("Marketplace")
    console.log("Contract is being deployed..")
    const Marketplace = await MarketplaceFactory.deploy()
    await Marketplace.deployed()
    console.log(`Contract was deployed at: ${Marketplace.address}`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
})