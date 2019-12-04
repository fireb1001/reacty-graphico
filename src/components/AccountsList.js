import React from "react";
import { AppCtxt } from "../Context";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Paper, Box, Fab, Avatar } from "@material-ui/core";
import {
  GET_ACCOUNTS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT
} from "./../graphql/accounts";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { callClient } from "../MyApolloProvider";
import { CREATE_TAG } from "../graphql/tags";

const AccountPaper = ({ account }) => {
  const { tags_arr } = React.useContext(AppCtxt);
  const [accountTagInp, setAccountTagInp] = React.useState("");

  const [updateAccount] = useMutation(UPDATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }]
  });

  return (
    <Paper style={{ padding: ".5em" }}>
      {JSON.stringify(account)}
      <hr />
      <TextField
        id="hashtag"
        label="Hashtag"
        type="text"
        value={accountTagInp}
        className={tags_arr[accountTagInp] ? "found-tag" : ""}
        onChange={e => {
          let val = e.target.value;
          if (tags_arr[val]) console.log(`hashtag ${val} found`);
          setAccountTagInp(val);
          if (e.keyCode === 13) console.log(val);
        }}
        onKeyPress={async e => {
          if (e.key === "Enter") {
            // get all ids
            let acc_tags_ids = account.tags.map(acc_tag => {
              return acc_tag.id;
            });

            if (tags_arr[accountTagInp]) {
              // add id if unique
              if (acc_tags_ids.indexOf(tags_arr[accountTagInp]) === -1) {
                acc_tags_ids.push(tags_arr[accountTagInp]);
              }
            } else {
              // create tag and use it id
              let data = await callClient(
                CREATE_TAG,
                {
                  hashtag: accountTagInp
                },
                true
              );
              if (data.createTag && data.createTag.id) {
                acc_tags_ids.push(data.createTag.id);
              }
            }

            updateAccount({
              variables: {
                id: account.id,
                tags: acc_tags_ids
              }
            });

            setAccountTagInp("");
          }
        }}
      />
      {account.tags &&
        account.tags.map(tag => (
          <span key={tag.hashtag}>
            <span>{tag.hashtag}</span>
            <Typography
              color="error"
              variant="caption"
              onClick={e => {
                let acc_tags_ids = account.tags.map(acc_tag => {
                  if (acc_tag.id === tag.id) return null;
                  return acc_tag.id;
                });
                // remove null values
                acc_tags_ids = acc_tags_ids.filter(e => e);

                updateAccount({
                  variables: {
                    id: account.id,
                    tags: acc_tags_ids
                  }
                });
              }}
            >
              {" ✖ "}
            </Typography>
          </span>
        ))}
    </Paper>
  );
};

export default function AccountsList() {
  const { dashboard_site, tags } = React.useContext(AppCtxt);
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNTS);

  const [filteredAccounts, setFilteredAccounts] = React.useState([]);
  const [checkTags, setCheckTags] = React.useState([]);
  //const [checkedArr, setCheckedArr] = React.useState(["blackfriday"]);

  const loginRef = React.createRef();
  const passhintRef = React.createRef();

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    refetchQueries: [{ query: GET_ACCOUNTS }]
  });

  React.useEffect(() => {
    setCheckTags(tags);
    refetch();
  }, [tags, refetch]);

  React.useEffect(() => {
    let filtered = [];
    if (data && data.accounts) {
      filtered = data.accounts.filter(account => {
        if (dashboard_site.id && account.site && account.site.id)
          return dashboard_site.id === account.site.id;
        else if (!dashboard_site.id) return true;
        else return false;
      });
      setFilteredAccounts(filtered);
    }

    if (checkTags) {
      checkTags.forEach(tag => {
        if (tag.checked) {
          let tag_filtered = filtered.filter(account => {
            return JSON.stringify(account.tags).includes(tag.hashtag);
          });
          setFilteredAccounts(tag_filtered);
        }
      });
    }
  }, [data, dashboard_site, checkTags]);
  /*
  React.useEffect(() => {
    console.log(tags);
    setCheckTags(tags);
  }, [tags]);
  */

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    let accountData = {
      login: loginRef.current.value,
      passhint: passhintRef.current.value,
      site: dashboard_site.id
    };
    createAccount({
      variables: {
        ...accountData
      }
    });

    setOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding account to {dashboard_site.name}
            <br />
            <Avatar alt="Remy Sharp" src={dashboard_site.logoUrl} />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            inputRef={loginRef}
            label="Login"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="passhint"
            inputRef={passhintRef}
            label="Pass hint"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add Account
          </Button>
        </DialogActions>
      </Dialog>
      <Box m={1} p={1} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Fab color="primary" aria-label="add" onClick={_ => setOpen(true)}>
          <span style={{ fontSize: "2em" }}> {"➕"} </span>
        </Fab>
      </Box>
      <Box m={1} p={1}>
        <FormGroup row>
          {checkTags &&
            checkTags.map((tag, index) => (
              <FormControlLabel
                key={tag.id}
                control={
                  <Checkbox
                    checked={tag.checked || false}
                    onChange={e => {
                      checkTags[index] = { ...tag, checked: e.target.checked };
                      setCheckTags([...checkTags]);
                    }}
                  />
                }
                label={tag.hashtag}
              />
            ))}
        </FormGroup>
      </Box>
      {filteredAccounts &&
        filteredAccounts.map(account => (
          <Box m={1.5} key={account.id}>
            <AccountPaper account={account} />
          </Box>
        ))}
      <div style={{ marginBottom: "60px" }}> </div>
    </div>
  );
}
