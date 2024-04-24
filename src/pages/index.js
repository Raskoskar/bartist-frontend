import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "../components/Login"
import { useSelector } from "react-redux";
import Search from "./Search";
import { useRef } from "react";
const inter = Inter({ subsets: ["latin"] });


export default function App() {
  const user = useSelector(state => state.user.value)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <>{user.isConnected? <Search/> : <Login/>}</>
    </>
  );
}
