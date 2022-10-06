import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import type { Theme } from "src/theme";
import img from "../../../../assert/image.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    minWidth: 632,
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    boxShadow:
      "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
    padding: "20px",
    [theme.breakpoints.down("md")]: {
      minWidth: "90%",
    },
  },
  closeIcon: {
    cursor: "pointer",
  },
  input: {
    width: "100%",

    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.1px",
    color: "#546E7A",
  },
  buttonSection: {
    marginTop: "30px",
  },
  titleSection: {
    marginTop: "16px",
    marginBottom: "10px",
    color: "#546E7A",

    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "25px",
    letterSpacing: "0.09px",
  },
  closeButton: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "0.3px",
    color: "#263238",
    background: "#F5F5F5",
    marginRight: "15px",
  },
  submitButton: {
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "0.3px",
    color: "#FFF",
    backgroundColor: "#5850EC",
  },
}));
export default function AddGroupModal(props) {
  const classes = useStyles();
  const [clubName, setClubName] = React.useState<string>("");
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.root}>
          <Box textAlign="end">
            <CloseIcon
              onClick={props.handleClose}
              className={classes.closeIcon}
            />
          </Box>
          <Typography
            id="modal-modal-description"
            className={classes.titleSection}
          >
            New Group
          </Typography>
          <TextField
            id="Group Name"
            label="Group Name"
            variant="outlined"
            size="small"
            onChange={(e) => setClubName(e.target.value)}
            className={classes.input}
          />

          <Box className={classes.buttonSection}>
            <Button className={classes.closeButton} onClick={props.handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={() =>
                props.handleSubmit({
                  name: clubName,
                  totalNum: 10,
                  parentLead: "New Lead",
                  groupImageUrl: img,
                })
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
