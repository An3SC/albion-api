import React, { useEffect, useState } from 'react';

const Gear = ({ eventId, killer }) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`/events/${eventId}`, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setEvent(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
        // eslint-disable-next-line
    }, [eventId]);

    const killerGear = event && event.Killer.Equipment;
    const victimGear = event && event.Victim.Equipment;

    const url = 'https://render.albiononline.com/v1/item/';

    return (
        <div>
            {killer && (
                <div className="gear">
                    <div className="item1">
                        {killerGear && killerGear.Bag && (
                            <img src={url + killerGear.Bag.Type} alt="bag" />
                        )}
                    </div>
                    <div className="item2">
                        {killerGear && killerGear.Head && (
                            <img src={url + killerGear.Head.Type} alt="head" />
                        )}
                    </div>
                    <div className="item3">
                        {killerGear && killerGear.Cape && (
                            <img src={url + killerGear.Cape.Type} alt="cape" />
                        )}
                    </div>
                    <div className="item4">
                        {killerGear && killerGear.MainHand && (
                            <img src={url + killerGear.MainHand.Type} alt="mainHand" />
                        )}
                    </div>
                    <div className="item5">
                        {killerGear && killerGear.Armor && (
                            <img src={url + killerGear.Armor.Type} alt="armor" />
                        )}
                    </div>
                    <div className="item6">
                        {killerGear && killerGear.OffHand && (
                            <img src={url + killerGear.OffHand.Type} alt="offHand" />
                        )}
                    </div>
                    <div className="item7">
                        {killerGear && killerGear.Food && (
                            <div>
                                <img src={url + killerGear.Food.Type} alt="food" />
                                <div className="count">{killerGear.Food.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item8">
                        {killerGear && killerGear.Shoes && (
                            <img src={url + killerGear.Shoes.Type} alt="shoes" />
                        )}
                    </div>
                    <div className="item9">
                        {killerGear && killerGear.Potion && (
                            <div>
                                <img src={url + killerGear.Potion.Type} alt="potion" />
                                <div className="count">{killerGear.Potion.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item10">
                        {killerGear && killerGear.Mount && (
                            <img src={url + killerGear.Mount.Type} alt="mount" />
                        )}
                    </div>
                </div>
            )}
            {!killer && (
                <div className="gear">
                    <div className="item1">
                        {victimGear && victimGear.Bag && (
                            <img src={url + victimGear.Bag.Type} alt="bag" />
                        )}
                    </div>
                    <div className="item2">
                        {victimGear && victimGear.Head && (
                            <img src={url + victimGear.Head.Type} alt="head" />
                        )}
                    </div>
                    <div className="item3">
                        {victimGear && victimGear.Cape && (
                            <img src={url + victimGear.Cape.Type} alt="cape" />
                        )}
                    </div>
                    <div className="item4">
                        {victimGear && victimGear.MainHand && (
                            <img src={url + victimGear.MainHand.Type} alt="mainHand" />
                        )}
                    </div>
                    <div className="item5">
                        {victimGear && victimGear.Armor && (
                            <img src={url + victimGear.Armor.Type} alt="armor" />
                        )}
                    </div>
                    <div className="item6">
                        {victimGear && victimGear.OffHand && (
                            <img src={url + victimGear.OffHand.Type} alt="offHand" />
                        )}
                    </div>
                    <div className="item7">
                        {victimGear && victimGear.Food && (
                            <div>
                                <img src={url + victimGear.Food.Type} alt="food" />
                                <div className="count">{victimGear.Food.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item8">
                        {victimGear && victimGear.Shoes && (
                            <img src={url + victimGear.Shoes.Type} alt="shoes" />
                        )}
                    </div>
                    <div className="item9">
                        {victimGear && victimGear.Potion && (
                            <div>
                                <img src={url + victimGear.Potion.Type} alt="potion" />
                                <div className="count">{victimGear.Potion.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item10">
                        {victimGear && victimGear.Mount && (
                            <img src={url + victimGear.Mount.Type} alt="mount" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gear;
