import React from "react";
import type { FC, MouseEvent } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
//import { useHistory } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  PlusCircle as PlusCircleIcon,
  RefreshCw as RefreshIcon,
  //Download as DownloadIcon,
  //Upload as UploadIcon,
} from "react-feather";
import type { Theme } from "src/theme";
import { resetClubInfo } from "src/slices/clubinfoSlice";
import { getUserData } from "src/slices/userprofileSlice";
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
}));

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const onclickNewClub = (event: React.SyntheticEvent) => {
    // executed before handleClick
    event.preventDefault();
    //console.log('going to reset clubinfo')
    dispatch(resetClubInfo());
  };
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (event) => {
    //console.log(event)
    history.push("/app/parent/recommendclub");
  };
  const onclickRefresh = (event: MouseEvent<HTMLInputElement>): void => {
    // Refresh user profile
    event.preventDefault();

    dispatch(getUserData());
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
            to="/app/parent/myrecommendations"
            component={RouterLink}
          >
            Clubs
          </Link>
          <Typography variant="body1" color="textPrimary">
            My Recommendations
          </Typography>
        </Breadcrumbs>
        <Typography variant="h5" color="textPrimary">
          My Recommendations
        </Typography>
        <Box mt={2}>
          {/* 					<Button
						startIcon={
							<SvgIcon fontSize='small'>
								<UploadIcon />
							</SvgIcon>
						}
					>
						Import
					</Button>
					<Button
						startIcon={
							<SvgIcon fontSize='small'>
								<DownloadIcon />
							</SvgIcon>
						}
					>
						Export
					</Button> */}
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={onclickRefresh}
          startIcon={
            <SvgIcon fontSize="small">
              <RefreshIcon />
            </SvgIcon>
          }
          className={classes.buttonSpacing}
        >
          Refresh List
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClick}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          <Link
            className={classes.navButton}
            href="/app/parent/recommendnewclub"
            onClick={onclickNewClub}
          >
            Recommend A New Club
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
