import "reflect-metadata";
import { DynamoDB } from 'aws-sdk';
import { Table } from '@serverless-stack/node/table';
import { Service } from "typedi";
import { instanceToPlain } from 'class-transformer';
import { Note, NoteInput } from '~/entities/Note';

@Service()
export default class NoteController {

  async getNote(userId: string, dateCreated: string) {
    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
      Key: { userId, dateCreated },
      TableName: Table.Notes.tableName,
    };
    const { Item } = await dynamoDb.get(params).promise();
    return Item as Note;
  }

  async createNote(userId: string, noteInput: NoteInput): Promise<Note> {
    const dynamoDb = new DynamoDB.DocumentClient();
    const note = Note.fromNoteInput(userId, noteInput);
    const params = {
      Item: instanceToPlain<Note>(note),
      TableName: Table.Notes.tableName,
    };
    await dynamoDb.put(params).promise();
    return note;
  }

}

