// This componet is to allow user to Create or Edit current club info data.

import * as React from "react";
import type { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import {
  Avatar,
  Paper,
  Typography,
  colors,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  StepContent,
  TextField,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { Briefcase as BriefcaseIcon, Check } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

import { styled } from "@mui/material/styles";
import { StepIconProps } from "@mui/material/StepIcon";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useDispatch, useSelector } from "src/store";
import type { Theme } from "src/theme";
import AddGroupModal from "./AddGroup";
import getInitials from "src/utils/getInitials";
// import { editClubList } from "src/slices/clubListSlice";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import img from "../../../../assert/image.png";
import { Formik } from "formik";
import { GroupInfo } from "src/types/clubinfo";
import {
  editUserManagedClubList,
  saveUserManagedClubList,
} from "src/slices/userprofileSlice";
import generateUID from "src/utils/generateUID";
// import img1 from "../../../../assert/image1.png";

interface ClubDetailProp {
  title?: string;
}
interface Istep {
  label: string;
}

interface Iinput {
  clubName?: string;
  clubAddress?: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    // [theme.breakpoints.up('sm')]: {
    //   maxWidth: '90%',
    // },
  },
  topSection: {
    margin: "0 16px",
    [theme.breakpoints.up("md")]: {
      width: "360px",
      padding: "8px 0",
    },
  },
  bottomSection: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "5%",
    },
    [theme.breakpoints.up("md")]: {
      marginRight: "20%",
      width: "calc(100% - 360px)",
    },
  },
  mainDiv: {
    paddingLeft: "1rem",
    paddingTop: "50px",
    paddingBottom: "50px",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "3rem",
    },
  },
  mainStepDiv: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  subStepDiv: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  leftsubStepDiv: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
  },
  rightsubStepDiv: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "57.708%",
    },
  },
  avatar: {
    backgroundColor: colors.blue[100],
  },
  stepper: {
    backgroundColor: "transparent",
  },
  stepperDiv: {
    marginRight: "5rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
  "@global": {
    ".MuiStepper-vertical > div:nth-of-type(2)": {
      marginLeft: "22px",
      [theme.breakpoints.down("md")]: {
        // marginLeft: 0,
        margin: "0 -40px",
      },
    },
    ".MuiStepper-vertical > div:nth-of-type(2) > span": {
      minHeight: "60px",
      [theme.breakpoints.down("md")]: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderLeft: "none",
        minHeight: "auto",
        height: "1rem",
      },
    },
    ".MuiStepLabel-iconContainer": {
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        paddingRight: "0",
      },
    },
  },
  tp: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  addIcon: {
    fill: "#5850EC",
    marginRight: "0.7rem",
    cursor: "pointer",
  },
  inputText: {
    width: "100%",
  },
  firstTitle: {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "-0.06px",
  },
  inputLable: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "25px",
    letterSpacing: "0.09px",
    color: "#546E7A",
  },
  tableContainer: {
    background: "#FFFFFF",
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
  },
  tableCol: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "143%",
    letterSpacing: "0.15px",
    color: "#546E7A",
  },
  textElipse: {
    [theme.breakpoints.down("lg")]: {
      // width: '50%',
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
    },
  },
  stepDiv: {
    display: "block",

    [theme.breakpoints.up("md")]: {
      display: "flex",
      padding: "0",
    },
  },
  transfornText: {
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      textTransform: "capitalize",
    },
  },
  circleIcon: {
    fontSize: "0.7rem",
    fill: "#2196F3",
    marginRight: "1rem",
  },
  buttonSection: {
    display: "block",
    marginTop: "50px",
    marginLeft: "16px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-between",
      // margin: '0 10px',
    },
  },
  closeButton: {
    color: "#263238",
    background: "#F5F5F5",
    marginRight: "18px",
    textTransform: "uppercase",
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "0.3px",
  },
  saveButton: {
    textTransform: "uppercase",
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "0.3px",
  },
  removeBottomBorder: {
    borderBottom: "none",
  },
}));

