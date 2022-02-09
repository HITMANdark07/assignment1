import React from "react";
import "../App.css";
import axios from "axios";
import Header from "../components/Header"
import moment from "moment";
import EventCard from "../components/EventCard";

function Assignment1() {
  const [data, setData] = React.useState({});
  const [titles, setTitles] = React.useState([]);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [show, setShow] = React.useState(false);
  const init = () => {
    axios
      .get(`https://www.gov.uk/bank-holidays.json`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setTitles(Object.keys(res.data));
          // console.log(Object.keys(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dateChangeHandler = (e) => {
    let name = e.target.name;
    if (name === "start") {
      setStart(e.target.value);
    }
    if (name === "end") {
      setEnd(e.target.value);
    }
    // console.log(name, e.target.value);
  };
  const filterChangeHandler = (e) => {
    let val = e.target.value;
    switch (val) {
      case "w":
        setShow(false);
        setStart(
          moment(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).format(
            "YYYY-MM-DD"
          )
        );
        setEnd(moment(new Date().getTime()).format("YYYY-MM-DD"));
        break;
      case "y":
        setShow(false);
        setStart(
          moment(new Date().getTime() - 24 * 60 * 60 * 1000).format(
            "YYYY-MM-DD"
          )
        );
        setEnd(moment(new Date().getTime()).format("YYYY-MM-DD"));
        break;
      case "m":
        setShow(false);
        setStart(
          moment(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format(
            "YYYY-MM-DD"
          )
        );
        setEnd(moment(new Date().getTime()).format("YYYY-MM-DD"));
        break;
      case 'c':
        setShow(true);
        setStart("");
        setEnd("");
        break;
      default:
        setShow(false);
        setStart("");
        setEnd("");
        break;
    }
  };
  let newTitles = titles.filter((t) => t===place).length>0 ?  titles.filter((t) => t===place) : [...titles];
  console.log(newTitles);
  React.useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <Header active="one" />
      <div>
        <select className="filter" onChange={filterChangeHandler}>
          <option >Filter</option>
          <option value="y">YESTERDAY</option>
          <option value="w">LAST WEEK</option>
          <option value="m">LAST MONTH</option>
          <option value="c">CUSTOM</option>
        </select>
        {show ? (
          <div className="custom-dates">
            <input
              type="date"
              value={start}
              name="start"
              onChange={dateChangeHandler}
            />
            <input
              type="date"
              value={end}
              name="end"
              onChange={dateChangeHandler}
            />
          </div>
        ) : null}
      </div>
      <select className="filter" style={{marginTop:150}} onChange={(e) => {
        setPlace(e.target.value);
      }}>
        <option >ALL</option>
        {titles.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {start === "" || end === "" ? (
        <div className="main-container" style={{marginTop:show?'20px':''}}>
          {newTitles.map((title, idx) => (
            <div key={idx} className="container">
              <h2>{title.toUpperCase()}</h2>
              <div className="events">
                {data[title].events.map((event, i) => (
                  <EventCard event={event} key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="main-container" style={{marginTop:show?'20px':''}}>
          {newTitles.map((title, idx) => (
            <div
              key={idx}
              className="container"
              style={{
                display:
                  data[title].events.filter(
                    (ev) =>
                      new Date(start) < new Date(ev.date) &&
                      new Date(ev.date) < new Date(end)
                  ).length === 0
                    ? "none"
                    : "flex",
              }}
            >
              <h2>{title.toUpperCase()}</h2>
              <div className="events">
                {data[title].events
                  .filter(
                    (ev) =>
                      new Date(start) <= new Date(ev.date) &&
                      new Date(ev.date) <= new Date(end)
                  )
                  .map((event, i) => (
                    <EventCard event={event} key={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Assignment1;
