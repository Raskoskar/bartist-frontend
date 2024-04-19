import Layout from "@/components/Layout"
import styles from "@/styles/Propositions.module.css"
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import CardBooking from "@/components/cardBooking";
import { displayAllBookings } from '../api/bookings';


export default function Propositions() {
    const user = useSelector((state) => state.user.value);
    // const [bookings, setBookings] = useState([]); 


    // useEffect(() => {
    //     displayAllBookings()
    //     .then(data => {
    //         setBookings(data);
    //         console.log('data',data);
    //         console.log('bookings',bookings)
    //     });
    // }, []);

    const dataBookings = [
        { title:'title',
        picture:'picture',
        venue:'66212a9503d7632e7f922efc',
        status:'Pending',
        description:'description',
        date:'2024-04-18T22:00:00.000+00:00',
        rate:100,
        hour_start:'21:00',
        duration:2,
        creatorIsVenue: false,
    },
    { title:'title',
    picture:'picture',
    venue:'venue',
    status:'Confirmed',
    description:'description',
    date:'2024-04-18T22:00:00.000+00:00',
    rate:100,
    hour_start:'21:00',
    duration:3,
    creatorIsVenue: false,
},
      ];

    const booking = dataBookings.map((data, i ) => {
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


