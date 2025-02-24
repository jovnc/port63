export const concertFactoryAbi = [
  {
    inputs: [],
    name: "concerts",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_date",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalTickets",
        type: "uint256",
      },
    ],
    name: "createConcert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getConcerts",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "concertAddress",
        type: "address",
      },
    ],
    name: "ConcertCreated",
    type: "event",
  },
];
