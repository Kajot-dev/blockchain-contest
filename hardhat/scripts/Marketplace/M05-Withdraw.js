const { ethers, getNamedAccounts } = require("hardhat")

async function withdraw() {

    const { nikeRetailer } = await getNamedAccounts()
    const seller = await ethers.getSigner(nikeRetailer)

    const Marketplace = await ethers.getContract("Marketplace")
    const CustomIPFSNFT = await ethers.getContract("CustomIPFSNFT")

    console.log("Seller balance before: ")
    const nikeBalance = await Marketplace.connect(seller).getMyBalance()
    console.log(nikeBalance)

    console.log("Withdrawing..")
    await Marketplace.connect(seller).withdraw()

    console.log("Seller balance after: ")
    const afterBalance = await Marketplace.connect(seller).getMyBalance()
    console.log(afterBalance)


}

withdraw()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })