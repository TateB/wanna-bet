import { Env, TransactionContext } from "frog";
import { Address, isAddress } from "viem";
import { z } from "zod";
import { betAbi } from "../contracts/betAbi";

export const retrieveTxn = async (
  c: TransactionContext<Env, "/tx/retrieve/:contractAddress">
) => {
  const { contractAddress } = c.req.param();
  const AddressSchema = z.custom<Address>(isAddress, "Invalid Address");
  const { success, data: parsedAddress } =
    AddressSchema.safeParse(contractAddress);
  if (!success) throw new Error();

  return c.contract({
    abi: betAbi,
    to: parsedAddress,
    chainId: "eip155:42161",
    functionName: "retrieveTokens",
  });
};
