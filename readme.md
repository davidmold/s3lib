# s3lib

A small library for reading and writing json objects to keys in an s3 bucket.

## Usage

### Install
```
npm install s3lib
```

### Usage
```
import s3lib from 's3lib'

s3lib.init('my-bucket-name', fromIni({ profile: 'my-company' }))

async function main() {
  const obj = {
    name: 'my object',
  }

  s3lib.saveJsonObject(obj, 'folder1/folder2/myobj.json')

  const obj = s3lib.loadJsonObject('folder1/folder2/myobj.json)
}
```

You must call init with a bucket name before using. You do not have to set
the credentials in init (credentials can be null). If you already have an s3client
created, you can use that with 
```
s3lib.setClient(mys3client)
```