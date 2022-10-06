import React from "react";
import type { FC } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
//import { useHistory } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Star as StarIcon,
  //Download as DownloadIcon,
  //Upload as UploadIcon,
} from "react-feather";
import type { Theme } from "src/theme";
import { resetClubInfo } from "src/slices/clubinfoSlice";
import { useDispatch } from "src/store";

interface HeaderProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  navButton: {
    color: "white",
  },
  action: {
    marginBottom: theme.spacing(1),
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
  buttonSpacing: {
    marginRight: "10px",
  },
  infoText: {
    color: "gray",
    marginRight: "30px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  createButton: {
    [theme.breakpoints.down("md")]: {
      marginTop: "5px",
    },
  },
}));

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const onclickNewClub = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(resetClubInfo());
  };
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (event) => {
    console.log(event);
    history.push("/app/host/createclub");
  };

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/host/mylist"
            component={RouterLink}
          >
            Clubs
          </Link>
          <Typography variant="body1" color="textPrimary">
            My Clubs
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h3" color="textPrimary">
              My Clubs
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center">
              <Typography className={classes.infoText}>
                Add parent groups to send notifications and share calendar
                Events
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClick}
                className={classes.createButton}
                endIcon={
                  <SvgIcon fontSize="small">
                    <StarIcon />
                  </SvgIcon>
                }
              >
                <Link
                  className={classes.navButton}
                  href="/app/host/createclub"
                  onClick={onclickNewClub}
                >
                  Create a new Club
                </Link>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
