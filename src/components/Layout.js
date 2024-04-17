import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { logOut } from "@/reducers/user";
import Image from "next/image";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isVenue = user.isVenue
  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  const handleProfil = () => {
    router.push("/Profil")
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.main}>
        <div className={styles.sideMenu}>
          <div className={styles.logoContainer}>
            <Image
              alt="logo"
              className={styles.logo}
              src="/assets/logo.png"
              width={200}
              height={200}
            />
            <h2 className={styles.logoName}>
              <span>Bar</span>Tist
            </h2>
          </div>
          <div className={styles.links}>
            <Link
              className={
                router.pathname === "/Events"
                  ? styles.selected
                  : styles.menuItem
              }
              href="/Events"
            >
              Mes évènements
            </Link>
            <>
              {isVenue && ( <>
                <Link
                  className={
                    router.pathname === "/CreateEvent"
                      ? styles.selected
                      : styles.menuItem
                  }
                  href="/CreateEvent"
                >
                  Créer un évènement
                </Link>
              </>)}
            </>
            <Link
              className={
                router.pathname === "/Search"
                  ? styles.selected
                  : styles.menuItem
              }
              href="/Search"
            >
              {isVenue
                ? "Rechercher un artiste"
                : "Rechercher un évènement"}
            </Link>
            <Link
              className={
                router.pathname === "/Propositions"
                  ? styles.selected
                  : styles.menuItem
              }
              href="/Propositions"
            >
              Mes propositions
            </Link>
            <Link
              className={
                router.pathname === "/Profile"
                  ? styles.selected
                  : styles.menuItem
              }
              href="/Profile"
            >
              Mon Profil
            </Link>
            
          </div>
          <div>
            <div></div>
          </div>
          <button onClick={() => handleLogOut()}>Log out</button>
        </div>
        <div className={styles.center}>
          <div className={styles.header}>
            <button className={styles.button}>Créer un évènement</button>
            <div className={styles.rightContent}>
              <div className={styles.imgContainer} onClick={() => handleProfil()}></div>
              <div className={styles.userInfo}>
                <p className={styles.name}>{user.pseudo}</p>
              </div>
            </div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
