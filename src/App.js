import logo from "./logo.svg";
import "./App.css";
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import myvideo from "./assets/video.mp4"
function App() {
  const containerRef = useRef();
  const [layer, setLayer] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [video, setVideo] = useState(null);
  const [videoImage, setVideoImage] = useState(null);
  useEffect(() => {
    const stage = new Konva.Stage({
      container: containerRef.current,
      width: 600,
      height: 600,
    });

    const newLayer = new Konva.Layer();
    stage.add(newLayer);
    setLayer(newLayer);

    return () => {
      stage.destroy();
    };
  }, []);

  const addImage = () => {
    if (!layer) return;

    // Load the image
    const imageObj = new window.Image();
    imageObj.onload = () => {
      const konvaImage = new Konva.Image({
        x: Math.random() * (600 - 100),
        y: Math.random() * (400 - 100),
        image: imageObj,
        width: 100,
        height: 100,
        draggable: true,
      });

      layer.add(konvaImage);
      layer.draw();
    };
    imageObj.src = "https://pngimg.com/uploads/free/free_PNG90756.png";
  };
  const addText = () => {
    if (!layer || !textInput) return;

    const konvaText = new Konva.Text({
      x: Math.random() * (600 - 100),
      y: Math.random() * (400 - 30),
      text: textInput,
      fontSize: 40,
      draggable: true,
      fill: "black",
    });

    layer.add(konvaText);
    layer.draw();
    setTextInput("");
  };
  const addVideo = () => {
    console.log(layer);
    if (!layer) return;
  
   
    const newVideo = document.createElement("video");
    newVideo.src = myvideo;
    newVideo.width = 240; 
    newVideo.height = 150;
    newVideo.loop = true;
    newVideo.muted = true; 
    newVideo.crossOrigin = "anonymous";
  
    
    const videoImage = new Konva.Image({
      x: 100,
      y: 100,
      width: 240,
      height: 150,
      draggable: true,
    });
  
    
    newVideo.addEventListener("loadeddata", () => {
      videoImage.image(newVideo); 
      layer.add(videoImage); 
      layer.draw(); 
    });
  
   
    videoImage.on("click", () => {
      if (newVideo.paused) {
        newVideo.play();
        requestAnimationFrame(updateVideoFrame);
      } else {
        newVideo.pause();
      }
    });
  

    const updateVideoFrame = () => {
      if (!newVideo.paused && !newVideo.ended) {
        videoImage.image(newVideo); 
        layer.batchDraw(); 
        requestAnimationFrame(updateVideoFrame);
      }
    };
  
    newVideo.addEventListener("ended", () => {
      videoImage.image(newVideo);
      layer.batchDraw();
    });
  
    
    newVideo.play();
    
    setVideo(newVideo);
    setVideoImage(videoImage);
  };
  

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding:'50px' }}>
        <div>
          <div>
          
            <input
              type="text"
              style={{width:'200px', padding:'8px 20px'}}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text"
            />
            <button style={{width:'160px', height:'40px',margin:'10px'}} onClick={addText}>Add Text</button>
          </div>
          <button style={{width:'160px', height:'40px' ,margin:'10px'}} onClick={addImage}>Add Image</button>
          <div>
            <button style={{width:'160px', height:'40px' ,margin:'10px'}} onClick={addVideo}>Add</button>
          </div>
         
        </div>
        <div>
          <div ref={containerRef} style={{border:'2px solid red'}} />
        </div>
      </div>
    </>
  );
}

export default App;
