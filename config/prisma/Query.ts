import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { MongoItem, FindArgs, WhereInput, QueryOptions, AccWithTag } from "@/app/interfaces/types";
import client from "@/app/libs/prismadb";

const getQuery = <T extends string>(relations: T[], where: WhereInput): FindArgs => {
  const queryOptions: FindArgs = {
    include: relations.reduce((acc: AccWithTag<T>, tag: T) => {
      acc[tag] = true;
      return acc;
    }, {} as AccWithTag<T>),
  };

  if (Object.keys(where).length > 0) {
    queryOptions.where = where as any;
  }

  return queryOptions;
};

const getPrismaData = async <T>(
  queryFunction: (args: FindArgs) => Promise<T>,
  relations: string[] = [],
  where: WhereInput = {} as WhereInput
): Promise<T> => {
  try {
    const queryOptions = getQuery(relations, where);
    const data = await queryFunction(queryOptions);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await prisma!.$disconnect();
  }
};

export default getPrismaData;
