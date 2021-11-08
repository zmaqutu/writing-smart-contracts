const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();                    // Get random person to sign the contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');  //this will compile our WavePortal contract
    const waveContract = await waveContractFactory.deploy();                        //create local ethereum network nd deploy contract
    await waveContract.deployed();                                                  //wait for deployment
    console.log("Contract deployed to:", waveContract.address);                     //print contract address

    console.log("Contract deployed by:", owner.address);

    let waveCount;                                                                  //declare variable to store number of waves
    waveCount = await waveContract.getTotalWaves();                                 //get total number of waves
  
    const waveTxn = await waveContract.wave();                                      //create transaction to send a wave
    await waveTxn.wait();                                                           //wait for transaction to be mined

    waveCount = await waveContract.getTotalWaves();                                 //get total number of waves

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();