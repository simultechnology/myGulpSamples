# 文字列をdelimiterで区切って返す関数
splitStr = (str, delimiter = ",") ->
  str.split(delimiter)

# delimiterを省略
s1 = "1,2,3"
console.log splitStr(s1)

# 明示的にdelimiterを指定
s2 = "a:b:c"
console.log splitStr(s2, ":")


