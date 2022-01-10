// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
//import { parse, csv } from "csv-parse";
import { parse, csv, format } from "@fast-csv/parse";
import { DateTime } from "luxon";

const parser = parse({
  delimiter: ",",
  headers: true,
});

const casesHistogram = {};

async function parseStream() {
  const filename = path.join(process.cwd(), "pages/api/rkistats_example.csv");

  console.log(filename);
  var processedLines = 0;
  return new Promise(function (resolve, reject) {
    var fetchData = [];
    console.time("Import");
    fs.createReadStream(filename)
      .pipe(parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        //format 2021/04/17 00:00:00+00
        const d = DateTime.fromJSDate(new Date(row.Refdatum)).toISODate();
        console.log("date time from stream: ", d);

        if (d in casesHistogram) {
          casesHistogram[d] = casesHistogram[d] + parseInt(row.AnzahlFall);
        } else {
          casesHistogram[d] = parseInt(row.AnzahlFall);
        }

        processedLines++;
        if (processedLines % 10000 == 0)
          console.log("Processed lines: ", processedLines);
      })
      .on("end", (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        console.timeEnd("Import");
        resolve(fetchData);
      });
  });
}

function sortHistogram(sampleDates) {
  console.log("Sorting histogram..");
  const sampleHistogram = [];
  //Object.entries(casesHistogram).sort((a, b) => b[0].localeCompare(a[0]));
  console.log("Mapping to sampled dates: ");
  Object.keys(sampleDates).forEach((v) => {
    //console.log(sampleDates[v]);
    const timestamp = sampleDates[v].ts;
    sampleHistogram.push({
      time: sampleDates[v].c,
      timestamp: sampleDates[v].ts,
      count: casesHistogram[timestamp],
    });
  });
  sampleHistogram.sort((a, b) => a.timestamp - b.timestamp);

  return sampleHistogram;
}

function initSampleDates() {
  const sampleDates = [];

  const startDate = DateTime.fromISO("2021-01-06");
  const endDate = DateTime.fromISO("2022-01-05");
  var dt = new DateTime(startDate);
  //sampleDates.push(new DateTime(dt));
  //dt = dt.plus({ week: 1 });
  while (dt <= endDate) {
    sampleDates.push(new DateTime(dt));
    dt = dt.plus({ week: 1 });
  }
  return sampleDates;
}

export default async function handler(req, res) {
  await parseStream();
  const sampleDates = initSampleDates();

  const sampleHistogram = sortHistogram(sampleDates);
  res.statusCode = 200;
  res.json({
    days: Object.keys(casesHistogram).length,
    sampleDates: sampleDates,
    histogram: casesHistogram,
    sampleHistogram: sampleHistogram,
  });
}
