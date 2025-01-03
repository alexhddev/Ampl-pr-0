#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkApiStack } from '../lib/cdk_api-stack';

const app = new cdk.App();
new CdkApiStack(app, 'CdkApiStack', {

});