import Head from "next/head";
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
  const isVenue = user.isVenue;

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.blurBg}>
        <div className={styles.main}>
          <aside className={styles.sideMenu}>
            <div className={styles.logoContainer}>
              <Image
              className={styles.logo}
                alt="logo"
                src="/assets/logo.png"
                width={150}
                height={150}
              />
              <h2 className={styles.logoName}>
                <span>Bar</span>Tist
              </h2>
            </div>
            <nav className={styles.links}>
              <Link href="/Events" passHref>
                <span
                  className={
                    router.pathname === "/Events"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mes évènements
                </span>
              </Link>
              {isVenue && (
                <Link href="/CreateEvent" passHref>
                  <span
                    className={
                      router.pathname === "/CreateEvent"
                        ? styles.selected
                        : styles.menuItem
                    }
                  >
                    Créer un évènement
                  </span>
                </Link>
              )}
              <Link href="/Search" passHref>
                <span
                  className={
                    router.pathname === "/Search"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  {isVenue
                    ? "Rechercher un artiste"
                    : "Rechercher un évènement"}
                </span>
              </Link>
              <Link href="/Propositions" passHref>
                <span
                  className={
                    router.pathname === "/Propositions"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mes propositions
                </span>
              </Link>
              <Link href="/Profile" passHref>
                <span
                  className={
                    router.pathname === "/Profile"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mon Profil
                </span>
              </Link>
            </nav>
            <button onClick={handleLogOut} className={styles.logoutButton}>
              Log out
            </button>
          </aside>
          <div className={styles.center}>
            <header className={styles.header}>
              <>
                {isVenue ? (
                  <button
                    onClick={() => router.push("/CreateEvent")}
                    className={styles.button}
                  >
                    Créer un évènement
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/Search")}
                    className={styles.button}
                  >
                    Chercher un évènement
                  </button>
                )}
              </>
              <div className={styles.rightContent}>
                <Image
                  src="/assets/user-icon.png"
                  alt="Profil"
                  width={40}
                  height={40}
                  onClick={() => router.push("/Profile")}
                />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.pseudo}</p>
                </div>
              </div>
            </header>
            <main className={styles.content}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
