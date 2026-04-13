// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AIAgent {
    uint256 private _tokenIdCounter;
    address public owner;

    struct BirthCertificate {
        string name;
        string persona;
        uint256 birthTimestamp;
        uint256 experience;
        string vanityNumber;
    }

    mapping(uint256 => BirthCertificate) public birthCertificates;
    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event AgentMinted(uint256 indexed tokenId, string name, string persona);
    event AgentGrew(uint256 indexed tokenId, uint256 newExperience);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mintAgent(
        address to,
        string memory name,
        string memory persona,
        string memory vanityNumber
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        ownerOf[tokenId] = to;
        balanceOf[to]++;

        birthCertificates[tokenId] = BirthCertificate({
            name: name,
            persona: persona,
            birthTimestamp: block.timestamp,
            experience: 0,
            vanityNumber: vanityNumber
        });

        emit Transfer(address(0), to, tokenId);
        emit AgentMinted(tokenId, name, persona);
        return tokenId;
    }

    function growAgent(uint256 tokenId, uint256 interactionPoints) public {
        require(ownerOf[tokenId] == msg.sender || msg.sender == owner, "Not authorized");

        birthCertificates[tokenId].experience += interactionPoints;

        emit AgentGrew(tokenId, birthCertificates[tokenId].experience);
    }

    function getBirthCertificate(uint256 tokenId) public view returns (BirthCertificate memory) {
        return birthCertificates[tokenId];
    }
}