# Node.jsでCSVをGoogle Charts用のJSに変換

FILE_CSV = './2014kion.csv';
FILE_JS  = './2014kion.js';

fs = require 'fs'

txt = fs.readFileSync FILE_CSV, "utf-8"
lines = txt.split "\r\n"

result = [];
for v in lines
  cells = v.split ','
  date_s = cells[0].split("/").splice(1,2).join("/");
  temp   = parseFloat cells[1]
  result.push([date_s, temp])

json = JSON.stringify result
js = "var kion_data = " + json;
fs.writeFileSync FILE_JS, js, "utf-8"
console.log "ok"

