import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useExpenseContext } from "@/context/expenseAmountContext";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ErrorIcon from "@mui/icons-material/Error";
import AddCircleIcon from "@mui/icons-material/AddCircle";
export default function TransactionButton() {
  const [openDialog, setOpenDialog] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [alignment, setAlignment] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { selectedExpense, selectedIncome } = useExpenseContext();
  const handleClose = () => {
    setOpenDialog(!openDialog);
    setRadioValue("");
    setErrorMsg("");
    setAlignment("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    const description = formJson.Description;
    const amount = formJson.Amount;
    const type = radioValue;
    const date = new Date();
    const categoryTag = alignment;
    // console.log(description, amount, type);
    setRadioValue(null);
    setAlignment("");
    if (type === "expense" && categoryTag) {
      selectedExpense(description, amount, categoryTag, date.toLocaleString());
      setErrorMsg("");
    }
    if (type === "income" && categoryTag) {
      selectedIncome(description, amount, categoryTag, date.toLocaleString());
      setErrorMsg("");
    } else {
      if (type) {
        setRadioValue(type);
        setErrorMsg("Please choose the category Tag");
      } else {
        setErrorMsg("Please choose the tag & type of transaction ");
      }
    }
    if (description && amount && type && categoryTag) {
      handleClose();
    }
  };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className=" m-4">
      <button
        className=" block md:hidden rounded-full   relative bottom-1 hover:scale-150 transition-all   cursor-pointer text-white"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <AddCircleIcon sx={{ fontSize: 65 }} color="primary" />
      </button>

      <button
        className="bg-blue-400 text-lg font-medium md:block hidden rounded-md p-2 cursor-pointer text-white"
        onClick={() => setOpenDialog(!openDialog)}
      >
        Add transaction
      </button>
      {openDialog ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle fontSize={30}>Add Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText fontSize={20}>
              Submit all of your transactions
            </DialogContentText>
            <form onSubmit={handleSubmit} id="description-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="Amount"
                label="Amount"
                type="text"
                fullWidth
                variant="standard"
              />
            </form>
            <RadioGroup
              row
              required
              aria-required
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="RadioRowButton"
              value={radioValue}
              onClick={(event) =>
                radioValue === event.target.value
                  ? setRadioValue("")
                  : setRadioValue(event.target.value)
              }
            >
              <FormControlLabel
                
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
            <ToggleButtonGroup
              color="secondary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              className="my-2 outline-1"
            >
              {" "}
              {radioValue === "expense" ? (
                <div>
                  <ToggleButton value="trip">Trip</ToggleButton>
                  <ToggleButton value="drinks">Drinks</ToggleButton>
                  <ToggleButton value="meal">Meal</ToggleButton>
                  <ToggleButton value="grocery">Grocery</ToggleButton>
                  <ToggleButton value="friends">Friends</ToggleButton>
                  <ToggleButton value="personal">Personal</ToggleButton>
                </div>
              ) : null}
              {radioValue === "income" ? (
                <div>
                  <ToggleButton value="business">Business</ToggleButton>
                  <ToggleButton value="family">Family</ToggleButton>
                  <ToggleButton value="stocks">Stocks</ToggleButton>
                  <ToggleButton value="trade">Trade</ToggleButton>
                  <ToggleButton value="friends">Friends</ToggleButton>
                  <ToggleButton value="salary">Salary</ToggleButton>
                </div>
              ) : null}
            </ToggleButtonGroup>
            {errorMsg ? (
              <DialogContent className="text-red-400">
                <h3 className="flex gap-1">
                  <ErrorIcon />
                  {`${errorMsg}`}
                </h3>
              </DialogContent>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="description-form">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}
