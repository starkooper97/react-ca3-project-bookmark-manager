import React, { useState } from "react";
import "./App.css";
import Item from "./components/item.js";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

const arr = () => {
  let data = localStorage.getItem("url");
  if (data) return JSON.parse(localStorage.getItem("url"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [url, setUrl] = useState("");
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      item: item,
      url: url,
      dateTime: Date.now(),
    };
    e.preventDefault();
    if (item && url) {
      setError("");
      if (validator.isURL(url)) {
        setList([...list, newItem]);
        setItem("");
        setUrl("");
        setDateTime("");
      } else setError("Enter the correct url format.");
    } else {
      setError("Enter both the Required fields.");
    }
  };

  React.useEffect(() => {
    localStorage.setItem("url", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="title">BOOKMARKS</h1>

      <div className="content">
        <form id="bookmark-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="website-name">
              Website Name
            </label>
            <input
              className="form-input"
              type="text"
              id="website-name"
              value={item}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="website-url">
              Website URL
            </label>
            <input
              className="form-input"
              type="text"
              id="website-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <p className="error-message">{error}</p>
          <button className="add-bookmark-btn" type="submit">
            Add Bookmark
          </button>
        </form>
      </div>
      <div>
        {list.map((c, id) => {
          const date = c.dateTime; // format the date and time
          return (
            <Item
              key={id}
              id={c.id}
              item={c.item}
              url={c.url}
              date={date}
              list={list}
              setList={setList}
              setItem={setItem}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
