import { DynamoDB } from "aws-sdk";
import { Table } from "@serverless-stack/node/table";
import User from "User";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function createUser(user: User): Promise<User> {
  const params = {
    Item: user as Record<string, unknown>,
    TableName: Table.Users.tableName,
  };

  await dynamoDb.put(params).promise();

  return user;
}
