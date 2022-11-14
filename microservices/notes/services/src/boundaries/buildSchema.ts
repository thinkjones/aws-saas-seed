import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { NoteResolver } from "../resolvers/Note.resolver";
import path from 'path';

async function bootstrap() {
  console.log('Gene')
  console.log(__dirname + "/../resolvers/*.resolver.{ts,js}")
  await buildSchema({
    validate: { skipMissingProperties: true },
    resolvers: [NoteResolver], //[__dirname + "../**/*.resolver.{ts,js}"],
    emitSchemaFile: path.resolve(__dirname, "schema.gene.gql"),
  });

  // other initialization code, like creating http server
}

bootstrap(); // actually run the async function
