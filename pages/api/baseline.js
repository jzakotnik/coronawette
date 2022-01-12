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
            x: 0,
            y: 600,
          },
        ],
        brushColor: "#154",
        brushRadius: 2,
      },
    ],
    width: 900,
    height: 600,
  };
  const data = baseline.sampleHistogram;
  var x = 0;
  var y = 0;
  data.map((point) => {
    x = x + 10;
    y = 600 - point.count / 500;
    baselineText.lines[0].points.push({ x: x, y: y });
  });
  console.log("Baseline: ", data);
  return baselineText;
}

export default async function handler(req, res) {
  res.statusCode = 200;
  //add graphical transformation
  const canvasText = transformBaselineToCanvasString();
  res.json({ canvas: canvasText, baseline: baseline });
}
