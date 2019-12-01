import React from "react";
import { Grid, Box } from "@material-ui/core";
import SitesList from "../components/SitesList";
import AccountsList from "../components/AccountsList";

export default function Home() {
  return (
    <>
      <Box m={1}>
        <Grid container>
          <Grid item xs={3}>
            <SitesList />
          </Grid>
          <Grid item xs={9}>
            <AccountsList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
