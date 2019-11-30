import React from "react";
import { Grid, Box } from "@material-ui/core";
import SitesList from "../components/SitesList";

export default function Home() {
  return (
    <>
      <Box m={1}>
        <Grid container>
          <Grid item xs={3}>
            <SitesList />
          </Grid>
          <Grid item xs={9}></Grid>
        </Grid>
      </Box>
    </>
  );
}
