## [ホームに戻る](../index.html)


#　ターミナル、シェル、環境整理

ターミナル：
    シェルに指示を行うためのアプリケーション
    Windows Terminalなど

シェル：
    命令を理解して、カーネル（OSの中核）に指示を出す
    -コマンドプロンプトなど
    -コマンドプロンプトにはなぜディレクトリが表示されるのか？
        ‐シェルは 今いるディレクトリを常に管理している
        ‐その情報を プロンプトとして表示している。ターミナルは それを表示するだけ。


Windows Terminalを起動したときに、PowerShellも起動するため混乱する：
    理由
    Windows Terminal には 既定のプロファイルがある。多くの環境でそれが PowerShell に設定されている。
    そのため、「Terminal を開いたら PowerShell が出る」という挙動。


# 作業環境を作るとは？

1. 作業環境を作るとき

    ```bash
    conda create -n work python=3.10
    ```



    "work"という作業環境がつくられる。その中に Python 3.10 がインストールされる。

2. 実際に作業環境を使用する

    ```bash
    conda activate work
    ```

    シェルのPathの先頭が切り替わる。プロンプトにworkが表示される。python と打つと Python 3.10 が起動する。


3. 作業が終わったら元に戻す

    ```bash
    conda deactivate
    ```

    シェルの PATH や環境変数が「ひとつ前の状態」に戻る

# よくつかうコマンド

conda create -n work python=3.13   # 作成
conda activate work               # 使う
conda deactivate                  # 抜ける
conda env list                    # 環境一覧
conda remove -n work --all         # 削除（不要になったら）


# パッケージを入れるとき
conda activate work
conda install numpy pandas matplotlib


#　pip を使う場合

python -m pip install requests