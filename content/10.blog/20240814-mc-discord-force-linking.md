---
title: 【DiscordSRV】MinecraftでDiscordとのリンク強制は単体でできる
description: 2024年現在でもMinecraft（Java版）のSpigotやPaperでサーバーを建てた際にDiscord連携を必須にしようとするとプラグインを複数使用する記事が出てきますが、単体で十分です。設定方法を解説します。
category: blog
tags: [Minecraft, Spigotプラグイン, DiscordSRV]
createdAt: 2024-08-14
updatedAt: 
thumbnail: '/img/blog/ogp/20240814-mc-discord-force-linking.png'
noindex: false
draft: false
---

::notice{type="disclaimer"}
この記事は備忘録としてメモ書き程度の記事です。

詳細は公式のWikiなども見ながら作業するとよいでしょう。
::

## 概要
2024年現在も「Minecraft Discord 強制」や類似するキーワードで検索をすると上位に「AllowToConnect」を利用した記事が出てきます。

AllowToConnectはDiscordSRVを前提にさらにプラグインを入れることになっていますが、DiscordSRV単体でDiscordアカウントのリンク強制化は実現可能です。

## やり方を簡単に説明
(AllowToConnectを使う場合と手順は大きく変わりません)
- DiscordSRV ( [Spigot](https://www.spigotmc.org/resources/discordsrv.18494/), [Wiki](https://docs.discordsrv.com/Installation/) ) を導入し、Botアカウントとの連携やサーバー招待を済ませておく
  - (必須ではないですが、`/discord link`のコマンドでアカウントリンクが実行できることを確認しておくと安心かもしれません)
- `plugins/DiscordSRV/linking.yml`を編集し、`Enabled: false`から`Enabled: true`に変更する
- サーバーを再起動する

## さいごに
割と需要もありそうなのに、誰も設定の項目を少しいじるだけでアカウント紐づけの強制化ができることをインターネットに書いていないものですね…
[DiscordSRVの関連ファイルの変更履歴](https://github.com/DiscordSRV/DiscordSRV/commits/master/src/main/resources/linking/ja.yml)を見る限りは2019年あたりにはすでにサポートされていそうなのにどうして…

