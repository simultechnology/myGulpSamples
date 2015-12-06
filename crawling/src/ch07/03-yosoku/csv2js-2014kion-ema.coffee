# Node.jsでCSVをGoogle Charts用のJSに変換
# 指数移動平均も計算する

FILE_CSV = './2014kion.csv'
FILE_JS  = './2014kion-ema.js'

EMA_RANGE = 10
EMA_ALPHA = 2 / (EMA_RANGE + 1)

fs = require 'fs'

# 指数移動平均を計算する関数 ---- (※1)
calcExpMovingAverage = (i, list, alpha) ->
  # 今回の値
  value = list[i][1]
  # 前回の値
  if i == 0
    last_value = value
  else
    last_value = list[i - 1][2]
  # 予測値を計算
  new_value = last_value + alpha * (value - last_value)
  # 予測値を記録
  list[i][2] = new_value
  return new_value


# ファイルからCSVファイルを読む
loadCSV = (filename) ->
  txt = fs.readFileSync filename, "utf-8"
  lines = txt.split "\r\n"
  # CSVテキストを二次元配列変数に変換
  list = []
  for v in lines
    cells = v.split ','
    date_s = cells[0].split("/").slice(1,3).join("/");
    temp   = parseFloat cells[1]
    list.push([date_s, temp])
  return list

# メイン処理
main = ->
  # CSVを読み込む
  list = loadCSV(FILE_CSV)
  # 各行についてEMAを求める --- (※2)
  for v, index in list
    av = calcExpMovingAverage(index, list, EMA_ALPHA)
    console.log list[index][0], list[index][1], av
  # JavaScriptを出力
  js = "var kion_data = " + JSON.stringify(list)
  fs.writeFileSync FILE_JS, js, "utf-8"

main()
console.log "ok"

