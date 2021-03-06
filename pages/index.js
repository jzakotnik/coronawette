import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import CoronaCanvas from "./coronacanvas";
import NoSsr from "@mui/material/NoSsr";

import Navigation from "./navigation";

import AxisX from "./axisx";
import { Typography, Grid, Box } from "@mui/material";

export default function Home() {
  const canvasDraw = useRef(null);
  const [baseline, setBaseline] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ height: 600, width: 900 });

  function calculate() {
    console.log("Calculate diff", canvasDraw.current.getSaveData());
  }

  function getCanvasSize(height, width) {
    console.log("Resized screen", height, width);
    //setCanvasSize({ height: height, width: width });
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

    canvasDraw.current.loadSaveData(JSON.stringify(b.canvas));

    //console.log(b);
  }
  useEffect(() => {
    getBaseline();
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
          <CoronaCanvas topref={canvasDraw} resizeHandler={getCanvasSize} />
          {baseline && <AxisX dates={baseline.baseline.sampleDates} />}
        </Grid>
      </Grid>
    </div>
  );
}
