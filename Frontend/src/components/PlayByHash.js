const PlayByHash = ({ playHash, setPlayHash }) => (
  <section>
    <h2>Play from IPFS</h2>
    <input
      type="text"
      placeholder="Enter IPFS hash to play"
      value={playHash}
      onChange={(e) => setPlayHash(e.target.value)}
      style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }}
    />
    {playHash && <audio controls src={`http://localhost:8081/ipfs/${playHash}`} style={{ width: "100%" }} />}
  </section>
);

export default PlayByHash;
