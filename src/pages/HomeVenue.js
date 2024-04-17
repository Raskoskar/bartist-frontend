import styles from '../styles/HomeVenue.module.css';
import Image from 'next/image';
import React from "react";
import { useState } from "react";
import Layout from '../components/Layout';

function HomeVenue(props) {

  return (
    <Layout isSelected="#HomeVenue">
      <h1>HomeVenue</h1>
    </Layout>
);
}

export default HomeVenue;

