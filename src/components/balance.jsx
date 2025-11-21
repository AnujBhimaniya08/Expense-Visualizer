import { useExpenseContext } from "@/context/expenseAmountContext";

export default function Balance() {
  const { expenseAmount, incomeAmount } = useExpenseContext();

  return (
    <div className="w-70 ml-4 shrink-0 relative top-10 bg-zinc-100 rounded-xl p-4 ">
      <h1 className="text-3xl relative left-2">
        {incomeAmount - expenseAmount < 0 && (incomeAmount- expenseAmount)
          ? `Balance: -$${Math.abs(incomeAmount - expenseAmount)}`
          : `Balance:  $${Math.abs(incomeAmount - expenseAmount)} `}
      </h1>
      <div className=" border-1 p-1 m-2 rounded-md ">
        <div className="">
          <div className=" relative left-15 text-4xl">${expenseAmount}</div>
          <div className="text-gray-400 relative left-17"> Total Expense</div>
        </div>
        <div>
          <h1 className=" relative left-15 text-4xl">${incomeAmount}</h1>
          <h3 className="text-gray-400 relative left-17"> Total Income</h3>
        </div>
      </div>
    </div>
  );
}
