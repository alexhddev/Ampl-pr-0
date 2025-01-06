import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnIdentityPool, CfnIdentityPoolRoleAttachment, CfnUserPoolGroup, UserPool } from 'aws-cdk-lib/aws-cognito';
import { FederatedPrincipal, Role } from 'aws-cdk-lib/aws-iam';
import { Bucket, HttpMethods, ObjectOwnership } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoViewerBackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const photosBucket = new Bucket(this, 'photosBucket', {
      cors: [{
        allowedMethods: [
          HttpMethods.HEAD,
          HttpMethods.GET,
          HttpMethods.PUT
        ],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }],
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false
      }
    })

    new CfnOutput(this, 'photosBucketName', { value: photosBucket.bucketName })

    // Cognito components:
    const userPool = new UserPool(this, 'PhotoViewers', {
      signInAliases: {
        email: true,
        username: true
      },
    })
    new CfnOutput(this, 'userPoolId', { value: userPool.userPoolId })
    const userPoolClient = userPool.addClient('PhotoViewersClient', {
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: true
      }
    })
    new CfnOutput(this, 'userPoolWebClientId', { value: userPoolClient.userPoolClientId })

    const adminsGroup = new CfnUserPoolGroup(this, 'admins', {
      userPoolId: userPool.userPoolId,
      groupName: 'admins',
    })

    const identityPool = new CfnIdentityPool(this, 'PhotoViewersIdentityPool', {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [{
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName
      }]
    })
    new CfnOutput(this, 'identityPoolId', { value: identityPool.ref })

    const authenticatedRole = new Role(this, 'CognitoDefaultAuthenticatedRole', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'authenticated'
        }
      },
        'sts:AssumeRoleWithWebIdentity'
      )
    });

    const guestRole = new Role(this, 'CognitoDefaultGuestRole', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'unauthenticated'
        }
      },
        'sts:AssumeRoleWithWebIdentity'
      )
    });

    const adminRole = new Role(this, 'CognitoAdminRole', {
      assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
        StringEquals: {
          'cognito-identity.amazonaws.com:aud': identityPool.ref
        },
        'ForAnyValue:StringLike': {
          'cognito-identity.amazonaws.com:amr': 'authenticated'
        }
      },
        'sts:AssumeRoleWithWebIdentity'
      )
    });

    new CfnIdentityPoolRoleAttachment(this, 'RolesAttachment', {
      identityPoolId: identityPool.ref,
      roles: {
          'authenticated': authenticatedRole.roleArn,
          'unauthenticated': guestRole.roleArn
      },
      roleMappings: {
          adminsMapping: {
              type: 'Token',
              ambiguousRoleResolution: 'AuthenticatedRole',
              identityProvider: `${userPool.userPoolProviderName}:${userPoolClient.userPoolClientId}`
          }
      }
  })




  }
}
