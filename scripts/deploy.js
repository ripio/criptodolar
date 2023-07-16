const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await ethers.provider.getBalance(deployer.address)).toString()
  );

  const Criptodolar = await ethers.getContractFactory("Criptodolar");

  const criptodolar = await upgrades.deployProxy(Criptodolar);
  await criptodolar.waitForDeployment();

  const criptodolarAddress = await criptodolar.getAddress();
  console.log(`Proxy deployed to ${criptodolarAddress}`);

  // get admin and implementation addresses from storage
  const admin = await upgrades.admin.getInstance();
  console.log(`Admin deployed to ${admin.target}`);
  const tokenImplementation = await admin.getProxyImplementation(
    criptodolarAddress
  );
  console.log(`Implementation deployed to ${tokenImplementation}`);

  const toMint = ethers.parseUnits("100", "ether");
  console.log("toMint", toMint.toString());

  await criptodolar.mint(deployer.address, toMint);
  console.log("Token address:", tokenImplementation);
  const balance = await criptodolar.balanceOf(deployer.address);
  console.log("Token balance:", ethers.formatEther(balance.toString()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
