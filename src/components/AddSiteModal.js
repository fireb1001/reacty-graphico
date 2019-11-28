import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_SITES, CREATE_SITE } from "../graphql/sites";
import {
  Fab,
  Modal,
  Backdrop,
  TextField,
  Fade,
  Button
} from "@material-ui/core";

import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fab: {
    margin: "1em"
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function AddSiteModal() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const siteNameRef = React.createRef();
  const siteUrlRef = React.createRef();
  const siteLogoUrlRef = React.createRef();

  const [createSite] = useMutation(CREATE_SITE, {
    refetchQueries: [{ query: GET_SITES }]
  });

  const handleSubmit = event => {
    event.preventDefault();
    let siteData = {
      name: siteNameRef.current.value,
      url: siteUrlRef.current.value,
      logoUrl: siteLogoUrlRef.current.value
    };

    siteNameRef.current.value = "";
    siteUrlRef.current.value = "";
    siteLogoUrlRef.current.value = "";
    createSite({ variables: siteData });
    console.log(siteData);
    setOpen(false);
  };
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={_ => setOpen(true)}
        className={classes.fab}
      >
        <Add />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <div id="transition-modal-description">
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextField
                    id="site-name"
                    label="Site Name"
                    inputRef={siteNameRef}
                    className={classes.textField}
                  />
                  <TextField
                    id="site-url"
                    label="Site URL"
                    inputRef={siteUrlRef}
                    className={classes.textField}
                  />
                  <TextField
                    id="site-logo"
                    label="Site logo URL"
                    inputRef={siteLogoUrlRef}
                    className={classes.textField}
                  />
                </div>
                <Button type="submit">Add Site</Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
