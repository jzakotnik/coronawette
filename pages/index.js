import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import CoronaCanvas from "./coronacanvas";
import useWindowDimensions from "./useWindowDimensions";
import NoSsr from "@mui/material/NoSsr";

import Navigation from "./navigation";

import AxisX from "./axisx";
import { Typography, Grid, Box } from "@mui/material";

export default function Home() {
  const [baseline, setBaseline] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ height: 600, width: 900 });

  function calculate() {
    console.log("Save line", canvasDraw.current.getSaveData());
    //const drawCurve = canvasDraw.current.getSaveData();
    //const newLines = baseline.canvas.push(drawCurve.line)
  }

  function onDrawHandler(saveData) {
    const drawnLines = JSON.parse(saveData).lines;
    if (drawnLines.length > 1) {
      console.log("Painted a new curve", drawnLines[1].points);
      const originalBaseline = baseline;
      originalBaseline.canvas.lines.push(drawnLines[1]);
      setBaseline(originalBaseline);
    }
  }

  async function getBaseline() {
    let url =
      "/api/baseline?" + new URLSearchParams({ height: 600, width: 900 });

    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, config);
    const b = await response.json();
    setBaseline(b);

    console.log("Fetched baseline", b);
  }

  //Check if the window resized
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 300;
    const height = hasWindow ? window.innerHeight : 300;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    console.log("Does window exist? ", hasWindow);
    if (hasWindow) {
      setCanvasSize(getWindowDimensions());
      function handleResize() {
        console.log("Changed window size for window ", getWindowDimensions());
        setCanvasSize(getWindowDimensions());
      }
      getBaseline();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  useEffect(() => {
    getBaseline();
    console.log("Fetched initial baseline: ", baseline);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Corona Vorhersage Wette</title>
        <meta
          name="description"
          content="Bist Du einer von 80 Millionen Virologen?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        direction="column"
        spacing={0}
        sx={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Navigation calculate={calculate} />

        <Grid item xs={12}>
          <CoronaCanvas
            canvasSize={canvasSize}
            baseline={baseline}
            onDrawHandler={onDrawHandler}
            key={baseline}
          />

          {baseline && (
            <AxisX
              canvasSize={canvasSize}
              dates={baseline.baseline.sampleDates}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
