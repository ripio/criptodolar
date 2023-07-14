import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Criptodolar", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("Criptodolar");

    const instance = await upgrades.deployProxy(ContractFactory);
    await instance.waitForDeployment();

    expect(await instance.name()).to.equal("Criptodolar");
  });
});
