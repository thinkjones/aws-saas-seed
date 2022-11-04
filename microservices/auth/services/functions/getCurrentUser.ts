import { DynamoDB } from "aws-sdk";
import { Table } from "@serverless-stack/node/table";
import User from "User";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function getUserById(
  userId: string
): Promise<User | undefined> {
  const params = {
    Key: { id: userId },
    TableName: Table.Users.tableName,
  };

  const { Item } = await dynamoDb.get(params).promise();

  return Item as User;
}
