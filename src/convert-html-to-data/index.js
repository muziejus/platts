const fs = require("fs");
const cheerio = require("cheerio");

/*
 * How to scrape the DSAL version of Platts:
 * 
 * Run a for loop:
 *
 * for i ({1..1254})
 * wget https://dsal.uchicago.edu/cgi-bin/app/platts_query.py\?page\=$i ; sleep 0.1
 *
 * This saves a bunch of files that are named something like: platts_query.py?page=1254
 *
 * To change those into html files:
 *
 * ls -1 | sed 's/^.*=\(.*\)$/mv & page-\1.html/' | sh
 *
 */

const file = fs.readFileSync("./original-wget/page-1.html", { encoding: "UTF-8" });
const htmlPage = cheerio.load(file);
htmlPage(".hw_result div").each((index, element) => {
  const $ = cheerio.load(element);
  const hw = $("hw");
  console.log("HEADWORD: ", hw.text());
});
