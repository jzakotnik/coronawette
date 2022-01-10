import Head from "next/head";
import { useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import CoronaCanvas from "./coronacanvas";
import Navigation from "./navigation";

export default function Home() {
  const canvasDraw = useRef(null);

  function calculate() {
    console.log("Calculate diff", canvasDraw.current.getSaveData());
  }

  function clear() {
    canvasDraw.current.clear();
  }

  async function load() {
    const response = await fetch("/api/baseline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const baselineText = await response.text();
    console.log("Received baseline: ", baselineText);
    canvasDraw.current.loadSaveData(baselineText);
  }

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
      <Navigation calculate={calculate} clear={clear} load={load} />
      <CoronaCanvas topref={canvasDraw} />
    </div>
  );
}
