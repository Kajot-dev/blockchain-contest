const { ethers } = require("hardhat")

const NFT_ADDRESS = x;
const TOKEN_ID = 0
// spalenie nft przez uzytkownika
// jakiego rodzaju token zostal spalony, jakiego producenta(addres i po nim wyszukanie nazwy) jakie id, model etc
// przyznanie e paragonu

async function getProduct() {
    const accounts = await ethers.getSigners()
    const [deployer, owner, customer] = accounts
    const IDENTITIES = {
        [deployer.address]: "DEPLOYER",
        [owner.address]: "OWNER",  //wywalic jednego?
        [customer.address]: "CUSTOMER"
    }

    const receiptOfGoods = await ethers.getContract("ReceiptOfGoods");
    const tx = await receiptOfGoods
        .connect(customer)
        .passNFTToBurn(NFT_ADDRESS, TOKEN_ID) //nftAddres tokenId
    await tx.wait(1)

    

}




getProduct()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })