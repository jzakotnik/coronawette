// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
//import { parse, csv } from "csv-parse";
import { parse, csv, format } from "@fast-csv/parse";
import { DateTime } from "luxon";
import { SecurityRounded } from "@mui/icons-material";

const parser = parse({
  delimiter: ",",
  headers: true,
});

const casesHistogram = [];

async function parseStream() {
  //const filename = path.join(process.cwd(), "pages/api/rkistats_example.csv");

  const filename = path.join(process.cwd(), "pages/api/covidtimeseries.csv");

  console.log(filename);
  var processedLines = 0;
  return new Promise(function (resolve, reject) {
    var fetchData = [];
    console.time("Import");
    fs.createReadStream(filename)
      .pipe(parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        console.log(row);
        casesHistogram.push(row);
      })
      .on("end", (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        console.timeEnd("Import");
        resolve(fetchData);
      });
  });
}

function initSampleDates() {
  const sampleDates = [];

  const startDate = DateTime.fromISO("2021-01-12");
  const endDate = DateTime.fromISO("2022-01-12");
  var dt = new DateTime(startDate);

  while (dt <= endDate) {
    sampleDates.push(new DateTime(dt).toISODate());
    dt = dt.plus({ day: 1 });
  }
  return sampleDates;
}

function convertCasesHistogram() {
  const resultHistogram = {};
  //skip unused columns
  const unusedCol = {
    "Province/State": 1,
    "Country/Region": 1,
    Lat: 1,
    Long: 1,
  };
  for (const [date, count] of Object.entries(casesHistogram[0])) {
    if (!(date in unusedCol)) {
      const keydate = DateTime.fromJSDate(new Date(date)).toISODate();
      resultHistogram[keydate] = count;
    }
  }

  //map to target dates
  console.log("Histo/count", resultHistogram);
  const samples = initSampleDates();
  const result = samples.map((d) => {
    console.log("Matching ", d, " to ", resultHistogram[d]);
    return { date: d, count: resultHistogram[d] };
  });

  //calc deltas
  const deltas = result.map((v, i, a) => {
    if (i > 1) {
      return { date: v.date, count: v.count - (a[i - 1].count || 0) };
    } else return { date: v.date, count: 0 };
  });

  console.log("Cases histogram conversion; ", deltas);
}

export default async function handler(req, res) {
  await parseStream();
  const sampleDates = initSampleDates();
  const resultHistogram = convertCasesHistogram(); //convert from cumulative

  res.statusCode = 200;
  res.json({
    days: Object.keys(casesHistogram).length,
    sampleDates: sampleDates,
    histogram: casesHistogram,
  });
}
