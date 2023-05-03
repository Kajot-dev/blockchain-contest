const { ethers, run } = require("hardhat")

async function main() {

    const TokenInfo = {
        name: "Test Token",
        symbol: "TNFT",
    }
    
    const StoreAccessControlFactory = await ethers.getContractFactory("StoreAccessControl")
    const StoreAccessControl = await StoreAccessControlFactory.deploy()
    await StoreAccessControl.deployed()

    const MarketplaceFactory = await ethers.getContractFactory("Marketplace")
    const Marketplace = await MarketplaceFactory.deploy()
    await Marketplace.deployed()

    const ERC721MinterFactory = await ethers.getContractFactory("ERC721Minter")
    const ERC721Minter = await ERC721MinterFactory.deploy(TokenInfo.name, TokenInfo.symbol)
    await ERC721Minter.deployed()


    console.log(`Store Access Control contract was deployed at: ${StoreAccessControl.address}`)
    console.log(`Marketplace contract was deployed at: ${Marketplace.address}`)
    console.log(`NFT contract was deployed at: ${ERC721Minter.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
})