试用vitest的笔记
# 1 起步
#### 创建项目
用vite新建一个vue-ts项目，选vue、ts就行，其他默认
```shell
npm create vite
```

#### 项目中安装vitest
```shell
npm i -D vitest
```

#### 第一个例子
在根目录下新建一个tests文件夹

tsconfig.ts中的include字段（但是没有配置的时候，ts检测也没有问题？）
```json
{
  "include": [..., "tests/**/*.ts"],
}
```

参考[官方例子](https://cn.vitest.dev/guide/#%E7%BC%96%E5%86%99%E6%B5%8B%E8%AF%95)，自己跟着写一遍

简单使用：
```ts
import { test, expect } from 'vitest';
import { sum } from '../src/utils/sum';

test('sum', () => {
  expect(sum(2, 3)).toBe(5)
})

```

#### 执行测试
在package.jons中的scripts中配置一下
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

然后执行指令即可

#### Vitest的特点
1. 兼容 Jest：Api和Jest非常类似，从 Jest 迁移很简单。
2. 即时测试：智能文件监听模式，就像是测试的 HMR！
  1. 如果不想要即时测试，可以把命令配置成
```json
{
  "scripts": {
    "test": "vitest --run"
  }
}
```
3. 默认就支持ESM（import导入）, TypeScript, JSX
4. Vite 支持：重复使用 Vite 的配置、转换器、解析器和插件 - 在您的应用程序和测试中保持一致。（所以能支持解析.vue文件）

#### 配置
在vite.config.ts添加一个test字段进行配置
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test:{},
  plugins: [vue()],
})
```
也可以自己创建一个vite.config.ts文件进行配置，但会比较麻烦，还要配置vue等。不复杂的话不推荐

#### 通过配置，将vitest导出的内容全局导入。
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true
  },
  plugins: [vue()],
})

```
tsconfig中将对应的类型包含进来，支持类型推断（viteConfig只是支持调用）
```json
{
   "compilerOptions": {
      "types": ["vitest/globals"]
   }
}
```

> 用unplugin-auto-import包也可以

# 2 Vitest 搭配 Vue Test Utils 测试vue3组件
>不推荐使用，因为需要模拟浏览器环境，和真实的浏览器环境有一些差异，会导致bug，推荐使用sypress

#### 安装 @vue/test-utils 
```
npm install @vue/test-utils --save-dev
```
引入mount方法，来挂载组件
```ts
import HelloWorld from './HelloWorld.vue';
import { mount }  from '@vue/test-utils';

test('hello', () => {
  mount(HelloWorld)
});

```

会报错，找不到document

#### 安装jsdom
```shell
npm i -D jsdom
```

当前使用的node14报错[SyntaxError: Unexpected token '||='](https://stackoverflow.com/questions/72522748/syntaxerror-unexpected-token)，需要切换到15以上

#### 测试案例
```ts
import HelloWorld from './HelloWorld.vue';
import { mount }  from '@vue/test-utils';

test('hello', () => {
  const wrapper = mount(HelloWorld)
  expect(wrapper.text()).toContain('hello world')
});
```
