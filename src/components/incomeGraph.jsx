import React, { Suspense, useEffect, useRef } from "react";
import { BarChart } from "@mui/x-charts";
import { useState } from "react";
import { useExpenseContext } from "@/context/expenseAmountContext";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordianComponent from "./accordianComponent";
import ErrorIcon from "@mui/icons-material/Error";
import Draggable from "react-draggable";

const IncomeGraph = ({ timePeriod }) => {
  const { incomeComingLocal } = useExpenseContext();
  const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState("Sample");
  const [salary, setSalary] = useState([]);
  const [business, setBusiness] = useState([]);
  const [family, setFamily] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [trade, setTrade] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showDraggableMsg, setShowDraggableMsg] = useState(true);
  const nodeRef = useRef(null);
  const graphValue = (category) => {
    let totalAmount = 0;
    const categoryIncome = incomeComingLocal.filter(
      (item) => item.tag === category
    );

    if (categoryIncome.length > 0) {
      let todayDate = new Date();
      const newTodayDate = parseInt(todayDate.toDateString().split(" ")[2]);
      const dateDiff = newTodayDate - timePeriod;
      categoryIncome.map((item) => {
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
    setCategory(item);
    setFlag(!flag);
  };
  useEffect(() => {
    let changedCategory = `${category
      .split("")[0]
      .toLowerCase()}${category.slice(1)}`;

    const categoryExpenses = incomeComingLocal.filter(
      (item) => item.tag === changedCategory
    );
    const categoryMap = {
      Salary: setSalary,
      Business: setBusiness,
      Friends: setFriends,
      Family: setFamily,
      Trade: setTrade,
      Stocks: setStocks,
    };
    categoryMap[category]?.(categoryExpenses);
  }, [category, flag, incomeComingLocal]);
  return (
    <div className="max-lg:w-4/12">
      <div className="max-lg:w-4/12 shrink-0 absolute left-50">
        <BarChart
          series={[
            {
              id: 0,
              data: [graphValue("business")],
              label: "Business",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 1,
              data: [graphValue("family")],
              label: "Family",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 2,
              data: [graphValue("stocks")],
              label: "Stocks",
              labelMarkType: "HTMLCircle",
            },
            {
              id: 3,
              data: [graphValue("trade")],
              label: "Trade",
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
              data: [graphValue("salary")],
              label: "Salary",
              labelMarkType: "HTMLCircle",
            },
          ]}
          showToolbar={true}
          xAxis={[{ data: ["Incomes"] }]}
          height={400}
          width={700}
        />
      </div>
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          onClick={() => setShowDraggableMsg(false)}
          className="absolute left-100 cursor-move p-3 rounded-xl bg-blue-100 w-2sm    gap-3"
        >
          <div className="lg:hidden max-lg:block">
            {showDraggableMsg ? (
              <div className="text-red-400">{"this is draggable div"}</div>
            ) : null}
            {["Business", "Family", "Stocks", "Trade", "Friends", "Salary"].map(
              (item, index) => (
                <div className="w-70 my-2" key={index}>
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
                        {item === "Salary" ? (
                          <div>
                            {salary && salary.length > 0 ? (
                              salary.map((item2, index) => (
                                <AccordianComponent item={item2} key={index} />
                              ))
                            ) : (
                              <h3 className="flex gap-1">
                                <ErrorIcon />
                                {`No transaction with ${item} Tag!`}{" "}
                              </h3>
                            )}
                          </div>
                        ) : null}
                        {item === "Business" ? (
                          <div>
                            {business && business.length > 0 ? (
                              business.map((item, index) => (
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
                        {item === "Family" ? (
                          <div>
                            {family && family.length > 0 ? (
                              family.map((item, index) => (
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
                        {item === "Trade" ? (
                          <div>
                            {trade && trade.length > 0 ? (
                              trade.map((item, index) => (
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
                        {item === "Stocks" ? (
                          <div>
                            {stocks && stocks.length > 0 ? (
                              stocks.map((item, index) => (
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
      </Draggable>
      <div className="lg:block max-lg:hidden absolute left-250 flex p-3 rounded-xl bg-blue-100 w-2sm flex-col   gap-3">
        <div className="">
          {" "}
          {["Business", "Family", "Stocks", "Trade", "Friends", "Salary"].map(
            (item, index) => (
              <div className="w-70 my-2" key={index}>
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
                      {item === "Salary" ? (
                        <div>
                          {salary && salary.length > 0 ? (
                            salary.map((item2, index) => (
                              <AccordianComponent item={item2} key={index} />
                            ))
                          ) : (
                            <h3 className="flex gap-1">
                              <ErrorIcon />
                              {`No transaction with ${item} Tag!`}{" "}
                            </h3>
                          )}
                        </div>
                      ) : null}
                      {item === "Business" ? (
                        <div>
                          {business && business.length > 0 ? (
                            business.map((item, index) => (
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
                      {item === "Family" ? (
                        <div>
                          {family && family.length > 0 ? (
                            family.map((item, index) => (
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
                      {item === "Trade" ? (
                        <div>
                          {trade && trade.length > 0 ? (
                            trade.map((item, index) => (
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
                      {item === "Stocks" ? (
                        <div>
                          {stocks && stocks.length > 0 ? (
                            stocks.map((item, index) => (
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

export default IncomeGraph;
