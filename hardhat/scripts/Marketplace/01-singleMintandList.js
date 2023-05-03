const { ethers } = require("hardhat")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {

    const accounts = await ethers.getSigners()
    const [deployer, owner, buyer1] = accounts

    const IDENTITIES = {
        [deployer.address]: "DEPLOYER",
        [owner.address]: "OWNER",
        [buyer1.address]: "BUYER_1",
    }
    const TokenInfo = {
        name: "Test Token",
        symbol: "TNFT",
        uri: "bafybeidrvuwlntcvru7xbt7ndcbin574ktkgrxk3gzywdsdil7ivrasfeu"
    }

    const MarketplaceFactory = await ethers.getContractFactory("Marketplace")
    const MarketplaceContract = await MarketplaceFactory.deploy()
    await MarketplaceContract.deployed()

    const ERC721MinterFactory = await ethers.getContractFactory("ERC721Minter")
    const ERC721Minter = await ERC721MinterFactory.connect(owner).deploy(TokenInfo.name, TokenInfo.symbol)
    await ERC721Minter.deployed()

    console.log(`Minting NFT for ${owner.address}`)
    const mintTx = await ERC721Minter.connect(owner).safeMint(TokenInfo.uri)
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId

    console.log(`Examining minted NFT #${tokenId}`)
    const fullTokenURI = await ERC721Minter.tokenURI(tokenId)
    console.log(`Full URI is: ${fullTokenURI}`)

    console.log("Approving Marketplace as operator of NFT...")
    const approvalTx = await ERC721Minter.connect(owner).approve(MarketplaceContract.address, tokenId)
    await approvalTx.wait(1)

    console.log("Listing NFT...")
    const tx = await MarketplaceContract.connect(owner).listItem(ERC721Minter.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("NFT Listed with token ID: ", tokenId.toString())

    const mintedBy = await ERC721Minter.ownerOf(tokenId)
    console.log(`NFT with ID ${tokenId} minted and listed by owner ${mintedBy} with identity ${IDENTITIES[mintedBy]}.`)
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
