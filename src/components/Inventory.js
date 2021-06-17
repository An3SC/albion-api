import React, { useEffect, useState } from 'react';

const Inventory = ({ eventId }) => {
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

    const victimInventory = event && event.Victim.Inventory;

    const url = 'https://render.albiononline.com/v1/item/';

    return (
        <div>
            <h1>Inventory</h1>
            <div id="inventory">
                {victimInventory &&
                    victimInventory.map(
                        (i) =>
                            i && (
                                <div className="inventoryItem" key={i.Type}>
                                    <img src={url + i.Type} alt={i.Type} />
                                    <div className="count">{i.Count}</div>
                                </div>
                            )
                    )}
            </div>
        </div>
    );
};

export default Inventory;
