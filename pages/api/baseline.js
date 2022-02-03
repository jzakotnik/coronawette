// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
import * as baseline from "./baseline.json";
import * as sampleCanvas from "./sampleCanvas.json";

function getMaxCount(data) {
  return Math.max.apply(
    Math,
    data.map((c) => {
      return c.count;
    })
  );
}

function transformBaselineToCanvasString(height, width) {
  console.log("Transforming data to canvas: ", height, width);
  const baselineNormalized = {
    lines: [
      {
        points: [
          {
            x: 0,
            y: 0,
          },
        ],
        brushColor: "#154",
        brushRadius: 2,
      },
    ],
    width: 1,
    height: 1,
  };

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
    width: width,
    height: height,
  };
  const data = baseline.histogram;
  var x = 0;
  var y = 0;
  var maxCount = getMaxCount(data);
  console.log("Maximum case number is ", maxCount);
  //number of x axis data points, use half of canvas to plot them
  const datecount = data.length;
  data.map((point) => {
    x = x + width / 2 / datecount;
    y = height - point.count / 500;
    console.log("Pushing x, y", x, y, maxCount, point.count);

    baselineText.lines[0].points.push({ x: x, y: y });
    console.log("xy", x, y);
  });

  var x = 0.0;
  var y = 0.0;

  //create normalised canvas between 0,1
  data.map((point) => {
    console.log("Normalised Point", point);
    x = x + 0.5 / datecount;
    y = point.count / maxCount / 2;
    baselineNormalized.lines[0].points.push({ x: x, y: y });
    console.log("normalised xy", x, y);
  });

  //console.log("Baseline: ", baselineText.lines);
  return { baselineText: baselineText, baselineNormalized: baselineNormalized };
}

export default async function handler(req, res) {
  console.log("Got parameters, ", req.query);
  const { height, width } = req.query;

  res.statusCode = 200;
  //add graphical transformation
  const canvasText = transformBaselineToCanvasString(height, width);
  res.json({ canvas: canvasText.baselineText, baseline: baseline });
}
