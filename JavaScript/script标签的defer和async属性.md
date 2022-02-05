# script标签的defer和async属性

# 1. defer属性

defer属性是当html解析到含有defer属性的script标签时，会延迟脚本的执行，但是会异步下载该脚本，等到html解析完成，在DOMContentLoaded之前执行该脚本，如果多个脚本使用了defer属性，会按照它们在html代码中的顺序，依次执行。

## 2. async属性

async属性是当html解析到含有async属性的script标签时，会异步下载脚本，此时不影响html解析；当脚本下载完成立即执行，此时html解析暂停，如果多个脚本使用了async属性，那么它们的执行顺序取决于脚本下载完成的先后，先下载完成的先执行，所以不能将async属性用于存在依赖关系脚本。