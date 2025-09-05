async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy();

  await votingSystem.waitForDeployment();

  console.log("VotingSystem deployed to:", await votingSystem.getAddress());
  
  // Add initial candidates
  await votingSystem.addCandidate("Alex Johnson", "Progressive Party");
  await votingSystem.addCandidate("Sarah Williams", "Liberty Alliance");
  await votingSystem.addCandidate("Michael Chen", "People's Coalition");
  
  console.log("Added initial candidates");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });