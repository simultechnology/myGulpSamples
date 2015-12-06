// Rhinoでテキストファイルを読む for Rhino

// UTF-8
var txt;
txt = readFile("sample-utf8.txt", "utf-8");
print(txt);

// Shift_JIS
txt = readFile("sample-sjis.txt", "sjis");
print(txt);

// EUC
txt = readFile("sample-unknown.txt", "euc-jp");
print(txt);

