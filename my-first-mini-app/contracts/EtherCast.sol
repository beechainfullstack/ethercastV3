// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title EtherCast - Minimal on-chain ledger of affirmations
/// @notice Stores a hash of an affirmation and lightweight metadata.
contract EtherCast {
    struct Affirmation {
        address from;
        address to;
        bytes32 contentHash; // e.g. keccak256 of the affirmation text
        string tag;          // short category like "#gratitude"
        uint256 timestamp;
    }

    Affirmation[] private _affirmations;

    event AffirmationCast(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        bytes32 contentHash,
        string tag,
        uint256 timestamp
    );

    /// @dev Cast an affirmation. The contract does not see the plaintext, only the hash.
    function castAffirmation(
        address to,
        bytes32 contentHash,
        string calldata tag
    ) external returns (uint256 id) {
        id = _affirmations.length;
        _affirmations.push(
            Affirmation({
                from: msg.sender,
                to: to,
                contentHash: contentHash,
                tag: tag,
                timestamp: block.timestamp
            })
        );

        emit AffirmationCast(id, msg.sender, to, contentHash, tag, block.timestamp);
    }

    function getAffirmation(uint256 id) external view returns (Affirmation memory) {
        require(id < _affirmations.length, "EtherCast: invalid id");
        return _affirmations[id];
    }

    function totalAffirmations() external view returns (uint256) {
        return _affirmations.length;
    }
}
