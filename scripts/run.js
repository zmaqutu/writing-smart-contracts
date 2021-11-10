const main = async () => {
    //const [owner, randomPerson] = await hre.ethers.getSigners();                    // Get random person to sign the contract
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');  //this will compile our WavePortal contract
    //const waveContract = await waveContractFactory.deploy();                        //create local ethereum network nd deploy contract
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();                                                  //wait for deployment
    
    //console.log("Contract deployed to:", waveContract.address);                     //print contract address

    console.log('Contract addy: ', waveContract.address);
    //console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
    
    //let waveCount;                                                                  //declare variable to store number of waves
    //waveCount = await waveContract.getTotalWaves();                                 //get total number of waves
  
    //console.log(waveCount.toNumber());
    
    //semd a wave to the contract
    let waveTxn = await waveContract.wave('Yo this is my sample message');                                      //create transaction to send a wave
    await waveTxn.wait();                                                           //wait for transaction to be mined

    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
    );
    
    //const [_, randomPerson] = await hre.ethers.getSigners();                    // Get random person to sign the contract
    
    //waveCount = await waveContract.getTotalWaves();                                 //get total number of waves

    //waveTxn = await waveContract.connect(randomPerson).wave('Another message from a random');
    //await waveTxn.wait();

    //waveCount = await waveContract.getTotalWaves();
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

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