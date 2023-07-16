const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await ethers.provider.getBalance(deployer.address)).toString()
  );

  const ContractFactory = await ethers.getContractFactory("Criptodolar");

  const instance = await upgrades.deployProxy(ContractFactory);
  await instance.waitForDeployment();

  console.log(`Proxy deployed to ${await instance.getAddress()}`);

  const toMint = ethers.parseUnits("100", "ether");
  console.log("toMint", toMint.toString());

  await instance.mint(deployer.address, toMint);
  console.log("Token address:", await instance.getAddress());
  const balance = await instance.balanceOf(deployer.address);
  console.log("Token balance:", ethers.formatEther(balance.toString()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
