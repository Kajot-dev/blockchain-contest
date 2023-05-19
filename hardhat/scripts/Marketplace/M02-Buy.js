const { ethers, getNamedAccounts } = require("hardhat")

async function buyItem() {

    const Marketplace = await ethers.getContract("Marketplace")

    const { normalUser, nikeRetailer } = await getNamedAccounts()
    const customer = await ethers.getSigner(normalUser) // Comment if does not insert the signer
    const seller = await ethers.getSigner(nikeRetailer)
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

    console.log("Checking seller balance after purchase...")
    const nikeBalance = await Marketplace.connect(seller).getMyBalance()
    console.log(nikeBalance)

}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })