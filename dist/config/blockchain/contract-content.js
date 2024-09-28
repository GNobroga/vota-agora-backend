"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const CONTRACT = `
    // SPDX-License-Identifier: MIT 
    pragma solidity ^0.8.0;


    interface IERC20 {
        event Transfer(address  from_, address to_, uint256 value_);
        function totalSupply() external view returns(uint256);
        function balanceOf(address owner_) external view returns(uint256);
        function transfer(address recipient_, uint256 amount_) external returns(bool);
    }

    contract GLTToken is IERC20 {
        
        string private _name;
        string private _symbol;
        uint256 private _totalSupply;

        mapping(address => uint256) private _balances;

        mapping(string => mapping(address => bool)) private _hasVoted;

        constructor(uint256 initialSupply) {
            _mint(msg.sender, initialSupply);
            _name = "Gabriel Livia Token";
            _symbol = "GLT";
        }
        
        modifier checkBalance(uint256 balance_, uint256 amount_) {
            require(balance_ > 0 && balance_ >= amount_, "Saldo insuficiente");
            _;
        }

        function _mint(address account_, uint256 amount_) internal {
            _totalSupply += amount_;
            _balances[account_] += amount_; 
            emit Transfer(address(0), account_, amount_);
        }


       function castVote(string memory publicConsultationId_) public returns (bool) {
            require(!_hasVoted[publicConsultationId_][msg.sender], "Voce ja votou nesta consulta");
            
            _hasVoted[publicConsultationId_][msg.sender] = true;
    
            return true;
        }


        function name() public view returns(string memory) {
            return _name;
        }

        function symbol() public view returns(string memory) {
            return _symbol;
        }

        function totalSupply() public view override returns(uint256) {
            return _totalSupply;
        }

        function decimals() public pure returns(uint8) {
            return 18;
        }

        function balanceOf(address owner_) public view override returns(uint256) {
            return _balances[owner_];
        }

        function transfer(address recipient, uint256 amount) public override returns(bool) {
            _transfer(msg.sender, recipient, amount);
            return true;
        }

        function _transfer(address sender, address recipient, uint256 amount) internal checkBalance(_balances[sender], amount) {
            _balances[sender] -= amount;
            _balances[recipient] += amount;
            emit Transfer(sender, recipient, amount);
        }
    }
`;
const _default = CONTRACT;

//# sourceMappingURL=contract-content.js.map