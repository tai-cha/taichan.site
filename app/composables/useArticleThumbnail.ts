export const useArticleThumbnail = () => {
  /**
   * 記事のサムネイルURLを取得する
   * サムネイルが設定されていない、またはデフォルト画像の場合は自動生成されたOGP画像のURLを返す
   * @param path 記事のパス
   * @param thumbnail 設定されているサムネイル画像のパス
   */
  const getThumbnail = (path: string, thumbnail?: string | null) => {
    if (thumbnail && thumbnail !== '/default-ogp.png') {
      return thumbnail
    }
    
    // 末尾のスラッシュを削除してパスを正規化（念のため）
    const normalizedPath = path.replace(/\/$/, '') || '/'
    
    // nuxt-og-image の画像URLパターン
    return `/__og-image__/image${normalizedPath}/og.png`
  }

  return {
    getThumbnail
  }
}
