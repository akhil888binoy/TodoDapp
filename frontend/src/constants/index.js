export const TodoListAddress = "0x6af623C94D2BF2D7d61dDD3C2F3A0E3f8dcCC26b";

export const TodoListABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "add",
    inputs: [{ name: "newtodo", type: "string", internalType: "string" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TodoList.Todo",
        components: [
          { name: "todo", type: "string", internalType: "string" },
          { name: "isCompleted", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "completedTodo",
    inputs: [{ name: "todoIndex", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getTodo",
    inputs: [{ name: "todoIndex", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TodoList.Todo",
        components: [
          { name: "todo", type: "string", internalType: "string" },
          { name: "isCompleted", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTodoList",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct TodoList.Todo[]",
        components: [
          { name: "todo", type: "string", internalType: "string" },
          { name: "isCompleted", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
];
