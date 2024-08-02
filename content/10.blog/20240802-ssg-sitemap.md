---
title: 【Nuxt3】SSGでサイトマップを生成する【lastmod対応】
description: ブログやこのサイトを作った経緯をお伝えします。どんな技術スタックを使っているかやこだわったポイントなども書きました。
category: blog
tags: [雑記, 技術, Nuxt, SSG, SEO]
createdAt: 2024-08-02
updatedAt: 
thumbnail: '/img/blog/ogp/20240802-ssg-sitemap.png'
noindex: false
draft: false

---

この記事は以下の記事をベースにしています。
[【Nuxt3】SSGモードでxmlサイトマップを作成する方法【動的ページ対応】](https://zenn.dev/kakkokari_gtyih/articles/db1aed4fed6054)

上記の記事に従えばNuxtのSSGでサイトマップを公開することは可能なのですが、Nuxt Contentを利用してサイトを作るときにこのような問題が生まれます
- サイトマップに一番肝心なlastmodが適用されない…！


というわけで、今回は記事にlastmodを適用していきます

## TL:DR;
完成品を見たい人は[こちら]

## 動作を確認している環境
- nuxt v3.12.3
- sitemap v8.0.0
- node-html-parser 6.1.3
- @nuxt/content 2.13.1


## 完成品
```ts[generate-sitemap.ts]
import type { Nitro } from "nitropack";
import { SitemapStream, streamToPromise, type SitemapItem } from 'sitemap';
import { Readable } from 'stream';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser'
import path from 'path';
import { consola as logger } from 'consola';
import { colors } from 'consola/utils';

// サイトドメインを指定（最後スラッシュ不要）
const domain = process.env.BASE_URL || 'http://localhost:3000';

export default async function generateSitemap(nitro: Nitro) {
  if (!nitro._prerenderedRoutes) {
    return;
  }

  logger.info("Generating Sitemap");
  const startTime = process.hrtime();

  const publicDir = nitro.options.output.publicDir;

  const routes = nitro._prerenderedRoutes?.map((e) => e.fileName || null).filter((e, i, a) => e && a.indexOf(e) === i && e.endsWith("index.html")).map((e) => {
    let lastmod = undefined

    //ブログ記事ページの場合
    if (e?.match(/^\/blog\/(?!tags\/)(?!index\.html$).*\.html$/)) {
      const html = parse(readFileSync(path.join(publicDir, e), 'utf-8'))
      const publishedTime = html.querySelector('meta[property="article:published_time"]')?.getAttribute('content')
      const modifiedTime = html.querySelector('meta[property="article:modified_time"]')?.getAttribute('content')
      lastmod = (modifiedTime || publishedTime)
    }

    return {
      url: e?.replace(/index\.html$/, '').replace(/\/+$/, ''),
      priority: 0.7,
      changefreq: 'weekly',
      lastmod
    } as SitemapItem;
  })
  const smStream = new SitemapStream({ hostname: domain, lastmodDateOnly: true });
  Readable.from(routes).pipe(smStream);

  const data = await streamToPromise(smStream);

  writeFileSync(path.join(publicDir, 'sitemap.xml'), data.toString());
  const endTime = process.hrtime(startTime);
  logger.log(`${routes.map((e) => colors.gray(`  ├─ ${e.url}`)).sort().join('\n')}`);
  logger.info(`Generateed Sitemap ${routes.length} routes in ${(endTime[0] + (endTime[1] / 1e6) / 1000).toFixed(3)} seconds`)
  logger.success(`Generated Sitemap at ${path.join(publicDir, 'sitemap.xml')}`);
}
```

<details>
<summary>改変元からの差分</summary>

```diff
--- before.ts
+++ after.ts
@@ -1,32 +1,51 @@
 import type { Nitro } from "nitropack";
-import { SitemapStream, streamToPromise, SitemapItem } from 'sitemap';
+import { SitemapStream, streamToPromise, type SitemapItem } from 'sitemap';
 import { Readable } from 'stream';
-import { writeFileSync } from 'fs';
+import { readFileSync, writeFileSync } from 'fs';
+import { parse } from 'node-html-parser'
 import path from 'path';
+import { consola as logger } from 'consola';
+import { colors } from 'consola/utils';
 
 // サイトドメインを指定（最後スラッシュ不要）
-const domain = "https://YOUR_DOMAIN";
+const domain = process.env.BASE_URL || 'http://localhost:3000';
 
-export default async function genSitemap(nitro: Nitro) {
-    if (!nitro._prerenderedRoutes) {
-        return;
+export default async function generateSitemap(nitro: Nitro) {
+  if (!nitro._prerenderedRoutes) {
+    return;
+  }
+
+  logger.info("Generating Sitemap");
+  const startTime = process.hrtime();
+
+  const publicDir = nitro.options.output.publicDir;
+
+  const routes = nitro._prerenderedRoutes?.map((e) => e.fileName || null).filter((e, i, a) => e && a.indexOf(e) === i && e.endsWith("index.html")).map((e) => {
+    let lastmod = undefined
+
+    //ブログ記事ページの場合
+    if (e?.match(/^\/blog\/(?!tags\/)(?!index\.html$).*\.html$/)) {
+      const html = parse(readFileSync(path.join(publicDir, e), 'utf-8'))
+      const publishedTime = html.querySelector('meta[property="article:published_time"]')?.getAttribute('content')
+      const modifiedTime = html.querySelector('meta[property="article:modified_time"]')?.getAttribute('content')
+      lastmod = (modifiedTime || publishedTime)
     }
 
-    const publicDir = nitro.options.output.publicDir;
-
-    const routes = nitro._prerenderedRoutes?.map((e) => e.fileName || null).filter((e, i, a) => e && a.indexOf(e) === i && e.endsWith("index.html")).map((e) => {
-        return {
-            url: e?.replace(/index\.html$/, ''),
-	    
-	    // この辺の値は各自調整して下さい
-            changefreq: 'weekly',
-            priority: .7,
-        } as SitemapItem;
-    });
-    const smStream = new SitemapStream({ hostname: domain });
-    Readable.from(routes).pipe(smStream);
-
-    const data = await streamToPromise(smStream);
-
-    writeFileSync(path.join(publicDir, 'sitemap.xml'), data.toString());
+    return {
+      url: e?.replace(/index\.html$/, '').replace(/\/+$/, ''),
+      priority: 0.7,
+      changefreq: 'weekly',
+      lastmod
+    } as SitemapItem;
+  })
+  const smStream = new SitemapStream({ hostname: domain, lastmodDateOnly: true });
+  Readable.from(routes).pipe(smStream);
+
+  const data = await streamToPromise(smStream);
+
+  writeFileSync(path.join(publicDir, 'sitemap.xml'), data.toString());
+  const endTime = process.hrtime(startTime);
+  logger.log(`${routes.map((e) => colors.gray(`  ├─ ${e.url}`)).sort().join('\n')}`);
+  logger.info(`Generateed Sitemap ${routes.length} routes in ${(endTime[0] + (endTime[1] / 1e6) / 1000).toFixed(3)} seconds`)
+  logger.success(`Generated Sitemap at ${path.join(publicDir, 'sitemap.xml')}`);
 }
```

</details>

## 主な変更点
- lastmodに対応するようにした
- それに伴ってページを全件クロールしてmetaタグを読みに行ってるので、生成時のログを足して実行時間を表示するようにした

### lastmodに対応させたい…
サイトマップで最も大事なのはlastmodの値といっても過言ではありません。

SSG時にその値をどうやって取得しようかな…と悩んだのですが、今回は`node-html-parser`を用いてmetaタグから`<meta property="article:published_time">`または`article:modified_time">`を取得することで解決しています。ブログページ以外には適用しないことで実行時間をなるべく抑えています。

### ログをポップに表示する
Nuxtのログ、絵文字が使われていてポップで使いやすいな…と思っていたのですがどうやら[consola](https://github.com/unjs/consola)というライブラリを使うことで可能なよう。（ちなみにNuxtを利用している場合はわざわざ導入しなくても入っています）

![サイトマップの生成ログ](/img/blog/content/2024/sitemap-generation-log.png)

うーん、めっちゃ公式のログっぽい

## さいごに
この内容は[（仮）](https://github.com/kakkokari-gtyih)さんの[【Nuxt3】SSGモードでxmlサイトマップを作成する方法【動的ページ対応】](https://zenn.dev/kakkokari_gtyih/articles/db1aed4fed6054)の内容がベースとなっています。

シェアと改変の許可を頂いた（仮）さんにこの場をお借りして感謝いたします。
