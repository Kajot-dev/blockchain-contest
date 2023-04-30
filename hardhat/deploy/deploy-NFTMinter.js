const { ethers, run } = require("hardhat")

async function main() {
  
  // Deploying NFT contract

   const TokenInfo = {
    name: "Test Token",
    symbol: "TNFT",
  }
    const ERC721MinterFactory = await ethers.getContractFactory("ERC721Minter")
    console.log("Contract is being deployed..")
    const ERC721Minter = await ERC721MinterFactory.deploy(TokenInfo.name, TokenInfo.symbol)
    await ERC721Minter.deployed()
    console.log(`Contract was deployed at: ${ERC721Minter.address}`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
})