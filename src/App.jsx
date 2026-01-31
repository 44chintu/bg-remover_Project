import { useState } from "react";
import UploadBox from "./components/UploadBox";
import Preview from "./components/Preview";
import ManualCropper from "./components/ManualCropper";
import AdBlock from "./components/AdBlock";


function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  return (
  <div className="app-layout">

    {/* LEFT AD */}
    <div className="sidebar-ad">
      <AdBlock />
    </div>

    {/* MAIN CONTENT */}
    <div className="main-content">

      <div className="container">

        <h1>Free Background Remover</h1>
        <p className="subtitle">
  100% Free. No signup. No upload. Runs locally in your browser.
</p>


        {/* Upload */}
        <div className="card">
          <UploadBox setOriginalImage={setOriginalImage} />
        </div>

        {/* SIDE BY SIDE VIEW */}
        {(originalImage || resultImage) && (
          <div
            className="card"
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              overflowX: "auto"
            }}
          >

            {/* ORIGINAL */}
            {originalImage && (
              <div style={{ width: "280px", textAlign: "center" }}>
                <Preview
                  originalImage={originalImage}
                  setResultImage={setResultImage}
                />
              </div>
            )}

            {/* RESULT */}
            {resultImage && (
              <div style={{ width: "280px", textAlign: "center" }}>
                <h3 className="column-title">Result</h3>

                <img
                src={resultImage}
                style={{
                  width: "100%",
                  maxHeight: "260px",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />


                <br /><br />

                <button onClick={() => setShowCropper(true)}>
                  Crop Image
                </button>

                <br /><br />

                <a href={resultImage} download="no-bg-hd.png">
                  Download PNG (HD)
                </a>
              </div>
            )}

            {/* CROPPER */}
            {showCropper && resultImage && (
              <div style={{ width: "320px", textAlign: "center" }}>
                <h3 className="column-title">Crop</h3>

                <ManualCropper
                  image={resultImage}
                  onCropDone={(img) => {
                    setResultImage(img);
                    setShowCropper(false);
                  }}
                />
              </div>
            )}

          </div>
        )}

        {/* BOTTOM AD BELOW IMAGES */}
        <AdBlock />

        <p className="footer">
  © {new Date().getFullYear()} Background Remover
</p>


      </div>
    </div>

    {/* RIGHT AD */}
    <div className="sidebar-ad">
      <AdBlock />
    </div>

  </div>
);
}

export default App;
