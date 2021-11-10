const main = async () => {
  //   const [deployer] = await hre.ethers.getSigners();                   // Get the signer address
  //   const accountBalance = await deployer.getBalance();                 // Get the balance of the account the signer is using
  
  //   console.log('Deploying contracts with account: ', deployer.address);
  //   console.log('Account balance: ', accountBalance.toString());
  
  //   const Token = await hre.ethers.getContractFactory('WavePortal');
  //   const portal = await Token.deploy();
  //   await portal.deployed();
  
  //   console.log('WavePortal address: ', portal.address);
  // };
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  });

  await waveContract.deployed();

  console.log('WavePortal address: ', waveContract.address);
};
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();