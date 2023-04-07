import { S3 } from 'ibm-cos-sdk';

const ibmCOS = new S3({
  endpoint: 'https://s3.us-south.cloud-object-storage.appdomain.cloud',
  apiKeyId: 'SlI_Qw6KeCbBtgYewA80CqCdkzeN1_RQhZa1che-CYl5',
  ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
  serviceInstanceId: 'crn:v1:bluemix:public:iam-identity::a/afabd2ef74104ab4962753cb0b4e482e::serviceid:ServiceId-240e4423-269c-40a1-b13d-28407dfdef56',
});

export { ibmCOS };
