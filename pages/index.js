import Head from "next/head";
import { useRef } from "react";
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
      <Navigation calculate={calculate} clear={clear} />
      <CoronaCanvas topref={canvasDraw} />
    </div>
  );
}
