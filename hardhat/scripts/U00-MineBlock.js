const { mine } = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
  // instantly mine 10 blocks
  await mine(10);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })