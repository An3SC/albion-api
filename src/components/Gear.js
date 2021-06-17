import React from 'react';

const Gear = ({ gear, killer }) => {
    const url = 'https://render.albiononline.com/v1/item/';

    return (
        <div>
            {killer && (
                <div className="gear">
                    <div className="item1">
                        {gear && gear.Bag && <img src={url + gear.Bag.Type} alt="bag" />}
                    </div>
                    <div className="item2">
                        {gear && gear.Head && (
                            <img src={url + gear.Head.Type} alt="head" />
                        )}
                    </div>
                    <div className="item3">
                        {gear && gear.Cape && (
                            <img src={url + gear.Cape.Type} alt="cape" />
                        )}
                    </div>
                    <div className="item4">
                        {gear && gear.MainHand && (
                            <img src={url + gear.MainHand.Type} alt="mainHand" />
                        )}
                    </div>
                    <div className="item5">
                        {gear && gear.Armor && (
                            <img src={url + gear.Armor.Type} alt="armor" />
                        )}
                    </div>
                    <div className="item6">
                        {gear && gear.OffHand && (
                            <img src={url + gear.OffHand.Type} alt="offHand" />
                        )}
                    </div>
                    <div className="item7">
                        {gear && gear.Food && (
                            <div>
                                <img src={url + gear.Food.Type} alt="food" />
                                <div className="count">{gear.Food.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item8">
                        {gear && gear.Shoes && (
                            <img src={url + gear.Shoes.Type} alt="shoes" />
                        )}
                    </div>
                    <div className="item9">
                        {gear && gear.Potion && (
                            <div>
                                <img src={url + gear.Potion.Type} alt="potion" />
                                <div className="count">{gear.Potion.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item10">
                        {gear && gear.Mount && (
                            <img src={url + gear.Mount.Type} alt="mount" />
                        )}
                    </div>
                </div>
            )}
            {!killer && (
                <div className="gear">
                    <div className="item1">
                        {gear && gear.Bag && <img src={url + gear.Bag.Type} alt="bag" />}
                    </div>
                    <div className="item2">
                        {gear && gear.Head && (
                            <img src={url + gear.Head.Type} alt="head" />
                        )}
                    </div>
                    <div className="item3">
                        {gear && gear.Cape && (
                            <img src={url + gear.Cape.Type} alt="cape" />
                        )}
                    </div>
                    <div className="item4">
                        {gear && gear.MainHand && (
                            <img src={url + gear.MainHand.Type} alt="mainHand" />
                        )}
                    </div>
                    <div className="item5">
                        {gear && gear.Armor && (
                            <img src={url + gear.Armor.Type} alt="armor" />
                        )}
                    </div>
                    <div className="item6">
                        {gear && gear.OffHand && (
                            <img src={url + gear.OffHand.Type} alt="offHand" />
                        )}
                    </div>
                    <div className="item7">
                        {gear && gear.Food && (
                            <div>
                                <img src={url + gear.Food.Type} alt="food" />
                                <div className="count">{gear.Food.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item8">
                        {gear && gear.Shoes && (
                            <img src={url + gear.Shoes.Type} alt="shoes" />
                        )}
                    </div>
                    <div className="item9">
                        {gear && gear.Potion && (
                            <div>
                                <img src={url + gear.Potion.Type} alt="potion" />
                                <div className="count">{gear.Potion.Count}</div>
                            </div>
                        )}
                    </div>
                    <div className="item10">
                        {gear && gear.Mount && (
                            <img src={url + gear.Mount.Type} alt="mount" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gear;
