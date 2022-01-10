// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
//import { parse, csv } from "csv-parse";
import { parse, csv, format } from "@fast-csv/parse";

const parser = parse({
  delimiter: ",",
  headers: true,
});

const casesHistogram = {};

async function parseStream() {
  const filename = path.join(process.cwd(), "pages/api/rkistats.csv");

  console.log(filename);
  var processedLines = 0;
  return new Promise(function (resolve, reject) {
    var fetchData = [];

    fs.createReadStream(filename)
      .pipe(parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        if (row.Refdatum in casesHistogram) {
          casesHistogram[row.Refdatum] =
            casesHistogram[row.Refdatum] + parseInt(row.AnzahlFall);
        } else {
          casesHistogram[row.Refdatum] = parseInt(row.AnzahlFall);
        }

        processedLines++;
        console.log("Processed lines: ", processedLines);
      })
      .on("end", (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(fetchData);
      });
  });
}

export default async function handler(req, res) {
  await parseStream();
  res.statusCode = 200;
  res.json({
    days: Object.keys(casesHistogram).length,
    histogram: casesHistogram,
  });
}
