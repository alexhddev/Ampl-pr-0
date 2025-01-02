import { APIGatewayProxyEvent } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent) => {
    if (isAdmin(event)){
        return {
            statusCode: 200,
            body: JSON.stringify('Oh Amin my admin!'),
        };
    }
    return {
        statusCode: 403,
        body: JSON.stringify('Forbidden, you are not an Admin!!!'),
    };
};

function isAdmin(event: APIGatewayProxyEvent){
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    }
    return false;
}
