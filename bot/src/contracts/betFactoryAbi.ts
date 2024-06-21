export const betFactoryAbi = [
  {
    inputs: [{ internalType: "uint256", name: "_initialFee", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "BET__BadInput", type: "error" },
  { inputs: [], name: "BET__FailedEthTransfer", type: "error" },
  { inputs: [], name: "BET__FailedTokenTransfer", type: "error" },
  { inputs: [], name: "BET__FeeNotEnough", type: "error" },
  { inputs: [], name: "BET__Unauthorized", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetCreated",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_betId", type: "uint256" }],
    name: "betAddresses",
    outputs: [
      { internalType: "address", name: "contractAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_contractAddress", type: "address" },
    ],
    name: "betIds",
    outputs: [{ internalType: "uint256", name: "betId", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newFee", type: "uint256" }],
    name: "changeFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_participant", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "string", name: "_message", type: "string" },
      { internalType: "address", name: "_judge", type: "address" },
      { internalType: "uint256", name: "_validFor", type: "uint256" },
    ],
    name: "createBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "userBetCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "userBets",
    outputs: [
      { internalType: "uint256", name: "betId", type: "uint256" },
      { internalType: "address", name: "contractAddress", type: "address" },
      { internalType: "bool", name: "isCreator", type: "bool" },
      { internalType: "bool", name: "isParticipant", type: "bool" },
      { internalType: "bool", name: "isJudge", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
