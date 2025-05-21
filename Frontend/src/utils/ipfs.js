export const uploadMP3ToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://localhost:5001/api/v0/add', {
    method: 'POST',
    body: formData,
  });

  const resText = await res.text();
  const lines = resText.trim().split('\n');
  const lastLine = lines[lines.length - 1];
  const result = JSON.parse(lastLine);

  if (!result.Hash) throw new Error("Failed to upload to IPFS");
  return result.Hash;
};
