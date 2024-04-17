import Layout from "@/components/Layout";
import CardEvent from "@/components/CardEvent";
import styles from '../styles/Event.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import 'antd/dist/antd.css'; 
// import { Button, Space, Switch } from 'antd';

export default function Events() {

    const [cardEvent, setCardEvent] = useState([]);
    // toggle switch calendar/list
    // const [disabled, setDisabled] = useState(true);
    // const toggle = () => {
    //   setDisabled(!disabled);
    // };
    // const card = cardEvent.map((dataCard, i) => {
    //     return <CardEvent key={i} {...dataCard} />;
    // })

    return (
        <Layout isSelected="events">
            {/* <Space direction="vertical">
                <Switch disabled={disabled} defaultChecked />
                <Button type="primary" onClick={toggle}>
                    Toggle disabled
                </Button>
            </Space> */}
            
            <div className={styles.eventTitle}>
                <h1>Mes évènements</h1>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.eventContainer}> 
                    <div>
                        {/* { card } */}
                        <CardEvent />
                    
                    </div>
                </div>
            </div>
        </Layout>
    )
}


