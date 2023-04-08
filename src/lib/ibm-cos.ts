import { Credentials, S3 } from 'ibm-cos-sdk';

const ibmCOS = new S3({
  endpoint: String(process.env.IBM_COS_ENDPOINT),
  apiKeyId: String(process.env.IBM_COS_API_KEY_ID),
  ibmAuthEndpoint: String(process.env.IBM_COS_AUTH_ENDPOINT),
  serviceInstanceId: String(process.env.IBM_COS_SERVICE_INSTANCE_ID),
  credentials: new Credentials({
    accessKeyId: String(process.env.IBM_COS_CREDENTIALS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.IBM_COS_CREDENTIALS_SECRET_ACCESS_KEY_ID)
  }),
  signatureVersion: 'v4',
});

export { ibmCOS };
