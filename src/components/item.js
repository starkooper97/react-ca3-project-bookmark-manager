import React, { useState } from "react";
// import "./Item.css";

const Item = ({ id, item, list, setList, url, date }) => {
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  const [editItem, setEditItem] = useState(item);
  const [editUrl, setEditUrl] = useState(url);

  const handleEdit = () => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return { ...el, item: editItem, url: editUrl, dateTime: Date.now() };
        }
        return el;
      })
    );
  };

  return (
    <div className="item">
      <input value={editItem} onChange={(e) => setEditItem(e.target.value)} />
      <input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
      <div className="item-date">{new Date(date).toLocaleString()}</div>
      <button onClick={handleEdit}>Save</button>
      <button onClick={() => remove(id)}>Delete</button>
    </div>
  );
};

export default Item;
