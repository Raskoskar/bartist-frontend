import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "./Login"
import { useSelector } from "react-redux";
import Search from "./Search";
import { useRef } from "react";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });


export default function App() {
  const user = useSelector(state => state.user.value)
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Bartist</title>
        <meta name="description" content="mise en relation artiste & lieux de représentations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <>{user.isConnected? router.push('/Events') : router.push('/Login')}</>
    </>
  );
}
