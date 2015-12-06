# Animal クラスを定義
class Animal
  # プロパティの定義
  atype: "Animal"

  #コンストラクタを定義
  constructor: (@name) ->
    # nameプロパティは自動的に設定される

  #メソッドを定義
  print: ->
    console.log "名前は#{@name}, 種類は#{@atype}です。"

# インスタンスを生成
taro = new Animal "Taro"
taro.print()

