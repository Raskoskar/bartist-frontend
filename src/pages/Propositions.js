import Layout from "@/components/Layout"
import styles from "@/styles/Propositions.module.css"
import { useSelector } from "react-redux";

import { displayAllBookings } from "@/api/bookings";

export default function Propositions() {
    const user = useSelector((state) => state.user.value);


    return (
        <Layout isSelected={"prop"}>
            <div className={styles.main}>
                <h1>Propositions</h1>
            </div>
        </Layout>
    )
}


