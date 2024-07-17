"use client";

import { TodoListABI, TodoListAddress } from "@/constants";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import styles from "./page.module.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const { isConnected, address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const [todoIndex, setTodoIndex] = useState(0);
  const [todo, setTodo] = useState("");

  const { data: todos } = useReadContract({
    abi: TodoListABI,
    address: TodoListAddress,
    functionName: "getTodoList",
  });
  console.log("todos", todos);

  const { data: TodoListOwner, error: todoError } = useReadContract({
    abi: TodoListABI,
    address: TodoListAddress,
    functionName: "owner",
  });
  console.log("Todo owner", TodoListOwner);
  console.log("Address logged in", address);
  const { data: singleTodo } = useReadContract({
    abi: TodoListABI,
    address: TodoListAddress,
    functionName: "getTodo",
    args: [todoIndex],
  });
  // const [todo, isCompleted] = Todo;

  async function completeTodo() {
    setLoading(true);
    if (!isConnected) {
      window.alert("Please connect your wallet to create a proposal.");
      setLoading(false);
      return;
    }
    console.log("passed isConnected");
    console.log("isConnected", isConnected);
    try {
      await writeContract({
        address: TodoListAddress,
        abi: TodoListABI,
        functionName: "completedTodo",
        args: [todoIndex],
      });
      console.log("todo added");
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  async function addTodo() {
    setLoading(true);
    if (!isConnected) {
      window.alert("Please connect your wallet to create a proposal.");
      setLoading(false);
      return;
    }
    console.log("passed isConnected");
    console.log("isConnected", isConnected);
    try {
      await writeContract({
        address: TodoListAddress,
        abi: TodoListABI,
        functionName: "add",
        args: [todo],
      });
      console.log("todo added");
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  console.log("isConfirmed", isConfirmed);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!isConnected)
    return (
      <div>
        <ConnectButton />
      </div>
    );
  return (
    <div className={inter.className}>
      <Head>
        <title>Todo List Dapp</title>
        <meta name="description" content="TodoList Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.description}>{TodoListOwner}</div>
        <div className={styles.container}>
          <label> Add Todo : </label>
          <input
            placeholder="add todo"
            type="string"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className={styles.button2} onClick={addTodo}>
            Add
          </button>
        </div>
        <div className={styles.container}>
          <label> Get Todo : </label>
          <input
            placeholder="Index of Todo"
            type="number"
            onChange={(e) => setTodoIndex(Number(e.target.value))}
          />
          <div>
            {singleTodo && (
              <div className={styles.card}>
                <p>Todo: {singleTodo.todo}</p>
                <p>
                  Status:{" "}
                  {singleTodo.isCompleted ? "Completed" : "Not Completed"}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <label> Complete Todo : </label>
          <input
            placeholder="Index of Todo"
            type="number"
            onChange={(e) => setTodoIndex(e.target.value)}
          />
          <button className={styles.button2} onClick={completeTodo}>
            Complete
          </button>
        </div>
        Todos for you
        <div>
          {todos?.map((t, index) => (
            <div key={index} className={styles.card}>
              <p>Todo Index :{index}</p>
              <p>Todo {t.todo}</p>
              <p> Status :{t.isCompleted ? "Completed" : "Not Completed"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
