import Layout from "@/components/Layout"
import styles from "@/styles/Propositions.module.css"
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import CardBooking from "@/components/cardBooking";
import { displayBookings } from '../api/bookings';


export default function Propositions() {
    const user = useSelector((state) => state.user.value);
    const [bookings, setBookings] = useState([]); 


    useEffect(() => {
        displayBookings(user.token, user.isVenue)
        .then(data => {
            setBookings(data.dataBookings);
            console.log('data',data.dataBookings);        });
    }, []);


    const booking = bookings.map((data, i ) => {
        return (
          <CardBooking
            key={i}
            title={data.title}
            // picture={data.picture}
            venue={data.venue}
            status={data.status}
            description={data.description}
            date={data.date}
            rate={data.rate}
            hour_start={data.hour_start}
            duration={data.duration}

          />
        );
    })


    return (
        <Layout isSelected={"prop"}>
            <div className={styles.main}>
                <h1>Propositions</h1>
                {booking}
            </div>
        </Layout>
    )
}


