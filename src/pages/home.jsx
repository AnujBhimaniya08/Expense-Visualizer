import React from "react";
import ExpenseSheet from "../components/expenseSheet";
import IncomeSheet from "../components/incomeSheet";
import { Link } from "react-router-dom";
import Balance from "../components/balance";
import TransactionButton from "../components/addTransactionButton";
import BalanceChart from "@/components/balanceChart";

function Home() {
  
  return (
    <>
      <div className="">
        <div
          className="border-2 w-8/12 max-lg:w-8/12 max-md:w-9/12 max-sm:w-10/12  mx-auto my-4 rounded-xl  bg-zinc-200"
          id="mainDiv"
        >
          <div className="flex flex-row justify-between">
            <div className="mt-3 mb-3 ml-5 h-15 cursor-pointer  shrink-0 bg-fuchsia-300 w-77 rounded-sm p-2">
              <span className="text-3xl  flex gap-1">
                <span className="shrink-0">Expense Visualiser</span>
                <span>💸</span>{" "}
              </span>
            </div>
            <div className="">
              <TransactionButton />
            </div>
          </div>

          <div className="flex justify-between">
            <Balance />
            <BalanceChart />
          </div>

          <div className="flex justify-between mt-18 mb-2 gap-5 mx-2 h-83 max-md:gap-2 max-lg:gap-2    bg-zinc-100 px-8 py-4  rounded-xl">
            <div className=" relative shrink-0 top-4 ">
              <ExpenseSheet />
            </div>
            <div className=" relative shrink-0 top-4">
              <IncomeSheet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
