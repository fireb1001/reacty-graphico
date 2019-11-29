import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_SITES, CREATE_SITE, UPDATE_SITE } from "../graphql/sites";
import {
  Modal,
  Backdrop,
  TextField,
  Fade,
  Fab,
  Button
} from "@material-ui/core";

import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { AppCtxt } from "../Context";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fab: {
    margin: "1em",
    float: "right"
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  textField: {
    margin: ".5em"
  }
}));

export default function AddSiteModal({ show, toggleModal }) {
  const [open, setOpen] = React.useState(show);
  const classes = useStyles();
  const siteNameRef = React.createRef();
  const siteUrlRef = React.createRef();
  const siteLogoUrlRef = React.createRef();
  const { will_update_site, updateSite } = React.useContext(AppCtxt);

  const [createSite] = useMutation(CREATE_SITE, {
    refetchQueries: [{ query: GET_SITES }]
  });

  const [updateSiteMutation] = useMutation(UPDATE_SITE, {
    refetchQueries: [{ query: GET_SITES }]
  });

  React.useEffect(() => {
    console.log("show changed to : ", show);
    setOpen(show);
  }, [show]);
  /*
  React.useEffect(() => {
    console.log(will_update_site);
    if (will_update_site && siteNameRef.current) {
      siteNameRef.current.value = will_update_site.name
        ? will_update_site.name
        : "";
      siteUrlRef.current.value = will_update_site.url
        ? will_update_site.url
        : "";
      siteLogoUrlRef.current.value = will_update_site.logoUrl
        ? will_update_site.logoUrl
        : "";
    }
  }, [will_update_site, siteNameRef, siteUrlRef, siteLogoUrlRef]);
  */

  const handleSubmit = event => {
    event.preventDefault();
    let siteData = {
      name: siteNameRef.current.value,
      url: siteUrlRef.current.value,
      logoUrl: siteLogoUrlRef.current.value
    };
    /*
    siteNameRef.current.value = "";
    siteUrlRef.current.value = "";
    siteLogoUrlRef.current.value = "";
    */

    if (will_update_site.id)
      updateSiteMutation({
        variables: { id: will_update_site.id, ...siteData }
      });
    else createSite({ variables: siteData });
    updateSite({});
    toggleModal(false);
    setOpen(false);
  };

  return (
    <>
      <div style={{ marginBottom: "60px" }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={_ => setOpen(true)}
          className={classes.fab}
        >
          <Add />
        </Fab>
        <div style={{ clear: "both" }}></div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          setOpen(false);
          toggleModal(false);
          updateSite({});
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper} style={{ width: "50%" }}>
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
                    defaultValue={will_update_site.name}
                    className={classes.textField}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="site-url"
                    label="Site URL"
                    inputRef={siteUrlRef}
                    defaultValue={will_update_site.url}
                    className={classes.textField}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="site-logo"
                    label="Site logo URL"
                    inputRef={siteLogoUrlRef}
                    defaultValue={will_update_site.logoUrl}
                    className={classes.textField}
                    fullWidth
                  />
                </div>
                <br />
                <Button type="submit">
                  {will_update_site.id ? "Save " : "Add "} Site
                </Button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