const CreateClubSteps: FC<ClubDetailProp> = ({ title, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  let id: { clubid: string } = useParams();
  const { managedClubs } = useSelector((state) => state.user.userProfileData);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  // const [clubName, setClubName] = React.useState<string>('')
  // const [clubAddress, setClubAddress] = React.useState<string>('')
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  // const displayData = clubData.length > 0 ? clubData : data

  React.useEffect(() => {
    if (id.clubid) {
      setRows(
        managedClubs.filter((club) => club.clubid === id.clubid)[0].group
      );
      setIsEdit(true);
    }
  }, [id]);

  const getInitValues = () => {
    let initValue: Iinput;
    if (id.clubid) {
      const club = managedClubs.filter((club) => club.clubid === id.clubid)[0];

      initValue = {
        clubName: club?.clubName,
        clubAddress: club?.clubAddress,
      };
    } else {
      initValue = {
        clubName: "",
        clubAddress: "",
      };
    }
    return initValue;
  };

  const [rows, setRows] = React.useState<GroupInfo[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleNext: () => void = () => {
    setActiveStep(activeStep + 1);
  };

  const handleCancel = () => {
    history.push("/app/host/mylist");
  };
  const handleAddClub = (data: GroupInfo) => {
    setRows([...rows, data]);
    handleClose();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // const handleReset: () => void = () => {
  //   setActiveStep(0)
  // }

  const steps: Array<Istep> = [
    {
      label: "Club Link Address",
    },
    {
      label: "Create Groups",
    },
  ];

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: "48px",
    height: "48px",
    display: "flex",

    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#5850EC",
    }),
    // ...(ownerState.completed && {
    //   backgroundColor: '#5850EC',
    // }),
  }));

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <BriefcaseIcon />,
      2: <PersonAddAltIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {completed ? <Check /> : icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const openAddModal: () => void = () => {
    setOpen(true);
  };
  const handleOpen: () => void = () => setOpen(true);
  const handleClose: () => void = () => setOpen(false);

  return (
    <div className={classes.root}>
      {
        <Paper className={classes.mainDiv}>
          <AddGroupModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSubmit={handleAddClub}
          />
          <Formik
            initialValues={getInitValues()}
            validationSchema={Yup.object().shape({
              clubName: Yup.string().required("Club name is required"),
              clubAddress: Yup.string().required("Club address is required"),
            })}
            onSubmit={async (
              values,
              { resetForm, setErrors, setStatus, setSubmitting }
            ): Promise<void> => {
              const payload = {
                clubid: id.clubid || generateUID(),
                clubName: values.clubName,
                clubAddress: values.clubAddress,
                group: rows,
              };
              if (!isEdit) {
                dispatch(saveUserManagedClubList({ managedClub: payload }));
              }
              if (isEdit) {
                console.log("edited data", payload);

                dispatch(editUserManagedClubList({ managedClub: payload }));
              }
              history.push("/app/host/mylist");
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              touched,
              values,
              getFieldProps,
            }): JSX.Element => (
              <Box className={classes.mainStepDiv}>
                <Box className={classes.topSection}>
                  <Stepper
                    activeStep={activeStep}
                    className={classes.stepperDiv}
                    orientation="vertical"
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepLabel
                          StepIconComponent={ColorlibStepIcon}
                          className={classes.stepDiv}
                        >
                          <Typography className={classes.tp}>
                            {step.label}
                          </Typography>
                        </StepLabel>
                        <StepContent></StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Box className={classes.bottomSection}>
                  {activeStep === 0 && (
                    <Box marginLeft={2} marginTop={2}>
                      <Box>
                        <Typography className={classes.firstTitle}>
                          Please select club name and link address
                        </Typography>
                        <Box
                          className={classes.mainStepDiv}
                          alignItems="center"
                          marginTop={2}
                        >
                          <Box className={classes.leftsubStepDiv}>
                            <Typography className={classes.inputLable}>
                              This is your club name
                            </Typography>
                          </Box>
                          <Box className={classes.rightsubStepDiv}>
                            <TextField
                              id="Club Name"
                              label="Club Name"
                              name="clubName"
                              variant="outlined"
                              size="medium"
                              className={classes.inputText}
                              value={values.clubName}
                              {...getFieldProps("clubName")}
                              error={Boolean(errors.clubName)}
                              helperText={errors.clubName}
                            />
                          </Box>
                        </Box>
                        <Box
                          className={classes.mainStepDiv}
                          alignItems="center"
                          marginTop={2}
                        >
                          <Box className={classes.leftsubStepDiv}>
                            <Typography className={classes.inputLable}>
                              This is will be your club link
                            </Typography>
                          </Box>
                          <Box
                            alignItems="center"
                            className={classes.rightsubStepDiv}
                          >
                            <Box display="flex" alignItems="center">
                              <Typography className={classes.textElipse}>
                                <b> www.kidsfuncloud.com/</b>
                              </Typography>
                              <TextField
                                id="clubaddress"
                                name="clubAddress"
                                label="clubaddress"
                                variant="outlined"
                                size="medium"
                                value={values.clubAddress}
                                {...getFieldProps("clubAddress")}
                                error={Boolean(errors.clubAddress)}
                                helperText={errors.clubAddress}
                                className={classes.inputText}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {activeStep === 1 && (
                    <Box marginLeft={2} display="inline-grid" width={"100%"}>
                      <TableContainer className={classes.tableContainer}>
                        <PerfectScrollbar>
                          <Box minWidth={650}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <Box marginLeft={"60px"}>Name</Box>
                                  </TableCell>
                                  <TableCell>Numbers of Members</TableCell>
                                  <TableCell>Parent Lead</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows &&
                                  rows.length > 0 &&
                                  rows.map((row) => (
                                    <TableRow
                                      key={row.name}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        <Box display="flex" alignItems="center">
                                          <Avatar
                                            className={classes.avatar}
                                            src={row.groupImageUrl}
                                          >
                                            {getInitials(row.name)}
                                          </Avatar>
                                          <Typography
                                            marginLeft={3}
                                            className={classes.tableCol}
                                          >
                                            {row.name}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell className={classes.tableCol}>
                                        {row.totalNum}
                                      </TableCell>
                                      <TableCell className={classes.tableCol}>
                                        <Box display="flex" alignItems="center">
                                          <FiberManualRecordIcon
                                            className={classes.circleIcon}
                                          />
                                          {row.parentLead}
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                <TableRow>
                                  <TableCell
                                    align="center"
                                    sx={{ borderBottom: "0" }}
                                    className={`${classes.tableCol} ${classes.removeBottomBorder}`}
                                  >
                                    <Box display="flex" alignItems="center">
                                      <AddCircleOutlineRoundedIcon
                                        className={classes.addIcon}
                                        onClick={() => openAddModal()}
                                      />

                                      <div className={classes.transfornText}>
                                        create new group to send notifications
                                      </div>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </PerfectScrollbar>
                      </TableContainer>
                    </Box>
                  )}
                  <Box marginBottom={2} marginTop={1}>
                    <Box marginLeft={1} className={classes.buttonSection}>
                      <Button
                        onClick={activeStep === 0 ? handleCancel : handleBack}
                        className={classes.closeButton}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={
                          activeStep === 0 ? handleNext : () => handleSubmit()
                        }
                        disabled={
                          activeStep === 0 ? values.clubName === "" : false
                        }
                        className={classes.saveButton}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Formik>
        </Paper>
      }
    </div>
  );
};

export default CreateClubSteps;
