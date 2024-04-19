import ArtistsSearch from "@/components/ArtistsSearch";
import Layout from "@/components/Layout";
import EventSearch from "@/components/EventSearch";
import styles from "@/styles/Search.module.css";
import { useSelector } from "react-redux";

export default function Search() {
    const user = useSelector(state => state.user.value);
    
    return (
        <Layout>
            <div className={styles.mainContent}>{
                user.isVenue ?  <ArtistsSearch/> : <EventSearch/>
            }
            </div>
        </Layout>
    );
}
