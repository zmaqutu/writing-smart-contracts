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
    
    
    let waveTxn = await waveContract.wave('Yo this is my first wave message');                                      //create transaction to send a wave
    await waveTxn.wait();                                                           //wait for transaction to be mined

    const waveTxn2 = await waveContract.wave('This is wave #2');
    await waveTxn2.wait();
    /*
    * Get Contract balance to see what happened!
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
    );
    
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