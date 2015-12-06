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

class Dog extends Animal
  atype: "Dog"
  print: ->
    console.log "わんわん"
    super()

class Cat extends Animal
  atype: "Cat"
  print: ->
    console.log "にゃーにゃー"
    super()

# インスタンスを生成
jiro = new Dog "Jiro"
jiro.print()

mike = new Cat "Mike"
mike.print()

