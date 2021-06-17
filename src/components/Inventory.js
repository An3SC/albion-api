import React from 'react';

const Inventory = ({ inventory }) => {
    console.log(inventory);

    const url = 'https://render.albiononline.com/v1/item/';

    return (
        <div>
            <h1>Inventory</h1>
            <div id="inventory">
                {inventory &&
                    inventory.map(
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
