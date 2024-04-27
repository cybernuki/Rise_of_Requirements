import {
  DynamoDBClient
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb"
import CommandInterface from "src/interfaces/command.interface";
import ConfigInterface from "src/interfaces/config.interface";

export default class CommandRepository {
  public static _instance: CommandRepository;
  private client: DynamoDBDocumentClient;
  constructor(private config: any) {
    const awsClient = new DynamoDBClient({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,

    })
    this.client = DynamoDBDocumentClient.from(awsClient)
  }


  static getInstance(config: ConfigInterface) {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new CommandRepository(config);
    return this._instance;
  }

  async updateCommand(command: CommandInterface): Promise<UpdateCommandOutput>{
    const payload: UpdateCommandInput = {
      TableName: this.config.tableName,
      Key: {
        'CommandName': command.name
      },
      UpdateExpression: "SET Id = :id",
      ExpressionAttributeValues: {
        ":id" : command.id
      },
      ReturnValues: "UPDATED_NEW",
    }
    const updateCommand = new UpdateCommand(payload);

    try{
     return await this.client.send(updateCommand)
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}