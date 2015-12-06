# Node.jsでCSVをGoogle Charts用のJSに変換
# 移動平均も計算する

FILE_CSV = './2014kion.csv'
FILE_JS  = './2014kion-sma.js'
MA_RANGE = 7

fs = require 'fs'

# ファイルからCSVファイルを読む
loadCSV = (filename) ->
  txt = fs.readFileSync filename, "utf-8"
  lines = txt.split "\r\n"
  # CSVテキストを二次元配列変数に変換
  list = []
  for v in lines
    cells = v.split ','
    date_s = cells[0].split("/").slice(1,3).join("/")
    temp   = parseFloat cells[1]
    list.push([date_s, temp])
  return list

# 移動平均を計算 ------ (※1)
calcMovingAverage = (i, list, range) ->
  # 期間を決定
  m_from = i - range
  m_to   = m_from + range - 1
  # 期間が不完全ならば0を返す
  if m_from < 0 then return NaN
  # 合計を計算
  sum = 0
  for j in [m_from .. m_to]
    sum += list[j][1]
  # 平均を計算
  return sum / range

# メイン処理
main = ->
  # CSVを読み込む
  list = loadCSV(FILE_CSV)
  # 各行について移動平均を求めリストに追加 --- (※2)
  for val, index in list
    av = calcMovingAverage(index, list, MA_RANGE)
    list[index].push(av)
  # JavaScriptを出力
  js = "var kion_data = " + JSON.stringify(list)
  fs.writeFileSync FILE_JS, js, "utf-8"

main()
console.log "ok"

