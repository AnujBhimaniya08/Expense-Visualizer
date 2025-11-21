import { useExpenseContext } from "@/context/expenseAmountContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ExpenseGraph from "./expenseGraph";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import TooltipComponent from "./tooltipComponent";
export default function ExpenseSheet() {
  const { expenseComingLocal, updateInLocalStorage, deletethisExpense } =
    useExpenseContext();
  // if (expenseComingLocal) console.log(expenseComingLocal);

  const [despToUpdate, setDesptoUpdate] = useState(null);
  const [amountToUpdate, setAmountToUpdate] = useState(null);
  const [despToDelete, setDespToDelete] = useState(null);
  const [amountToDelete, setAmountToDelete] = useState(null);
  const [dateToDelete, setdateToDelete] = useState(null);
  const [dateToGoInUpdateFn, setDateToGoInUpdateFn] = useState(null);
  const [tagToGoInUpdateFn, setTagToGoInUpdateFn] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [newDesp, setNewDesp] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [timePeriod, setTimePeriod] = useState(0);
  const [flagDelete, setFlagDelete] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [openDialogGraph, setOpenDialogGraph] = useState(false);
  useEffect(() => {
    if (newDesp && newAmount) {
      updateInLocalStorage(
        newDesp,
        newAmount,
        despToUpdate,
        amountToUpdate,
        category,
        dateToGoInUpdateFn,
        tagToGoInUpdateFn
      );
    }
  }, [flag]);
  // let object = { name: "Anuj", age: "20" };
  // console.log(typeof expenseComingLocal.length);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget); //anchorEL is the property for menu UI item
    setSelectedIndex(index); //important step
  };
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  const handleClose = () => {
    setAnchorEl(null);
    setOpenDialogEdit(false);
    setOpenDialogDelete(false);
    setOpenDialogGraph(false);
    setTimePeriod(0);
  };
  const handleCloseGraph = () => {
    setOpenDialogGraph(false);
    setTimePeriod(0);
  };
  const handleEditClick = (e) => {
    setAnchorEl(null);
    const id = `expense-${selectedIndex}`;
    console.log(id);
    const despElement = document.querySelector(`h1#${id}`).textContent;
    const amountElement = document.querySelector(`span#${id}`).textContent;
    setDesptoUpdate(despElement);
    setAmountToUpdate(amountElement);
    setOpenDialogEdit(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    let updatedDescription = formJson.Description;
    let updatedAmount = formJson.Amount;
    if (updatedDescription === "") {
      // console.log("hereDesp");
      updatedDescription = despToUpdate;
    }
    if (updatedAmount === "") {
      // console.log("hereAmount");
      updatedAmount = amountToUpdate;
    }
    const arrayNeeded = JSON.parse(localStorage.getItem("expenseArray"));
    const date =
      arrayNeeded[
        arrayNeeded.findIndex(
          (item) =>
            item.description === despToUpdate && item.amount === amountToUpdate
        )
      ].date;
    const tag =
      arrayNeeded[
        arrayNeeded.findIndex(
          (item) =>
            item.description === despToUpdate && item.amount === amountToUpdate
        )
      ].tag;
    // console.log(updatedAmount, updatedDescription);
    settingNew(updatedAmount, updatedDescription);
    setDateToGoInUpdateFn(date);
    setTagToGoInUpdateFn(tag);
    let value = document.querySelector("h1#expense").textContent;
    // console.log(value, newDesp, newAmount);
    setCategory(value);

    setFlag(!flag);

    handleClose();
  };
  const handleDeleteClick = () => {
    setAnchorEl(null);
    const id = `expense-${selectedIndex}`;
    // console.log(id);
    const descriptionToDelete = document.querySelector(`h1#${id}`).textContent;
    const amountToDelete = document.querySelector(`span#${id}`).textContent;

    const arrayNeeded = JSON.parse(localStorage.getItem("expenseArray"));
    const date =
      arrayNeeded[
        arrayNeeded.findIndex(
          (item) =>
            item.description === descriptionToDelete &&
            item.amount === amountToDelete
        )
      ].date;
    // console.log(descriptionToDelete, amountToDelete, date);
    setdateToDelete(date);
    setAmountToDelete(amountToDelete);
    setDespToDelete(descriptionToDelete);
    setOpenDialogDelete(true);
  };

  const settingNew = (amount, description) => {
    setNewDesp(description);
    setNewAmount(amount);
  }; //used in update feature
  const deleteIt = (event) => {
    event.preventDefault();
    deletethisExpense(despToDelete, amountToDelete, dateToDelete);
    // setTimeout(deletethisExpense(despToDelete, amountToDelete), 500);
    setFlagDelete(!flagDelete);
    handleClose();
  };
  const handleGraph = () => {
    setOpenDialogGraph(true);
  };
  const handleChange = (e) => {
    setTimePeriod(e.target.value);
  };
  return (
    <div className=" h-10/12 shadow-lg max-xl:w-85 mb-2 w-90 max-md:w-55 max-lg:w-70  border-2  px-5 py-4 mr-4 rounded-xl">
      <div className="flex justify-between  w-3sm">
        <h1 id="expense" className=" text-xl font-medium ml-2">
          Expense
        </h1>
        <Button variant="outlined" size="small" onClick={handleGraph}>
          Analyze
        </Button>
      </div>
      {expenseComingLocal && expenseComingLocal.length > 0 ? (
        <div
          className={
            expenseComingLocal.length > 3
              ? "h-11/12  mb-2 mt-1 overflow-y-scroll"
              : " my-1"
          }
        >
          {expenseComingLocal.map((item, index) => (
            // <Tooltip arrow title={<TooltipComponent item={item} />}>

            // </Tooltip>
            <div
              key={index}
              id={`expense-${index}`}
              className=" p-2 m-1  border-red-100 rounded-md  bg-red-300 flex justify-between"
            >
              <h1 id={`expense-${index}`} className="w-40 overflow-hidden">
                {item.description}
              </h1>
              <span id={`expense-${index}`}>{item.amount}</span>

              <span id={`expense-${index}`}>
                <Button
                  size="small"
                  id="more-button"
                  aria-controls={open ? "more-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => handleClick(e, index)}
                >
                  <MoreVertIcon />
                </Button>

                <Menu
                  id="more-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={(e) => handleClose(e)}
                  slotProps={{ list: { "aria-labelledby": "more-button" } }}
                >
                  <MenuItem>
                    <span
                      className="flex flex-row"
                      id={`expense-${index}`}
                      onClick={(e) => handleEditClick(e)}
                    >
                      <ListItemIcon>
                        <EditNoteIcon />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </span>
                  </MenuItem>{" "}
                  {/*update feature */}
                  <MenuItem>
                    <span
                      className="flex flex-row"
                      id={`expense-${index}`}
                      onClick={(e) => handleDeleteClick(e)}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </span>
                  </MenuItem>{" "}
                  {/* delete feature */}
                </Menu>
              </span>
            </div>
          ))}
        </div>
      ) : null}
      {/*displaying expenses tabs*/}
      <Dialog open={openDialogEdit} onClose={handleClose}>
        <DialogTitle>Update your expense</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="update-expense">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="Description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              placeholder={despToUpdate}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="Amount"
              label="Amount"
              type="text"
              fullWidth
              variant="standard"
              placeholder={amountToUpdate}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="update-expense">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*edit Dialog*/}
      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        aria-labelledby="alert-delete"
        aria-describedby="confirm-delete"
      >
        <DialogContent id="confirm-delete">
          Do you want to delete this?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => deleteIt(e)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*Delete Dialog*/}
      <Dialog
        open={openDialogGraph}
        fullScreen
        // slots={{ transition: Transition }}

        onClose={handleCloseGraph}
        className="max-w-full max-lg:w-full border-2 "
      >
        <div className="w-9/12 h-full  max-lg:w-full ">
          {" "}
          <div className="  ">
            {" "}
            <button
              onClick={handleCloseGraph}
              className=" w-15 h-13 border-2  relative left-5 top-2  hover:bg-gray-200 rounded-full"
            >
              {" "}
              <CloseIcon className=" rounded-full" fontSize="large" />
            </button>
          </div>
          <div className=" max-lg:hidden block ">
            <div className=" mt-4 mb-2  border-2 max-lg:gap-20 gap-40 pt-2 rounded-2xl w-10/12 bg-zinc-100 relative left-70 flex justify-between">
              <DialogTitle
                className=" max-lg:hidden block relative bottom-3 left-3 top-0.5"
                fontSize={40}
              >
                Your Expenses
              </DialogTitle>
              <DialogContent className="  max-w-75 max-lg:max-w-50 relative top-1.5 mx-4 my-2">
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, minWidth: 200 }}
                  className=""
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Choose time period
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={timePeriod}
                    onChange={handleChange}
                    label="timePeriod"
                  >
                    <MenuItem value={0}>Today</MenuItem>
                    <MenuItem value={3}>Past 3 days</MenuItem>
                    <MenuItem value={7}>Past 1 week</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
            </div>
          </div>
          <div className=" max-lg:block hidden relative left-20  w-9/12  ">
            <div className="mt-4 mb-2  border-2  pt-2 rounded-2xl w-full bg-zinc-100 flex  justify-between">
              {" "}
              <DialogTitle
                className="relative bottom-3  max-lg:text-md left-3 top-0.5"
                fontSize={35}
              >
                Your Expenses
              </DialogTitle>
              <DialogContent className="  max-w-75 max-lg:max-w-50 relative top-1.5 mx-4 my-2">
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, minWidth: 135 }}
                  className=""
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Choose time period
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={timePeriod}
                    onChange={handleChange}
                    label="timePeriod"
                  >
                    <MenuItem value={0}>Today</MenuItem>
                    <MenuItem value={3}>Past 3 days</MenuItem>
                    <MenuItem value={7}>Past 1 week</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
            </div>
          </div>
          <DialogContent>
            <div className="w-lg">
              {" "}
              <ExpenseGraph timePeriod={timePeriod} />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
