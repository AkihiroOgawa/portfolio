## [ホームに戻る](../index.html)


# PowerAutomate/SharePointにファイル生成

## 業務シナリオ

1. SPOの繰り返し使用する編集用ファイル（テンプレート）にて最終化が完了する
2. PowerAutomateを実行して、他のSPO上の成果物用フォルダに最終化したファイルの複製を格納する  
3. 複製したファイル名は、"yyyymm_versioin#.0"とする。
4. ファイル名のmmは前月
5. ファイル名のversionナンバーは、成果物用フォルダに格納済ファイルを確認して決まる　　
   ※例えば同じyyyymmファイルが不在ならば、version1.0。version1.0があればversion2.0になるような動的処理。

---

#  PoweAutomate画像
![sample](../assets/images/art1_1.png)

---

## PowerAutomateフロー
1. フローを手動でトリガーする

   
2. 変数の設定　version用  
   - 名前：version  
   - タイプ：整数
  

3. 変数の設定  
   - 名前：versionArray
   -  タイプ：配列
  

4. フォルダの一覧
   - サイトのアドレス：SPOページURL
   - ファイル識別子：成果物フォルダ


5. アレイのフィルター処理
   - From：「本文」
   - FilterQuery：
  
```
and(
  not(empty(item()?['Name'])),
  contains(
    item()?['Name'],
    concat('Invoice', formatDateTime(addDays(startOfMonth(utcNow()), -1), 'yyyyMM'), 'v')
  )
)
```

6. Apply to each  
   - 前のステップから出力を選択します:(アレイのフィルター処理)Body
   6-1. 対象ファイルのバージョン数を抽出・配列
    -  Name:versionArrya  
    -  Value:
```
if(
  not(empty(items('Apply_to_each')?['Name'])),
  int(
    split(
      split(items('Apply_to_each')?['Name'], 'v')[1],
      '.0.xlsx'
    )[0]
  ),
  0
)
``` 
 
7. 変数の設定
    -  名前：version
    -  値：
  
```
if(greater(length(variables('versionArray')), 0), add(max(variables('versionArray')), 1), 1)

```
8.  ファイルコンテンツの取得
    -  サイトのアドレス：SPOページURL
    -   ファイル識別子：テンプレートファイル
  

9.  ファイルの作成
    - ファイル名：

```
concat(
  'invoice',
  formatDateTime(addDays(startOfMonth(utcNow()), -1), 'yyyyMM'),
  'v',
  string(variables('version')),
  '.0.xlsx'
)
```

## [ホームに戻る](../index.html)