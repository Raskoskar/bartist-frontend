import Layout from "@/components/Layout";
import CardEvent from "@/components/CardEvent";
import styles from '../styles/Event.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { displayEvents } from '../api/events';
// import 'antd/dist/antd.css'; 
// import { Button, Space, Switch } from 'antd';

 function Events() {

    // const [cardEvent, setCardEvent] = useState([]);
    //État local pour stocker les événements récupérés depuis l'api events
    const [events, setEvents] = useState([]); 
    // Creation const token pour recuperer le token du reducer afin de pouvoir s'en servir dans le param
    const token = useSelector(state => state.user.value.token )

    // toggle switch calendar/list
    // const [disabled, setDisabled] = useState(true);
    // const toggle = () => {
    //   setDisabled(!disabled);
    // };
    // const card = cardEvent.map((dataCard, i) => {
    //     return <CardEvent key={i} {...dataCard} />;
    // })

    // Recuperation des events et creation d'une fonction getEvents pour appeller displayEvents
    const getsEvents = async () => {
        try {
            const dataEvent = await displayEvents(token);
            console.log('dataEvent => ', dataEvent);
            console.log('token => ', token);
            if(dataEvent) {
                // console.log('dataEvent => ', dataEvent);
                setEvents(dataEvent);
                return dataEvent;
            }
        } catch (error) {
            console.log('error fetch dataEvent => ', error);
        }
    }

        // appel getEvents lorsqu'on appel le composant
        useEffect(() => {
            getsEvents()
        }, []);

    return (
        <Layout isSelected="events">
            {/* <Space direction="vertical">
                <Switch disabled={disabled} defaultChecked />
                <Button type="primary" onClick={toggle}>
                    Toggle disabled
                </Button>
            </Space> */}
            <div className={styles.container}>
                <div className={styles.eventTitle}>
                    <h1>Mes évènements</h1>
                </div>
                <div className={styles.cardContainer}>
                    {/* { card } */}
                    {/* <CardEvent />                     */}

                    {/* map pour afficher chaque events / preferable de le faire dans le return, comme cela react ne considere pas cardEvent comme un bloc, mais comme plusieur */}
                    {events.map(event => {
                        console.log(event);
                        return <CardEvent event={event} key={event._id}/>
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Events;

