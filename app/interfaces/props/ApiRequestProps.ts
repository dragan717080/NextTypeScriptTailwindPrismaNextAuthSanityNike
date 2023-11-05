import { NextApiRequest, NextApiResponse } from "next";

export default interface ApiRequestProps {
  req: NextApiRequest | Request;
  res: NextApiResponse;
}
