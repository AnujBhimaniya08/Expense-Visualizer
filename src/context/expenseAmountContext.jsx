import { createContext, useContext, useEffect, useState } from "react";

const expenseAmountContext = createContext();
export const useExpenseContext = () => useContext(expenseAmountContext);
export default function ExpenseAmountProvider({ children }) {
  const [expenseAmount, setExpenseAmount] = useState(0); //total expense Exporting
  const [incomeAmount, setIncomeAmount] = useState(0); //total income exporting
  const [flag, setFlag] = useState(false);
  const [expenseArray, setExpenseArray] = useState([]);
  const [incomeArray, setIncomeArray] = useState([]);
  const [expenseComingLocal, setExpenseComingLocal] = useState(null);
  const [incomeComingLocal, setIncomeComingLocal] = useState(null);
  useEffect(() => {
    if (
      localStorage.getItem("expenseTotal") &&
      localStorage.getItem("expenseArray")
    ) {
      if (expenseArray.length > 0) console.log(expenseArray);

      setExpenseAmount(parseInt(localStorage.getItem("expenseTotal")));
      setExpenseComingLocal(JSON.parse(localStorage.getItem("expenseArray")));
      setExpenseArray(JSON.parse(localStorage.getItem("expenseArray")));
    }
    if (
      localStorage.getItem("incomeTotal") &&
      localStorage.getItem("incomeArray")
    ) {
      if (incomeArray.length > 0) console.log(incomeArray);

      setIncomeAmount(parseInt(localStorage.getItem("incomeTotal")));
      setIncomeComingLocal(JSON.parse(localStorage.getItem("incomeArray")));
      setIncomeArray(JSON.parse(localStorage.getItem("incomeArray")));
    }
  }, [flag]);

  const selectedExpense = (description, amount, tag, date) => {
    const expenseTotalAmount = localStorage.getItem("expenseTotal");

    if (expenseTotalAmount) {
      localStorage.setItem(
        "expenseTotal",
        JSON.stringify(parseInt(expenseTotalAmount) + parseInt(amount))
      );
    } else {
      localStorage.setItem("expenseTotal", amount);
    }
    const updatedArray = [...expenseArray, { description, amount, tag, date }];

    setExpenseArray(updatedArray);
    if (updatedArray.length > 0) {
      localStorage.setItem("expenseArray", JSON.stringify(updatedArray));
    }

    setFlag(!flag);
  };
  const selectedIncome = (description, amount, tag, date) => {
    const incomeTotalAmount = localStorage.getItem("incomeTotal");

    if (incomeTotalAmount) {
      localStorage.setItem(
        "incomeTotal",
        JSON.stringify(parseInt(incomeTotalAmount) + parseInt(amount))
      );
    } else {
      localStorage.setItem("incomeTotal", JSON.stringify(parseInt(amount)));
    }
    const updatedArray = [...incomeArray, { description, amount, tag, date }];
    setIncomeArray(updatedArray);
    localStorage.setItem("incomeArray", JSON.stringify(updatedArray));

    setFlag(!flag);
  };
  const updateInLocalStorage = (
    description,
    amount,
    oldDesp,
    oldAmount,
    value,
    date,
    tag
  ) => {
    if (value === "Expense") {
      let newExpenseTotal = expenseAmount - parseInt(oldAmount);
      newExpenseTotal += parseInt(amount);

      localStorage.setItem("expenseTotal", newExpenseTotal);
      const index = expenseArray.findIndex(
        (item) => item.description === oldDesp && item.amount === oldAmount
      );

      const updatedArray = expenseArray.with(index, {
        description,
        amount,
        date,
        tag,
      });
      setExpenseArray(updatedArray);
      localStorage.setItem("expenseArray", JSON.stringify(updatedArray));

      setFlag(!flag);
    }
    if (value === "Income") {
      let newIncomeTotal = incomeAmount - parseInt(oldAmount);
      newIncomeTotal += parseInt(amount);

      localStorage.setItem("incomeTotal", newIncomeTotal);
      const index = incomeArray.findIndex(
        (item) => item.description === oldDesp && item.amount === oldAmount
      );

      let updatedArray = incomeArray.with(index, {
        description,
        amount,
        date,
        tag,
      });
      setIncomeArray(updatedArray);
      localStorage.setItem("incomeArray", JSON.stringify(updatedArray));
      setFlag(!flag);
    }
  };
  const deletethisExpense = (description, amount, date) => {
    const newExpenseTotal = expenseAmount - parseInt(amount);

    localStorage.setItem("expenseTotal", JSON.stringify(newExpenseTotal));

    const updatedArray = expenseArray.filter(
      (item) =>
        !(
          item.description === description &&
          item.amount === amount &&
          item.date === date
        )
    );

    setExpenseArray(updatedArray);
    localStorage.setItem("expenseArray", JSON.stringify(updatedArray));
    setFlag(!flag);
  };
  const deleteThisIncome = (description, amount, date) => {
    let newIncomeTotal = incomeAmount - parseInt(amount);

    localStorage.setItem("incomeTotal", JSON.stringify(newIncomeTotal));
    const updatedArray = incomeArray.filter(
      (item) =>
        !(
          item.description === description &&
          item.amount === amount &&
          item.date === date
        )
    );
    setIncomeArray(updatedArray);
    localStorage.setItem("incomeArray", JSON.stringify(updatedArray));
    setFlag(!flag);
  };
  const value = {
    expenseAmount,
    incomeAmount,
    selectedExpense,
    selectedIncome,
    expenseComingLocal,
    incomeComingLocal,
    updateInLocalStorage,
    deletethisExpense,
    deleteThisIncome,
  };

  return (
    <expenseAmountContext.Provider value={value}>
      {children}
    </expenseAmountContext.Provider>
  );
}
