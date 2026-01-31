import { removeBackground } from "../removeBackground";
import { useState } from "react";

function Preview({ originalImage, setResultImage }) {
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);

    const img = new Image();
    img.src = originalImage;

    img.onload = async () => {
      const result = await removeBackground(img);
      setResultImage(result);
      setLoading(false);
    };
  }

  return (
    <div>
      <h3 className="column-title">Original</h3>

      <img
        src={originalImage}
        style={{
          width: "100%",
          maxHeight: "260px",
          objectFit: "contain",
          borderRadius: "8px"
        }}
      />


      <br /><br />

      <button onClick={handleRemove}>
        {loading ? "Processing..." : "Remove Background"}
      </button>
    </div>
  );
}

export default Preview;
