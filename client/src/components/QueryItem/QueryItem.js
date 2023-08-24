import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import "./QueryItem.css";

function QueryItem({ date, id }) {
  date = new Date(date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  console.log("qi : ", date, day, month, year, id);
  return (
    <li>
      <Card className="query-item">
        <div className="query-item__description">
          <h2>
            Analysis - {id} - {`${day}/${month}/${year}`}
          </h2>
          <Link to={`/history/${id}`}>
            <button>View Details</button>
          </Link>
        </div>
      </Card>
    </li>
  );
}

export default QueryItem;
