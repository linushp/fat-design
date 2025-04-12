
参考：
https://github.com/orgs/alibaba-fusion/repositories


https://fusion.design/pc/component/select?themeid=2


与Next相比
1. 体积更小，构建后761k，Next有1.1M
2. 功能更强大：Form2、 Table、Image、QueryForm
3. React18、React16均支持。


### 资料
* 地址库 https://division-data.alicdn.com/simple/addr_1_4_all.js

## 发布npm：

1. 发布npm需要去npm源  npm config set registry=https://registry.npmjs.org
2. 构建npm包： npm run build:npm
3. cd dist/
4. npm publish --access=public


## 发布的npm包只依赖React，并且对React版本没有任何要求，兼容react16， react17， react18




## cp -r  /Users/luanhaipeng/gitee/fat-design/dist/* /Users/luanhaipeng/gitee/fatcms-web/node_modules/fat-design/



