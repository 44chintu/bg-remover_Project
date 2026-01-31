function UploadBox({ setOriginalImage }) {

  function handleFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleUpload(e) {
    handleFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <label
      className="upload-box"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <div style={{ fontSize: "42px" }}>📤</div>
      <h3>Drop image here</h3>
      <p style={{ color: "#6b7280" }}>
        or click to browse
      </p>
    </label>
  );
}

export default UploadBox;
