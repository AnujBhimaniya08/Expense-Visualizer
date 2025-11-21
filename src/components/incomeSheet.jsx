import { useExpenseContext } from "@/context/expenseAmountContext";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IncomeGraph from "./incomeGraph";
import Select from "@mui/material/Select";

export default function IncomeSheet() {
  const { incomeComingLocal, updateInLocalStorage, deleteThisIncome } =
    useExpenseContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [despToUpdate, setDesptoUpdate] = useState(null);
  const [amountToUpdate, setAmountToUpdate] = useState(null);
  const [despToDelete, setDespToDelete] = useState(null);
  const [amountToDelete, setAmountToDelete] = useState(null);
  const [dateToDelete, setdateToDelete] = useState(null);
  const [dateToGoInUpdateFn, setDateToGoInUpdateFn] = useState(null);
  const [tagToGoInUpdateFn, setTagToGoInUpdateFn] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [newDesp, setNewDesp] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [openDialogGraph, setOpenDialogGraph] = useState(false);
  const [timePeriod, setTimePeriod] = useState(0);
  const [flagDelete, setFlagDelete] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  useEffect(() => {
    if (newAmount && newDesp) {
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
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenDialogEdit(false);
    setOpenDialogDelete(false);
    setTimePeriod(0);
  };
  const handleEditClick = (e) => {
    setAnchorEl(null);
    const id = `income-${selectedIndex}`;
    // console.log(id);
    const despElement = document.querySelector(`h1#${id}`).textContent;
    const amountElement = document.querySelector(`span#${id}`).textContent;
    // console.log(despElement, amountElement);
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
      console.log("hereDesp");
      updatedDescription = despToUpdate;
    }
    if (updatedAmount === "") {
      console.log("hereAmount");
      updatedAmount = amountToUpdate;
    }
    const arrayNeeded = JSON.parse(localStorage.getItem("incomeArray"));
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
    let value = document.querySelector("h1#income").textContent;
    // console.log(value, newDesp, newAmount);
    setCategory(value);
    setFlag(!flag);

    handleClose();
  };
  const handleGraph = () => {
    setOpenDialogGraph(true);
  };
  const settingNew = (amount, description) => {
    setNewAmount(amount);
    setNewDesp(description);
  };
  const handleDeleteClick = () => {
    setAnchorEl(null);
    const id = `income-${selectedIndex}`;
    // console.log(id);
    const descriptionToDelete = document.querySelector(`h1#${id}`).textContent;
    const amountToDelete = document.querySelector(`span#${id}`).textContent;
    const arrayNeeded = JSON.parse(localStorage.getItem("incomeArray"));
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
  const deleteIt = (event) => {
    event.preventDefault();
    deleteThisIncome(despToDelete, amountToDelete, dateToDelete);
    // setTimeout(deleteThisIncome(despToDelete, amountToDelete), 500);
    handleClose();
  };
  const handleCloseGraph = () => {
    setOpenDialogGraph(false);
    setTimePeriod(0);
  };

  const handleChange = (e) => {
    setTimePeriod(e.target.value);
  };
  return (
    <div className="border-2  shadow-lg h-10/12 mb-2 w-90 max-md:w-55 max-lg:w-70 max-lg:mr-1 px-5 py-4 mr-4 rounded-xl">
      {/* className=
      {incomeComingLocal.length > 3
        ? "h-11/12 border-1 mb-2 w-90 max-md:w-50 p-3 mr-4 rounded-xl"
        : "border-1 mb-2 w-90 max-md:w-50  p-3 mr-4 rounded-xl"} */}
      <div className="flex justify-between  w-3sm">
        <h1 id="income" className=" text-xl font-medium ml-2 ">
          Income
        </h1>
        <Button variant="outlined"  size="small"  onClick={handleGraph}>
          Analyze
        </Button>
      </div>
      {incomeComingLocal && incomeComingLocal.length > 0 ? (
        <div
          className={
            incomeComingLocal.length > 3
              ? "h-11/12 mb-2 mt-1  overflow-y-scroll"
              : "my-1"
          }
        >
          {incomeComingLocal.map((item, index) => (
            <div
              id={`income-${index}`}
              key={index}
              className=" p-2 m-1 border-red-100 rounded-md bg-blue-300 flex justify-between"
            >
              <h1 id={`income-${index}`} className="w-40 overflow-hidden">
                {item.description}
              </h1>
              <span id={`income-${index}`}>{item.amount}</span>
              <span className=" text-xs " id={`income-${index}`}>
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
                  onClose={handleClose}
                  slotProps={{ list: { "aria-labelledby": "menu-button" } }}
                >
                  <MenuItem>
                    <span
                      className="flex flex-row"
                      onClick={(e) => handleEditClick(e)}
                    >
                      <ListItemIcon>
                        <EditNoteIcon />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <span
                      className="flex flex-row"
                      onClick={() => handleDeleteClick()}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </span>
                  </MenuItem>
                </Menu>
              </span>
            </div>
          ))}
        </div>
      ) : null}
      <Dialog open={openDialogEdit} onClose={handleClose}>
        <DialogTitle>Update your expense</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e)} id="update-expense">
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
      </Dialog>{" "}
      {/*edit dialog */}
      <Dialog
        open={openDialogDelete}
        onClose={handleClose}
        aria-labelledby="alert-delete"
        aria-describedby="confirm-delete"
      >
        <DialogTitle id="confrim-delete">Are you sure?</DialogTitle>
        <DialogContent>Do you want to delete this income?</DialogContent>
        <span className="flex flex-row justify-end">
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={(e) => deleteIt(e)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </span>
      </Dialog>
      {/*delete dialog */}
      <Dialog
        open={openDialogGraph}
        fullScreen
        className="max-w-full max-lg:w-full border-2"
        onClose={handleCloseGraph}
      >
        <div className="w-9/12 h-full max-lg:w-full">
          <div className="">
            <button
              onClick={handleCloseGraph}
              className="w-15 h-13 border-2  relative left-5 top-2  hover:bg-gray-200 rounded-full"
            >
              <CloseIcon className=" rounded-full" fontSize="large" />
            </button>
          </div>
          {/** close button  */}
          <div className="block max-lg:hidden">
            <div className=" mt-4 mb-2  border-2 max-lg:gap-20 gap-40 pt-2 rounded-2xl w-10/12 bg-zinc-100 relative left-70 flex justify-between">
              <DialogTitle
                className="relative bottom-3 left-3 top-0.5"
                fontSize={40}
              >
                Your Incomes
              </DialogTitle>
              <DialogContent className="max-w-75 max-lg:max-w-50 relative top-1.5 mx-4 my-2">
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }}>
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
          <div className="max-lg:block hidden relative left-20  w-9/12 ">
            <div className=" mt-4 mb-2  border-2  pt-2 rounded-2xl w-full bg-zinc-100 flex  justify-between">
              <DialogTitle
                className="  relative bottom-3 max-lg:text-md left-3 top-0.5"
                fontSize={35}
              >
                Your Incomes
              </DialogTitle>
              <DialogContent className="max-w-75 max-lg:max-w-50 relative top-1.5 mx-4 my-2">
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 135 }}>
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
              <IncomeGraph timePeriod={timePeriod} />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
