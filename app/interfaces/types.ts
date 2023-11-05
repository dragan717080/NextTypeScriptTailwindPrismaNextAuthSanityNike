import { Prisma } from "@prisma/client";

type AuthVariant = 'LOGIN' | 'REGISTER';

type StringObject = {
  [key: string]: string;
};

type QueryOptions = {
  include: {
    [key: string]: boolean;
  };
  where?: WhereInput;
};

type AccWithTag<T extends string> = {
  [K in T]: boolean;
};

type MongoObjectIDKey = string & { __isMongoObjectIDKey: true };

type MongoItem = MongoObjectIDKey & { additionalProp: string };

//replace with prisma find args e.g. Prisma.UserFindManyArgs | Prisma.UserFindUniqueArgs | Prisma.SomeOtherModelFindUniqueArgs | Prisma.SomeOtherModelFindUniqueArgs
type FindArgs = any;

//replace with prisma find args e.g. Prisma.UserWhereInput | Prisma.UserWhereUniqueInput | Prisma.SomeOtherModelWhereInput | Prisma.SomeOtherModelWhereUniqueInput | 
type WhereInput = any;

export type { AuthVariant, StringObject, MongoObjectIDKey, MongoItem, FindArgs, WhereInput, QueryOptions, AccWithTag };
