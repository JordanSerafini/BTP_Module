import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ChantiersResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
