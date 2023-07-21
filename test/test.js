const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Criptodolar", function () {
  let Criptodolar, criptodolar, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2, _] = await ethers.getSigners();
    Criptodolar = await ethers.getContractFactory("Criptodolar");
    criptodolar = await upgrades.deployProxy(Criptodolar, [], {
      initializer: "initialize",
    });
    await criptodolar.waitForDeployment();
  });

  // Contract Deployment
  it("Should deploy successfully", async function () {
    expect(await criptodolar.target).to.exist;
    expect(await criptodolar.name()).to.equal("Criptodolar");
    expect(await criptodolar.symbol()).to.equal("UXD");
    expect(await criptodolar.decimals()).to.equal(18);
    expect(await criptodolar.totalSupply()).to.equal(0);
  });

  // Contract Ownership
  it("Should set correct roles", async function () {
    // get role admin of pauser role
    const DEFAULT_ADMIN_ROLE = await criptodolar.getRoleAdmin(
      ethers.id("PAUSER_ROLE")
    );
    expect(await criptodolar.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be
      .true;
    expect(await criptodolar.hasRole(ethers.id("PAUSER_ROLE"), owner.address))
      .to.be.true;
    expect(await criptodolar.hasRole(ethers.id("MINTER_ROLE"), owner.address))
      .to.be.true;
  });

  // Mint Functionality
  it("Should mint successfully", async function () {
    await criptodolar.mint(addr1.address, 1);
    expect(await criptodolar.balanceOf(addr1.address)).to.equal(1);
  });

  // Only Minter Role can mint
  it("Should prevent minting from non-minter", async function () {
    await expect(criptodolar.connect(addr1).mint(addr1.address, 1)).to.be
      .reverted;
  });

  // Only Pauser Role can pause
  it("Should prevent pausing from non-pauser", async function () {
    await expect(criptodolar.connect(addr1).pause()).to.be.reverted;
    await expect(criptodolar.connect(addr1).unpause()).to.be.reverted;
  });

  // Pause Functionality
  it("Should prevent transfers while paused", async function () {
    await criptodolar.mint(addr1.address, 1);
    await criptodolar.pause();
    await expect(
      criptodolar.connect(addr1).transfer(addr2.address, 1)
    ).to.be.revertedWith("Pausable: paused");
  });

  // Burn Functionality
  it("Should burn successfully", async function () {
    await criptodolar.mint(addr1.address, 2);

    await criptodolar.connect(addr1).burn(1);
    expect(await criptodolar.balanceOf(addr1.address)).to.equal(1);
    expect(await criptodolar.totalSupply()).to.equal(1);
  });

  // Transfer Functionality
  it("Should transfer successfully", async function () {
    await criptodolar.mint(addr1.address, 2);
    await expect(criptodolar.connect(addr1).transfer(addr2.address, 1)).to.emit(
      criptodolar,
      "Transfer",
      [addr1.address, addr2.address, 1]
    );
    expect(await criptodolar.balanceOf(addr1.address)).to.equal(1);
    expect(await criptodolar.balanceOf(addr2.address)).to.equal(1);
  });

  // permit Functionality
  it("Should permit successfully", async function () {
    await criptodolar.mint(addr1.address, 2);
    const deadline = ethers.MaxUint256;

    const nonce = await criptodolar.nonces(addr1.address);
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const domain = {
      name: await criptodolar.name(),
      version: "1",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: criptodolar.target,
    };

    const value = {
      owner: addr1.address,
      spender: addr2.address,
      value: 1,
      nonce,
      deadline,
    };

    const signature = await addr1.signTypedData(domain, types, value);
    const { v, r, s } = ethers.Signature.from(signature);

    await expect(
      criptodolar
        .connect(addr1)
        .permit(addr1.address, addr2.address, 1, deadline, v, r, s)
    ).to.emit(criptodolar, "Approval", [addr1.address, addr2.address, 1]);
    expect(await criptodolar.allowance(addr1.address, addr2.address)).to.equal(
      1
    );

    await expect(
      criptodolar
        .connect(addr1)
        .permit(addr1.address, addr2.address, 1, deadline, v, r, s)
    ).to.be.revertedWith("ERC20Permit: invalid signature");

    await expect(
      criptodolar.connect(addr2).transferFrom(addr1.address, addr2.address, 1)
    ).to.emit(criptodolar, "Transfer", [addr1.address, addr2.address, 1]);
    expect(await criptodolar.balanceOf(addr1.address)).to.equal(1);
    expect(await criptodolar.balanceOf(addr2.address)).to.equal(1);
  });
});
