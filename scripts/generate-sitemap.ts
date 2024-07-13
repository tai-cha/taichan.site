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
