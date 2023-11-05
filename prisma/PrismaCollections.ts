import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { MongoItem, FindArgs, WhereInput } from "@/app/interfaces/types";
import getPrismaData from "@/config/prisma/Query";
import client from "@/app/libs/prismadb";

const getCollection = async <T extends MongoItem>(
  col: string,
  relations: string[] = [],
  where: WhereInput = {}
): Promise<T[]> => {
  return getPrismaData<T[]>(
    (client as any)[col].findMany as (args: FindArgs) => Promise<T[]>,
    relations,
    where
  );
};

const getItem = async (
  col: string,
  relations: string[] = [],
  where: WhereInput = {}
): Promise<MongoItem | null> => {
  return getPrismaData<MongoItem | null>((client as any)[col].findUnique, relations, where);
};

export { getCollection, getItem };
