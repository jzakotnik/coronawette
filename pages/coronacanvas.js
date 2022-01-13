import CanvasDraw from "react-canvas-draw";

export default function CoronaCanvas({ topref, height, width }) {
  /*const canvasConfig = {
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 6,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 800,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 2,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false,
    enablePanAndZoom: false,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
  };*/
  console.log("Ref in CoronaCanvas: ", topref);
  console.log("Canvas Size ", height, width);
  return (
    <div>
      <CanvasDraw
        canvasWidth={width}
        canvasHeight={height}
        brushRadius={4}
        gridSizeX={20}
        ref={topref}
        onChange={() => console.log("onChange")}
      />
    </div>
  );
}
