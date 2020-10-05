import * as path from "path";

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : "local"

const envPath = path.join(__dirname, `../../.env.${nodeEnv}`)

require("dotenv").config({ path: envPath })

export const config = {
  SELF_HOST: process.env.SELF_HOST,
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  awsRegion: process.env.AWS_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_PUBLIC_BUCKET_NAME: process.env.AWS_PUBLIC_BUCKET_NAME,
  CRYPTO_COMPARE_HOST: process.env.CRYPTO_COMPARE_HOST,
  CRYPTO_COMPARE_API_KEY: process.env.CRYPTO_COMPARE_API_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
}