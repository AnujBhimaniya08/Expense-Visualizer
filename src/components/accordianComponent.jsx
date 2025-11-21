import React from "react";

const AccordianComponent = ({ item }) => {
  const decidingDate = (date) => {
    let todayDate = new Date().toDateString().split(" ")[2];
    let dateDiff = todayDate - date;

    return dateDiff > 0 ? (dateDiff > 1 ? "Earlier" : "Yesterday") : "Today";
  };
  return (
    <div className="flex bg-red-200 border-2 m-1 rounded-lg p-1 justify-between text-sm">
      <div className="flex flex-col">
        <h3 className="text-lg">{item.description}</h3>
        <h3 className="font-bold">{item.amount}</h3>
      </div>

      <span className="bg-green-200 h-7 rounded-xl relative top-2 px-2 py-1">
        {decidingDate(item.date.split("/")[1])}
      </span>
    </div>
  );
};

export default AccordianComponent;
