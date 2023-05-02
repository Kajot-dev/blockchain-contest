//SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;

error notStoreOwner();
error notAnAdmin();
error addressAlreadyMarkedAsStore();
error addresIsNotAStore();
error youAreCurrentAdmin();
 
contract StoreAccessControl {
 
    address public admin;

    /// @notice a map showing whether a given address is a store
    mapping(address=>bool) public isVerifiedStore;

    event DateMarkedAsShop(address indexed _storeAddr, string _storeName, uint256 timestamp);
    event PrivlegesMoved(address indexed _from, address indexed _to, uint256 timestamp);
    
    /// @notice store entity
    struct Store {
        string sname;
        address saddress;
    }
    
    /// @notice Stores list 
    Store[] public stores; //lista sklepów

    /// @notice assigning indexes to addresses
    mapping(address => uint8) addrToArrayIndex; 

    /// @notice current store index enumerator number
    uint8 indexStoreEnumerator;
 
     modifier onlyStoreOwner() {
        //require(isVerifiedStore[msg.sender], "Not a store owner - access denied.");
        if(isVerifiedStore[msg.sender]) {
            _;
        } else {
            revert notStoreOwner();     
        }
        
    }
 
     modifier onlyAdmin() {
        //require(msg.sender==admin, "Not an admin - access denied.");
        if(msg.sender!=admin) {
            _;
        } else {
            revert notAnAdmin();
        }
    }
 
    constructor() {
        admin = msg.sender;
    }
 
    /** @notice Method for marking user as a store
     * @param _storeAddr Address of store
     * @param _storeName Name of store
     */
    function markUserAsStore(address _storeAddr, string memory _storeName) public onlyAdmin {
        if(!isVerifiedStore[_storeAddr]) {
            isVerifiedStore[_storeAddr] = true;
            stores.push(Store({ sname: _storeName, saddress: _storeAddr }));
            emit DateMarkedAsShop(_storeAddr, _storeName, block.timestamp);
            addrToArrayIndex[_storeAddr] = indexStoreEnumerator++;
        } else {
            revert addressAlreadyMarkedAsStore();
        }
    }
    
    /** @notice Method for removing users privileges
     * @dev the selected address is moved to the top of the stores array
    and is removed from there in the next step
     * @param _addrToRemove Address to deprivation of store privileges
     */
    function removeUserPrivileges(address _addrToRemove) public onlyAdmin {
        if(isVerifiedStore[_addrToRemove]) {
            isVerifiedStore[_addrToRemove] = false;
            stores[addrToArrayIndex[_addrToRemove]] = stores[stores.length - 1]; //przeniesienie elementu na góre stosu
            stores.pop(); //wykluczenie ostatniego elementu z listy
            indexStoreEnumerator--;
        } else {
            revert addresIsNotAStore();
        }
 
        
    }
    
    /** @notice Method to change privileges owner
     * @param _newAdminAddr Address of new privileges owner
     */
    function moveAdminPrivileges(address _newAdminAddr) public onlyAdmin {
        //require(_newAdminAddr != msg.sender, "You are current admin.");
        if(_newAdminAddr != msg.sender) {
            emit PrivlegesMoved(admin, _newAdminAddr, block.timestamp);
 
            admin = _newAdminAddr;
        } else {
            revert youAreCurrentAdmin();
        }

        
    }
    
    /** @notice Method to check if an address has store privileges
     * @param _checkAddr Address to check
     * @return true if address has store privileges
     */
    function isAddressPrivileged(address _checkAddr) view public returns(bool) {
        return(isVerifiedStore[_checkAddr]);
    }
 
    /** @notice Method to check number of stores 
     * @return number of stores
     */
    function numberOfPartneredStores() public view returns (uint8) {
        return (indexStoreEnumerator);
    }
 
}
