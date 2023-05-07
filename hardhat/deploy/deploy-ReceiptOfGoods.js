const { ethers, run } = require("hardhat")

async function main() {
  
  // Deploying NFT contract

   const TokenInfo = {
    name: "Test Token",
    symbol: "TNFT",
  }
    const ReceiptOfGoodsFactory = await ethers.getContractFactory("ReceiptOfGoods")
    console.log("Contract is being deployed..")
    const ReceiptOfGoods = await ReceiptOfGoodsFactory.deploy(TokenInfo.name, TokenInfo.symbol)
    await ReceiptOfGoods.deployed()
    console.log(`Contract was deployed at: ${ReceiptOfGoods.address}`)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
})