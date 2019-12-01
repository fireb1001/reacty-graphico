import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SITES } from "../graphql/sites";
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppCtxt } from "../Context";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    width: "40px",
    height: "40px"
  }
}));

export default function SitesList() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_SITES);
  const [filteredSites, setFilteredSites] = React.useState([]);
  const [siteFilter, setSiteFilter] = React.useState("");

  const { setDashboardSite } = React.useContext(AppCtxt);

  React.useEffect(() => {
    refetch();
  });

  React.useEffect(() => {
    if (data && data.sites) setFilteredSites(data.sites);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <TextField
        id="site-filter"
        label="Site Filter"
        value={siteFilter}
        onChange={e => {
          let siteFilter = e.target.value;
          setSiteFilter(siteFilter);
          let filtered = data.sites.filter(site =>
            site.name.toLowerCase().includes(siteFilter)
          );
          console.log(filtered);
          setFilteredSites(filtered);
        }}
        className={classes.textField}
        fullWidth
      />
      <List className={classes.root}>
        {filteredSites &&
          filteredSites.map(site => (
            <ListItem
              key={site.id}
              onClick={() => {
                setDashboardSite(site);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  alt="Remy Sharp"
                  src={site.logoUrl}
                />
              </ListItemAvatar>
              <ListItemText primary={site.name} secondary="" />
            </ListItem>
          ))}
      </List>
    </>
  );
}
