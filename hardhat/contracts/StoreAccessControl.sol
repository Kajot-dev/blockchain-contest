//SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;
 
contract StoreAccessControl {
 
    address public admin;
    mapping(address=>bool) public isVerifiedStore; //czy adres jest sklepem

    event DateMarkedAsShop(address indexed _storeAddr, string _storeName, uint256 timestamp);
    event PrivlegesMoved(address indexed _from, address indexed _to, uint256 timestamp);
 
    struct Store { //byt sklep (nazwa, adres)
        string sname;
        address saddress;
    }
 
    Store[] public stores; //lista sklepów
    mapping(address => uint8) addrToArrayIndex; //mapowanie po adresie dla funkcji removeUserPrivileges(address _addrToRemove)
    uint8 indexStoreEnumerator; //śledzenie indexu
 
     modifier onlyStoreOwner() {
        require(isVerifiedStore[msg.sender], "Not a store owner - access denied.");
        _;
    }
 
     modifier onlyAdmin() {
        require(msg.sender==admin, "Not an admin - access denied.");
        _;
    }
 
    constructor() {
        admin = msg.sender;
    }
 
    function markUserAsStore(address _storeAddr, string memory _storeName) public onlyAdmin {
        require(!isVerifiedStore[_storeAddr], "This address is already marked as store.");
 
        isVerifiedStore[_storeAddr] = true;
        stores.push(Store({ sname: _storeName, saddress: _storeAddr }));
        emit DateMarkedAsShop(_storeAddr, _storeName, block.timestamp);
        addrToArrayIndex[_storeAddr] = indexStoreEnumerator++;
    }
 
    function removeUserPrivileges(address _addrToRemove) public onlyAdmin {
        require(isVerifiedStore[_addrToRemove], "This address is not a store.");
 
        isVerifiedStore[_addrToRemove] = false;
        stores[addrToArrayIndex[_addrToRemove]] = stores[stores.length - 1]; //przeniesienie elementu na góre stosu
        stores.pop(); //wykluczenie ostatniego elementu z listy
        indexStoreEnumerator--;
    }
 
    function moveAdminPrivileges(address _newAdminAddr) public onlyAdmin {
        require(_newAdminAddr != msg.sender, "You are current admin.");

        emit PrivlegesMoved(admin, _newAdminAddr, block.timestamp);
 
        admin = _newAdminAddr;
    }
 
    function isAddressPrivileged(address _checkAddr) view public returns(bool) {
        return(isVerifiedStore[_checkAddr]);
    }
 
    function numberOfPartneredStores() public view returns (uint8) {
        return (indexStoreEnumerator);
    }
 
}
