import CanvasDraw from "react-canvas-draw";
import useWindowDimensions from "./useWindowDimensions";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import NoSsr from "@mui/material/NoSsr";

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

export default function CoronaCanvas({ baseline, canvasSize }) {
  const canvasDraw = useRef();
  const fooRef = useRef(null);
  const { height, width } = canvasSize;

  /*useEffect(() => {
    console.log(
      "[CoronaCanvas] Initial UseEffect with Canvas Size and baseline",
      canvasDraw,
      baseline
    );
    if (canvasDraw.current !== undefined && baseline !== null) {
      console.log("initial canvasDraw ", canvasDraw, baseline);
      canvasDraw.current.clear();
      canvasDraw.current.loadSaveData(JSON.stringify(baseline.canvas));
    }
  }, []);*/

  useEffect(() => {
    console.log(
      "[CoronaCanvas] Re-Render due to Resize - UseEffect with Canvas Size and baseline",
      canvasDraw,
      baseline
    );
    if (canvasDraw.current !== undefined && baseline !== null) {
      //console.log("canvasDraw ", canvasDraw);
      canvasDraw.current.clear();

      canvasDraw.current.loadSaveData(JSON.stringify(baseline.canvas));
    }
  }, [canvasSize]);

  const paddingFactorY = 0.8;
  //console.log("Ref in CoronaCanvas: ", topref);
  /*console.log(
    "[CoronaCanvas] Re-render with Canvas Size and baseline",
    width,
    height,
    baseline
  );*/

  return (
    <div ref={fooRef}>
      <CanvasDraw
        canvasWidth={width}
        canvasHeight={height * paddingFactorY}
        brushRadius={2}
        gridSizeX={20}
        baseline={baseline}
        ref={canvasDraw}
        onChange={() => {
          console.log("onChange");
        }}
      />
    </div>
  );
}
