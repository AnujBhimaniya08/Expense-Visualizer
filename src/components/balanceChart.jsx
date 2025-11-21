import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useExpenseContext } from "@/context/expenseAmountContext";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PieChartIcon from "@mui/icons-material/PieChart";
import Tooltip from "@mui/material/Tooltip";
export default function BalanceChart() {
  const { expenseAmount, incomeAmount } = useExpenseContext();
  const [openSmPieChartDialog, setOpenSmPieChartDialog] = useState(false);
  return (
    <div className="mr-3 mt-8  ">
      {expenseAmount || incomeAmount ? (
        <div>
          <div className="block max-md:hidden">
            <PieChart
              fontSize={1000}
              series={[
                {
                  data: [
                    { id: 0, value: expenseAmount, label: "expense" },
                    { id: 1, value: incomeAmount, label: "income" },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </div>{" "}
          <div
            className=" max-md:block relative right-10 top-15   hidden h-25  w-25"
            onClick={() => setOpenSmPieChartDialog(true)}
          >
            {" "}
            <Tooltip title={"Click this icon to see the chart"} arrow>
              <PieChartIcon sx={{ fontSize: 90 }} />
            </Tooltip>
            <Dialog
              open={openSmPieChartDialog}
              onClick={() => setOpenSmPieChartDialog(false)}
            >
              <DialogContent>
                <PieChart
                  fontSize={1000}
                  series={[
                    {
                      data: [
                        { id: 0, value: expenseAmount, label: "expense" },
                        { id: 1, value: incomeAmount, label: "income" },
                      ],
                    },
                  ]}
                  width={200}
                  height={200}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className=" border-2 px-4 py-2 relative right-20 top-18 ">
          <Typography variant="h6" sx={2}>
            Add your first transaction from above!
          </Typography>{" "}
        </div>
      )}
    </div>
  );
}
