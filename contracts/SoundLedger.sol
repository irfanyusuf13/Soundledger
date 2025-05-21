// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SoundLedger {
    struct Song {
        string title;
        string artist;
        string genre;
        string releaseDate;
        string ipfsHash;
        address owner;
    }

    mapping(string => Song) private songs;
    mapping(address => string[]) private songsByArtist;

    event SongRegistered(
        address indexed owner,
        string title,
        string artist,
        string genre,
        string releaseDate,
        string ipfsHash
    );

    function registerSong(
        string memory title,
        string memory artist,
        string memory genre,
        string memory releaseDate,
        string memory ipfsHash
    ) public {
        require(bytes(songs[ipfsHash].ipfsHash).length == 0, "Song already registered");

        songs[ipfsHash] = Song(title, artist, genre, releaseDate, ipfsHash, msg.sender);
        songsByArtist[msg.sender].push(ipfsHash);

        emit SongRegistered(msg.sender, title, artist, genre, releaseDate, ipfsHash);
    }

    function getSongOwner(string memory ipfsHash) public view returns (address) {
        return songs[ipfsHash].owner;
    }

    function getSongsByArtist(address artist) public view returns (string[] memory) {
        return songsByArtist[artist];
    }

    function getSongMetadata(string memory ipfsHash)
        public
        view
        returns (string memory, string memory, string memory, string memory)
    {
        Song memory s = songs[ipfsHash];
        return (s.title, s.artist, s.genre, s.releaseDate);
    }
}
