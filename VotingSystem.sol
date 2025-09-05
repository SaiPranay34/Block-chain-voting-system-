// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VotingSystem
 * @dev Implements a secure voting system with candidate management
 */
contract VotingSystem {
    // State variables
    address public admin;
    bool public electionActive;
    uint256 public candidateCount;
    uint256 public totalVotes;
    
    // Structs
    struct Candidate {
        uint256 id;
        string name;
        string party;
        uint256 voteCount;
    }
    
    // Mappings
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    
    // Events
    event CandidateAdded(uint256 id, string name, string party);
    event VoteCast(address voter, uint256 candidateId);
    event ElectionStatusChanged(bool active);
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }
    
    modifier activeElection() {
        require(electionActive, "Election is not active");
        _;
    }
    
    modifier canVote() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }
    
    /**
     * @dev Constructor to initialize the contract
     */
    constructor() {
        admin = msg.sender;
        electionActive = true;
    }
    
    /**
     * @dev Add a new candidate to the election
     * @param _name Name of the candidate
     * @param _party Political party of the candidate
     */
    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _party, 0);
        emit CandidateAdded(candidateCount, _name, _party);
    }
    
    /**
     * @dev Cast a vote for a candidate
     * @param _candidateId The ID of the candidate to vote for
     */
    function vote(uint256 _candidateId) public activeElection canVote {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");
        
        // Update vote record
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
    
    /**
     * @dev Toggle the election status (active/inactive)
     */
    function toggleElectionStatus() public onlyAdmin {
        electionActive = !electionActive;
        emit ElectionStatusChanged(electionActive);
    }
    
    /**
     * @dev Get all candidates with their details
     * @return Array of candidates
     */
    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        
        for (uint256 i = 1; i <= candidateCount; i++) {
            allCandidates[i-1] = candidates[i];
        }
        
        return allCandidates;
    }
    
    /**
     * @dev Get details of a specific candidate
     * @param _candidateId The ID of the candidate
     * @return Candidate struct with details
     */
    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID");
        return candidates[_candidateId];
    }
    
    /**
     * @dev Check if a voter has already voted
     * @param _voter Address of the voter
     * @return Boolean indicating if the voter has voted
     */
    function checkVoterStatus(address _voter) public view returns (bool) {
        return hasVoted[_voter];
    }
}