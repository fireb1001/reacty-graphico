import React from "react";
import { AppCtxt } from "../Context";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SingleComp() {
  const classes = useStyles();
  const { show_archived } = React.useContext(AppCtxt);

  function doLoveReducer(state, action) {
    switch (action.type) {
      case "setDoLove": {
        return action.payload;
      }
      case "setDoLoveContext": {
        return "I Don't";
      }
      default:
        return state;
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [doLove, dispatch] = React.useReducer(doLoveReducer, "");
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {show_archived && <div>show_archived true</div>}
      <Button
        onContextMenu={e => {
          e.preventDefault();
          dispatch({ type: "setDoLoveContext" });
        }}
        onClick={_ => {
          setOpen(true);
          dispatch({ type: "setDoLove", payload: "I DO" });
        }}
        variant="contained"
        color="primary"
      >
        Hello: {doLove}
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
