// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title LeaseContract
/// @notice A simple lease agreement between a landlord and a tenant.
/// @dev Allows the tenant to pay rent and either party to terminate the lease.
contract LeaseContract {
    // The address of the landlord (set at deployment)
    address public landlord;

    // The address of the tenant allowed to pay rent
    address public tenant;

    // The rent amount (in wei) that the tenant must pay each time
    uint public rent;

    // Tracks whether the lease is active (true) or terminated (false)
    bool public isActive;

    /// New: Rent payment event for receipts
    event RentPaid(address indexed tenant, uint256 amount, uint256 timestamp);

    /// @notice Deploys a new LeaseContract
    /// @param _rent The rent amount in wei (e.g., 0.01 ETH = 10000000000000000 wei)
    /// @param _tenant The Ethereum address of the tenant
    constructor(uint _rent, address _tenant) {
        landlord = msg.sender;  // msg.sender is the deployer, who becomes the landlord
        rent = _rent;           // store the agreed rent amount
        tenant = _tenant;       // store the tenant’s address
        isActive = true;        // initialize the lease as active
    }

    /// @notice Pay rent to the landlord
    /// @dev Requires:
    ///   1. Lease is still active
    ///   2. Caller is the tenant
    ///   3. Sent value exactly equals the rent
    function payRent() external payable {
        require(isActive, "Lease is not active");
        require(msg.sender == tenant, "Only tenant can pay rent");
        require(msg.value == rent, "Incorrect rent amount");

        // Transfer the rent payment to the landlord’s address
        payable(landlord).transfer(msg.value);

        /// New - Emit event after successful payment
        emit RentPaid(msg.sender, msg.value, block.timestamp);
    }

    /// @notice Terminate the lease agreement
    /// @dev After termination, no more rent can be paid.
    ///      Only landlord *or* tenant may call this.
    function terminate() public {
        require(
            msg.sender == landlord || msg.sender == tenant,
            "Only landlord or tenant can terminate"
        );
        isActive = false;  // mark the lease as terminated
    }
}
