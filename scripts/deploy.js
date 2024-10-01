// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners(); // Get the deployer's wallet

    console.log("Deploying contracts with the account:", deployer.address);

    const Vault = await ethers.getContractFactory("DecentralizedVault"); // Change to your contract's name
    const vault = await Vault.deploy(); // Deploy the contract

    console.log("Decentralized Vault deployed to:", vault.address); // Output the contract address
}

// Call the main function and catch any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
