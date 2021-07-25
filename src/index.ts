import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

let s3client = null
let bucket: string = ''

async function streamToString (stream) {
  return await new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
  })
}

const s3lib = {
  init (mbucket: string, credentials: any) {
    s3client = new S3Client({
      credentials: credentials
    })
    bucket = mbucket
  },
  setClient(client: S3Client){
    this.s3client = client
  },
  async loadJsonObject(key: string) {
    const cmd = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    })
    const { Body } = await s3client.send(cmd)
    const res = await streamToString(Body)
    return JSON.parse(String(res))
  },
  async saveJsonObject(obj: any, key: string) {
    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(obj),
      ContentType: 'application/json'
    })
    await s3client.send(cmd)
  }
}

export = s3lib
