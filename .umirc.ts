import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  chainWebpack(memo) {
    memo.resolve.alias.set(
      'roughjs',
      '/node_modules/roughjs/bundled/rough.cjs',
    );
  },
});
