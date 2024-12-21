import React from 'react';
import Booking from '../Booking/Booking';
import TravelEase from '../TravelEase/TravelEase';
import Featured from '../Featured/Featured';

import FAQ from '../FAQ/FAQ';
import Subscription from '../Subscription/Subscription';
import Destination from './Destination';

function Home() {
    return (
        <main>
            <Booking />
            <TravelEase />
            <Destination />
            <Featured />
            <FAQ />
            <Subscription />
        </main>
    )
}

export default Home;