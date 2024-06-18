<template>
  <main>
    <ContentDoc :path="$route.path">
      <template #not-found>
        <h1>404 Not Found</h1>
        <p>アクセスしたページが見つかりませんでした。</p>
      </template>
      <template #empty>
        <h1>Empty</h1>
        <p>このページは空です</p>
      </template>
    </ContentDoc>
  </main>
</template>
<style>
  h2 {
    text-decoration: none;
  }
  main {
    width: 100%;
  }
</style>