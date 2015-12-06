# EMAとSMAを利用して翌日の気温を予測する

# 予測データ
FILE_CSV = './2014kion.csv'
# 定数
SMA_RANGE = 3
EMA_ALPHA = 2 / (SMA_RANGE + 1)

# モジュールの取り込み
fs = require 'fs'

# 指数移動平均を計算する関数
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

# 移動平均を計算する関数
calcSimpleMovingAverage = (i, list, range) ->
  # 期間を選択
  m_from = i - range + 1
  m_to   = i
  cnt = 0
  sum = 0
  for j in [m_from .. m_to]
    if j >= 0
      sum += list[j][1]
      cnt++
  value = sum / cnt
  # 予測値を記録
  list[i][3] = value
  return value

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

# 少数点以下を揃えて出力
fmt = (v) ->
  v = "" + (Math.round(v * 100) / 100)
  if v.indexOf(".") < 0 then v += ".00"
  v = v.replace /\.?(\d+)$/, (ma, n) ->
    n += "00"
    n = n.substr(0, 2)
    return "." + n

# メイン処理
main = ->
  # CSVを読み込む
  list = loadCSV(FILE_CSV)
  # 各行について予測値を求める
  sum_ema = sum_sma = cnt = 0
  for v, index in list
    if index + 1 >= list.length then continue
    date_s = list[index + 1][0]
    real_v = list[index + 1][1]
    ema = calcExpMovingAverage(index, list, EMA_ALPHA)
    ema_err = ema - real_v
    sum_ema += Math.abs(ema_err)
    sma = calcSimpleMovingAverage(index, list, SMA_RANGE)
    sma_err = sma - real_v
    sum_sma += Math.abs(sma_err)
    cnt++
    console.log "+ #{date_s} 実際 #{real_v}"
    console.log "| - ema = #{fmt(ema)} : 誤差#{fmt(ema_err)}"
    console.log "| - sma = #{fmt(sma)} : 誤差#{fmt(sma_err)}"
  # 誤差を表示
  console.log "---"
  ave_ema = sum_ema / cnt
  ave_sma = sum_sma / cnt
  console.log "誤差EMA=#{fmt(sum_ema)} 平均=#{fmt(ave_ema)}"
  console.log "誤差SMA=#{fmt(sum_sma)} 平均=#{fmt(ave_sma)}"

main()


