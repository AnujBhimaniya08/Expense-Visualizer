"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { BarChart } from "@mui/x-charts";
import { useExpenseContext } from "@/context/expenseAmountContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordianComponent from "./accordianComponent";
import Draggable from "react-draggable";
import ErrorIcon from "@mui/icons-material/Error";

import Tooltip from "@mui/material/Tooltip";
const ExpenseGraph = ({ timePeriod }) => {
  const { expenseComingLocal } = useExpenseContext();
  const [personal, setPersonal] = useState([]);
  const [trip, setTrip] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [meal, setMeal] = useState([]);
  const [grocery, setGrocery] = useState([]);
  const [friends, setFriends] = useState([]);
  const [flag, setFlag] = useState(false);
  const [colorFlag, setColorFlag] = useState(false);
  const [category, setCategory] = useState("Sample");
  const [showDraggableMsg, setShowDraggableMsg] = useState(true);

  const nodeRef = useRef(null);
  const graphValue = (category) => {
    let totalAmount = 0;
    const categoryExpenses = expenseComingLocal.filter(
      (item) => item.tag === category
    );

    if (categoryExpenses.length > 0) {
      let todayDate = new Date();
      const newTodayDate = parseInt(todayDate.toDateString().split(" ")[2]);
      const dateDiff = newTodayDate - timePeriod;
      categoryExpenses.map((item) => {
        const itemDate = parseInt(item.date.split("/")[1]);

        for (let i = dateDiff; i <= newTodayDate; i++) {
          if (i === itemDate) {
            totalAmount += parseInt(item.amount);
          }
        }
      });
    }

    return totalAmount;
  };
  const settingStates = (item) => {
    setColorFlag(!colorFlag);
    setCategory(item);
    setFlag(!flag);

    // setCategory();
  };

  useEffect(() => {
    let changedCategory = `${category
      .split("")[0]
      .toLowerCase()}${category.slice(1)}`;

    const categoryExpenses = expenseComingLocal.filter(
      (item) => item.tag === changedCategory
    );
    const categoryMap = {
      Personal: setPersonal,
      Drinks: setDrinks,
      Trip: setTrip,
      Meal: setMeal,
      Grocery: setGrocery,
      Friends: setFriends,
    };
    categoryMap[category]?.(categoryExpenses);
  }, [category, flag, expenseComingLocal]);
  return (
    <div className=" max-lg:w-4/12 ">
      <div className=" max-lg:w-4/12 shrink-0  absolute left-50 ">
        <BarChart
          series={[
            {
              id: 0,
              data: [graphValue("trip")],
              label: "Trip",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 1,
              data: [graphValue("drinks")],
              label: "Drinks",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 2,
              data: [graphValue("meal")],
              label: "Meal",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 3,
              data: [graphValue("grocery")],
              label: "Grocery",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 4,
              data: [graphValue("friends")],
              label: "Friends",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 5,
              data: [graphValue("personal")],
              label: "Personal",
              labelMarkType: "HTMLCircle",
            },
          ]}
          xAxis={[{ data: ["Expenses"] }]}
          height={400}
          width={700}
        />
      </div>
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          onClick={() => setShowDraggableMsg(false)}
          className="absolute lg:hidden  max-lg:block  left-100 cursor-move p-3 rounded-xl bg-blue-100 w-2sm    gap-3"
        >
          <div className="   ">
            {showDraggableMsg ? (
              <div className="text-red-400">{"this is draggable div"}</div>
            ) : null}
            {["Trip", "Drinks", "Meal", "Grocery", "Friends", "Personal"].map(
              (item, index) => (
                <div
                  className={`w-70 my-2 ${colorFlag ? "bg-amber-400" : null}`}
                  key={index}
                >
                  <Accordion onClick={() => settingStates(item)}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon onClick={() => settingStates(item)} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{item}</Typography>
                    </AccordionSummary>
                    <Suspense>
                      <AccordionDetails>
                        {item === "Personal" ? (
                          <div>
                            {personal && personal.length > 0 ? (
                              personal.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Trip" ? (
                          <div>
                            {trip && trip.length > 0 ? (
                              trip.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Drinks" ? (
                          <div>
                            {drinks && drinks.length > 0 ? (
                              drinks.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Grocery" ? (
                          <div>
                            {grocery && grocery.length > 0 ? (
                              grocery.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Friends" ? (
                          <div>
                            {friends && friends.length > 0 ? (
                              friends.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Meal" ? (
                          <div>
                            {meal && meal.length > 0 ? (
                              meal.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                      </AccordionDetails>
                    </Suspense>
                  </Accordion>
                </div>
              )
            )}
          </div>
        </div>
      </Draggable>{" "}
      <div className="absolute lg:block  max-lg:hidden left-250  p-3 rounded-xl bg-blue-100 w-2sm    gap-3">
        <div className="   ">
          {["Trip", "Drinks", "Meal", "Grocery", "Friends", "Personal"].map(
              (item, index) => (
                <div
                  className={`w-70 my-2 ${colorFlag ? "bg-amber-400" : null}`}
                  key={index}
                >
                  <Accordion onClick={() => settingStates(item)}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon onClick={() => settingStates(item)} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{item}</Typography>
                    </AccordionSummary>
                    <Suspense>
                      <AccordionDetails>
                        {item === "Personal" ? (
                          <div>
                            {personal && personal.length > 0 ? (
                              personal.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Trip" ? (
                          <div>
                            {trip && trip.length > 0 ? (
                              trip.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Drinks" ? (
                          <div>
                            {drinks && drinks.length > 0 ? (
                              drinks.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Grocery" ? (
                          <div>
                            {grocery && grocery.length > 0 ? (
                              grocery.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Friends" ? (
                          <div>
                            {friends && friends.length > 0 ? (
                              friends.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Meal" ? (
                          <div>
                            {meal && meal.length > 0 ? (
                              meal.map((item, index) => (
                                <AccordianComponent item={item} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                      </AccordionDetails>
                    </Suspense>
                  </Accordion>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseGraph;
