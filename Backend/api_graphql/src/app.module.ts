import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ChantiersResolver } from './resolvers/chantiers.resolver';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:secret@mongo_db:27017/btp_module_db?authSource=admin',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [ChantiersResolver],
})
export class AppModule {}
