import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SITES } from "../graphql/sites";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "1em"
  }
}));

const SingleSite = ({ site }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography>{JSON.stringify(site)}</Typography>
    </Paper>
  );
};
export default function Sites() {
  const { loading, error, data, refetch } = useQuery(GET_SITES);

  React.useEffect(() => {
    refetch();
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.sites &&
        data.sites.map(site => <SingleSite site={site} key={site.id} />)}
    </>
  );
}
