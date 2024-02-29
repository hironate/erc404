//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC404} from "./ERC404.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC404 is ERC404 {
    using Strings for uint256;

    string public dataURI;
    string public baseTokenURI;

    constructor(address _owner) ERC404("MyERC404", "ME404", 18, 10000, _owner) {
        balanceOf[_owner] = 10000 * 10 ** 18;
    }

    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
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
        if (bytes(baseTokenURI).length > 0) {
            return string.concat(baseTokenURI, Strings.toString(id));
        } else {
            uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(id))));
            string memory image;
            string memory color;

            if (seed <= 100) {
                image = "1.png";
                color = "Purple";
            } else if (seed <= 160) {
                image = "2.png";
                color = "Red";
            } else if (seed <= 210) {
                image = "3.png";
                color = "Green";
            } else if (seed <= 240) {
                image = "4.png";
                color = "Blue";
            } else if (seed <= 255) {
                image = "5.png";
                color = "Orange";
            } else if (seed <= 300) {
                image = "6.png";
                color = "Lavender";
            }

            string memory jsonPreImage = string.concat(
                string.concat(
                    string.concat(
                        '{"name": "My ERC404 #',
                        Strings.toString(id)
                    ),
                    '","description":"A collection of circles enabled by ERC404, an experimental token standard.","external_url":"","image":"'
                ),
                string.concat(dataURI, image)
            );
            string memory jsonPostImage = string.concat(
                '","attributes":[{"trait_type":"Color","value":"',
                color
            );
            string memory jsonPostTraits = '"}]}';

            return
                string.concat(
                    "data:application/json;utf8,",
                    string.concat(
                        string.concat(jsonPreImage, jsonPostImage),
                        jsonPostTraits
                    )
                );
        }
    }
}
