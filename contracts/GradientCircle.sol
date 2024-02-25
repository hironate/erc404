//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC404} from "./ERC404.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract GradientCircle is ERC404 {
    using Strings for uint256;

    uint256 public immutable ERC721_SUPPLY = 10000;
    string public baseTokenURI;

    error NonExistentToken();

    constructor(
        address _contractOwner,
        address _initialTokenOwner
    ) ERC404("GradientCircle", "GC", 18, ERC721_SUPPLY, _contractOwner) {
        balanceOf[_initialTokenOwner] = ERC721_SUPPLY * 10 ** 18;
    }

    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, id.toString(), ".json"));
    }
}
