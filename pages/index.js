import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import CoronaCanvas from "./coronacanvas";
import Navigation from "./navigation";
import useWindowDimensions from "./lib/useWindowDimensions";
import AxisX from "./axisx";
import { Typography, Grid, Box } from "@mui/material";

export default function Home() {
  const { height, width } = useWindowDimensions();
  const canvasDraw = useRef(null);
  const [baseline, setBaseline] = useState(null);

  function calculate() {
    console.log("Calculate diff", canvasDraw.current.getSaveData());
  }

  function clear() {
    canvasDraw.current.clear();
  }

  async function load() {}

  useEffect(() => {
    async function getBaseline() {
      let url = "/api/baseline";
      let config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, config);
      const b = await response.json();
      setBaseline(b);
      //canvasDraw.current.loadSaveData(JSON.stringify(b.canvas));
      //console.log(b);
    }
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
        <Navigation
          calculate={calculate}
          clear={clear}
          load={load}
          height={height}
          width={width}
        />
        <Grid item xs={12}>
          <CoronaCanvas topref={canvasDraw} height={height} width={width} />
          {baseline && <AxisX dates={baseline.baseline.sampleDates} />}
        </Grid>{" "}
      </Grid>
    </div>
  );
}
