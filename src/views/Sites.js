import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SITES } from "../graphql/sites";
import { Paper, Typography, Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddSiteModal from "../components/AddSiteModal";
import { AppCtxt } from "../Context";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "1em"
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
}));

const SingleSite = ({ site, onUpdateSite }) => {
  const classes = useStyles();
  const { updateSite } = React.useContext(AppCtxt);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Avatar
            alt="Remy Sharp"
            src={site.logoUrl}
            className={classes.bigAvatar}
          />
        </Grid>
        <Typography>{JSON.stringify(site)}</Typography>
      </Grid>
      <Typography
        color="primary"
        variant="h5"
        onClick={_ => {
          updateSite(site);
          onUpdateSite(true);
        }}
      >
        {"✍️"}
      </Typography>
    </Paper>
  );
};

export default function Sites() {
  const { loading, error, data, refetch } = useQuery(GET_SITES);
  React.useEffect(() => {
    refetch();
  });

  const onUpdateSite = function(show) {
    setShowModal(show);
  };

  const [showModal, setShowModal] = React.useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.sites &&
        data.sites.map(site => (
          <SingleSite site={site} key={site.id} onUpdateSite={onUpdateSite} />
        ))}
      <AddSiteModal show={showModal} toggleModal={flag => setShowModal(flag)} />
    </>
  );
}
