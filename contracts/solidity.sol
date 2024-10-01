// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedVault {
    struct File {
        string cid;
        address owner;
    }

    mapping(uint256 => File) public files;
    mapping(uint256 => mapping(address => bool)) public accessPermissions;

    uint256 public fileCounter;

    function addFile(string memory _cid) public {
        files[fileCounter] = File(_cid, msg.sender);
        accessPermissions[fileCounter][msg.sender] = true; // Owner gets access
        fileCounter++;
    }

    function grantAccess(uint256 _fileId, address _user) public {
        require(files[_fileId].owner == msg.sender, "Only owner can grant access");
        accessPermissions[_fileId][_user] = true;
    }

    function revokeAccess(uint256 _fileId, address _user) public {
        require(files[_fileId].owner == msg.sender, "Only owner can revoke access");
        accessPermissions[_fileId][_user] = false;
    }

    function getFile(uint256 _fileId) public view returns (string memory) {
        require(accessPermissions[_fileId][msg.sender], "Access denied");
        return files[_fileId].cid;
    }
}
