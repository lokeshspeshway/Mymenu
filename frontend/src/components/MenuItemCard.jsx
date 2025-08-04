import React from 'react';

const MenuItemCard = ({ item }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ₹{item.price}</p>
      {item.image && <img src={`data:image/jpeg;base64,${item.image}`} alt="menu" width={100} />}
    </div>
  );
};

export default MenuItemCard;