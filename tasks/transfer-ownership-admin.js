const { task } = require("hardhat/config");

task("transfer-ownership-admin", "Setup multisig for proxy contract")
  .addParam("proxyAdmin", "Proxy Admin address")
  .addParam("multiSig", "Multisig address")
  .setAction(async (taskArgs, hre) => {
    let [deployer] = await hre.ethers.getSigners();

    console.log("Transfer ownership of proxyAdmin to multisig...");
    // Get the ProxyAdmin contract instance
    const ProxyAdmin = await hre.upgrades.admin.getInstance();
    const proxyAdmin = ProxyAdmin.attach(taskArgs.proxyAdmin);

    // Call the transferOwnership function on the ProxyAdmin contract
    const proxyOwnerTx = await proxyAdmin
      .connect(deployer)
      .transferOwnership(taskArgs.multiSig);
    await proxyOwnerTx.wait();
    console.log("Ownership of proxyAdmin: ", await proxyAdmin.owner());
  });

module.exports = {};

// npx hardhat --network lachain transfer-ownership-admin --proxy-admin <proxy-admin-address> --multi-sig <multi-sig-address>
