// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
import * as baseline from "./baseline.json";
import * as sampleCanvas from "./sampleCanvas.json";

function transformBaselineToCanvasString() {
  const baselineText = {
    lines: [
      {
        points: [
          {
            x: 114.5679759127084,
            y: 375.6235417442445,
          },
        ],
        brushColor: "#454",
        brushRadius: 3,
      },
    ],
    width: 900,
    height: 600,
  };
  const data = baseline.sampleHistogram;
  //TODO continue here
  return baselineText;
}

export default async function handler(req, res) {
  res.statusCode = 200;
  //add graphical transformation
  const canvasText = transformBaselineToCanvasString();
  res.json(canvasText);
}
