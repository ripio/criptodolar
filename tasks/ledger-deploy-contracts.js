task(
  "ledger-deploy-contracts",
  "Deploys contracts with ledger",
  async (_, hre) => {
    const ledgerAccount = hre.network.config.ledgerAccounts[0];
    const deployer = await hre.ethers.getSigner(ledgerAccount);

    // if hardhat network, fund ledger account
    if (hre.network.name === "hardhat") {
      const [account] = await hre.ethers.getSigners();
      await account.sendTransaction({
        to: deployer.address,
        value: ethers.parseUnits("1", "ether"),
      });
    }

    console.log("Deploying contracts with the account:", deployer.address);
    console.log(
      "Account balance:",
      (await ethers.provider.getBalance(deployer.address)).toString()
    );

    const Criptodolar = await ethers.getContractFactory(
      "Criptodolar",
      deployer
    );

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

    //Minting tokens
    const toMint = ethers.parseUnits("100", "ether");
    console.log("toMint", toMint.toString());

    await criptodolar.connect(deployer).mint(deployer.address, toMint);
    console.log("Token address:", tokenImplementation);
    const balance = await criptodolar.balanceOf(deployer.address);
    console.log("Token balance:", ethers.formatEther(balance.toString()));
  }
);
