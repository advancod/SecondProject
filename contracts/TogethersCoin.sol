// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TogethersCoin is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX = 1000 * 10 ** 18;
    address public escrow;

    constructor(uint256 initialSupply) ERC20("TogethersCoin", "TGC") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function setEscrow(address _escrow) external onlyOwner {
        escrow = _escrow;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function mintExternal(address customer) external returns (bool) {
        require(msg.sender == escrow, "TogethersCoin: caller is not escrow");
        _mint(owner(), MAX);
        _mint(customer, MAX);
        return true;
    }

    function burnExternal(address account, uint256 value) external returns (bool) {
        require(msg.sender == escrow, "TogethersCoin: caller is not escrow");
        _burn(account, value);
        return true;
    }
}
