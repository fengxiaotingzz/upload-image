### 新增

- 增加配置 accept、maxCount
- 增加上传文件默认展示

### 解析配置

该 npm 包是用于上传文件的，可批量，也可单条上传。由于依赖外部项目的 react 包，所以需要在配置 webpack 的 js 解析 rule 时，额外添加该包的解析，如：

```
{
    test: /\.js/,
    include: [path.resolve('./node_modules/upload-image-comp/src/lib')]
}

```

### 使用

onChange 函数中的 file 为正在上传的单个 file，fileList 为所有上传文件的数组集合。

```
<Upload url='http://test.com' onChange={(file, fileList) => console.log(file, fileList)}>上传</Upload>
```

### 上传参数格式

目前只支持 fromData 格式

### fileList 中文件 file 的状态

上传中，file.status 为 uploading。  
上传失败，file.status 为 error。  
取消上传，file.status 为 cancel。  
上传成功的 file.status 可根据响应自定义，值为上述字段之外。

### 批量

设置 multiple 为 true，可以实现批量上传，默认为 false。

```
<Upload url='http://test.com' multiple onChange={fileList => console.log(fileList)}>上传</Upload>
```

### 禁用

设置 disabled 为 true，可以实现禁止上传，

```
<Upload disabled url='http://test.com' onChange={fileList => console.log(fileList)}>上传</Upload>
```

### 检查上传文件是否合法

默认全部合法，onCheck 函数的 fileList 参数为文件数组，如果文件合法，onCheck 函数返回 true，如果不合法返回 false。

```
<Upload onCheck={fileList => true} url='http://test.com' onChange={fileList => console.log(fileList)}>上传</Upload>
```

### 取消上传

onChange 函数返回的 fileList 数组中，每一个成员都有一个 cancel 属性，为函数，调用该函数则可取消上传该成员文件的上传。

### 限制上传文件的格式

使用 accept 来限制上传文件的格式

```
<Upload url='http://test.com' accept=".docx" onChange={(file, fileList) => console.log(file, fileList)}>上传</Upload>
```

### 限制上传文件的数量

maxCount 限制上传文件的数量

```
<Upload url='http://test.com' maxCount={2} accept=".docx" onChange={(file, fileList) => console.log(file, fileList)}>上传</Upload>
```

### 使用上传文件的默认展示

```
const fileList = {status: 'success', name:'test.svg', url:'http://test.svg'};

<ImageProgress fileList={fileList} / >
```

### 自定义上传文件的展示

```
const fileList = {status: 'success', name:'test.svg', url:'http://test.svg'};

<ImageProgress fileList={fileList}  itemRender={(file, i) => <div key={i}>{file?.name}</div>}/ >
```
