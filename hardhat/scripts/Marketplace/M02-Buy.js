const { ethers, getNamedAccounts } = require("hardhat")

async function buyItem() {

    const Marketplace = await ethers.getContract("Marketplace")

    const { normalUser, nikeRetailer, rolexRetailer, ticketRetailer, coinTrader } = await getNamedAccounts();
    const customer = await ethers.getSigner(normalUser) // Comment if does not insert the signer
    const sellerNike = await ethers.getSigner(nikeRetailer)
    const sellerRolex = await ethers.getSigner(rolexRetailer);
    const sellerTicket = await ethers.getSigner(ticketRetailer)
    const sellerCoin = await ethers.getSigner(coinTrader)
    const signers = [sellerNike, sellerRolex, sellerTicket, sellerCoin]
    const listingsTotal = await Marketplace.getTotalListings()

    for (let i = 1; i <= listingsTotal; i++) {

        const currentListing = await Marketplace.getListingById(i)
        const cPrice = currentListing.price.toString()
        const cTime = currentListing.time.toString()

        console.log(`Trying to buy listing #${i}. Price: ${cPrice} Timeleft: ${cTime}`)

        try {
            const tx = await Marketplace.connect(customer).buyItem(i, { value: cPrice })
            await tx.wait(1)
            console.log(`Item #${i} bought!`)
        } catch(e) {
            console.log(`Failed to buy item #${i}`)
        }
        
    }

    console.log("Confirming ownership...")
    const ownedNFTs = await Marketplace.connect(customer).fetchMyPurchasedItems()
    console.log(ownedNFTs)

    console.log("Checking sellers balance after purchase...")

    for (let i = 0; i < signers.length; i++) {
        const sellerBalance = await Marketplace.connect(signers[i]).getMyBalance()
        console.log(sellerBalance)
    }

}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })