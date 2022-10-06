// This component is used to display hosted club table.
// The content is fetched from backend server through clubinfoSlice.
import { useState } from "react";
import type { FC, ChangeEvent, MouseEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
//import numeral from 'numeral'
//import PropTypes from 'prop-types'
import PerfectScrollbar from "react-perfect-scrollbar";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  //   Divider,
  IconButton,
  //   Link,
  SvgIcon,
  //   Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  //   Tabs,
  //   TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Edit as EditIcon } from "react-feather";
import type { Theme } from "src/theme";
import getInitials from "src/utils/getInitials";
import type { ClubSimInfo, GroupInfo } from "src/types/clubinfo";
import { getClubInfoData, deleteClub } from "src/slices/clubinfoSlice";
import {
  selectUserProfileStatus,
  activateClub,
  deactiveClub,
} from "src/slices/userprofileSlice";
import { useDispatch, useSelector } from "src/store";
// import img from '../assert/image.png'
import img1 from "../assert/image1.png";

interface listTableProps {
  className?: string;
  userrole?: string;
  clublist: ClubSimInfo[];
}

// type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'orders|desc' | 'orders|asc'

// interface SortOption {
//   value: Sort
//   label: string
// }

// const tabs = [
//   {
//     value: 'all',
//     label: 'All',
//   },
// ]

// const sortOptions: SortOption[] = [
//   {
//     value: 'updatedAt|desc',
//     label: 'Last update (newest first)',
//   },
//   {
//     value: 'updatedAt|asc',
//     label: 'Last update (oldest first)',
//   },
//   /* 	{
// 		value: 'orders|desc',
// 		label: 'Total orders (high to low)',
// 	},
// 	{
// 		value: 'orders|asc',
// 		label: 'Total orders (low to high)',
// 	}, */
// ]

// const applyPagination = (
//   clublist: ClubSimInfo[],
//   page: number,
//   limit: number,
// ): ClubSimInfo[] => {
//   return clublist.slice(page * limit, page * limit + limit)
// }

// const descendingComparator = (
//   a: ClubSimInfo,
//   b: ClubSimInfo,
//   orderBy: string,
// ): number => {
//   //console.log('a  is :', a)
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }

//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }

//   return 0
// }

// const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
//   return order === 'desc'
//     ? (a: ClubSimInfo, b: ClubSimInfo) => descendingComparator(a, b, orderBy)
//     : (a: ClubSimInfo, b: ClubSimInfo) => -descendingComparator(a, b, orderBy)
// }

// const applySort = (clublist: ClubSimInfo[], sort: Sort): ClubSimInfo[] => {
//   const [orderBy, order] = sort.split('|') as [string, 'asc' | 'desc']
//   const comparator = getComparator(order, orderBy)
//   const stabilizedThis = clublist.map((el, index) => [el, index])

//   stabilizedThis.sort((a, b) => {
//     // @ts-ignore
//     const order = comparator(a[0], b[0])

//     if (order !== 0) return order

//     // @ts-ignore
//     return a[1] - b[1]
//   })

//   // @ts-ignore
//   return stabilizedThis.map((el) => el[0])
// }

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
  bulkOperations: {
    position: "relative",
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    height: 31,
    width: 31,
  },
  category: {
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
  },
  subCategory: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
    color: "#678796",
  },
  statusButton: {
    background: "#FFFFFF",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.14)",
    borderRadius: "4px",
    color: "#263238",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "26px",
    letterSpacing: "0.3px",
  },
  tableCol: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    color: "#263238",
  },
  circleIcon: {
    fontSize: "0.7rem",
    fill: "#2196F3",
    marginRight: "1rem",
  },
  removeBottomBorder: {},
  tableContainer: {
    background: "#FFFFFF",
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px",
  },
}));

const ClublistTable: FC<listTableProps> = ({
  className,
  clublist,
  userrole,

  ...rest
}) => {
  const classes = useStyles();
  const { managedClubs } = useSelector((state) => state.user.userProfileData);

  //   const [currentTab, setCurrentTab] = useState<string>('all')
  const [selectedClubs, setSelectedClubs] = useState<ClubSimInfo[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const profileLoading = useSelector(selectUserProfileStatus);
  //if(userrole==='Parent')
  //const [profileLoading, setProfileLoading] = useState<boolean>(true)
  const dispatch = useDispatch();
  //   const [sort,setSort] = useState<Sort>(sortOptions[0].value)
  //   const [filters, setFilters] = useState<any>({
  //     hasAcceptedMarketing: null,
  //     isProspect: null,
  //     isReturning: null,
  //   })
  //   const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
  //     const updatedFilters = {
  //       ...filters,
  //       hasAcceptedMarketing: null,
  //       isProspect: null,
  //       isReturning: null,
  //     }

  //     if (value !== 'all') {
  //       updatedFilters[value] = true
  //     }

  //     setFilters(updatedFilters)
  //     setSelectedClubs([])
  //     setCurrentTab(value)
  //   }

  //   const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //     event.persist()
  //     setSort(event.target.value as Sort)
  //   }

  const handleSelectAllCustomers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedClubs(
      [] // clear selection.
      //event.target.checked ? clublist.map((club) => club.clubid) :
    );
  };
  const onclickCancel = (event: MouseEvent<HTMLInputElement>): void => {
    // deselect all clubs.
    setSelectedClubs([]);
  };
  const onclickDeactive = (event: MouseEvent<HTMLInputElement>): void => {
    // Deactive selected club
    event.preventDefault();
    //console.log('Deactive club:', selectedClubs)
    if (selectedClubs.length > 0 && selectedClubs[0].active) {
      dispatch(deactiveClub({ clubid: selectedClubs[0].clubid }));
    } else {
      dispatch(activateClub({ clubid: selectedClubs[0].clubid }));
    }
    setSelectedClubs([]);
  };
  const onclickDelete = (event: MouseEvent<HTMLInputElement>): void => {
    // Deactive selected club
    event.preventDefault();
    //console.log('Delete club:', selectedClubs)
    if (
      selectedClubs.length > 0 &&
      selectedClubs[0].active &&
      userrole !== "Parent"
    ) {
      alert("Deactive a club first");
    } else {
      dispatch(deleteClub({ clubid: selectedClubs[0].clubid }));
      alert("The club is being deleted. Please refresh list to  see update.");
    }
    setSelectedClubs([]);
  };
  // const handleSelectOneClub = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   club: ClubSimInfo,
  // ): void => {
  //   if (selectedClubs.length > 0 && selectedClubs[0].clubid === club.clubid) {
  //     setSelectedClubs([])
  //   } else {
  //     setSelectedClubs([club])
  //   }

  //   if (!selectedClubs.includes(club)) {
  //     setSelectedClubs((prevSelected) => [club])
  //   } else {
  //     setSelectedClubs((prevSelected) =>
  //       prevSelected.filter((id) => id !== club),
  //     )
  //   }
  // }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const onclickEdit = (clubid: string): void => {
    // get club info from server for edit form
    dispatch(getClubInfoData({ clubid }));
  };

  //   const sortedClubs = applySort(clublist, sort)
  //   const paginatedClubs = applyPagination(sortedClubs, page, limit)
  const enableBulkOperations = selectedClubs.length > 0;
  const selectedSomeCustomers =
    selectedClubs.length > 0 && selectedClubs.length < clublist.length;
  const selectedAllCustomers = selectedClubs.length === clublist.length;
  // useEffect(() => {
  // 	if (isLoading) {
  // 		setProfileLoading(true)
  // 	} else {
  // 		setProfileLoading(false)
  // 	}
  // }, [isLoading])

  const displayData = managedClubs;

  const getTotalUsers = (data: GroupInfo[]) => {
    const count = data.reduce((accumulator, object) => {
      return accumulator + object.totalNum;
    }, 0);
    return count;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {/* <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <Divider /> */}
      {/* <Box p={2} minHeight={56} display='flex' alignItems='center'>
				<Box flexGrow={1} />
				<TextField
					label='Sort By'
					name='sort'
					onChange={handleSortChange}
					select
					SelectProps={{ native: true }}
					value={sort}
					variant='outlined'
				>
					{sortOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TextField>
			</Box> */}
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />
            {userrole === "Parent" ? null : (
              <Button
                variant="outlined"
                className={classes.bulkAction}
                onClick={onclickDeactive}
              >
                {selectedClubs.length > 0 && selectedClubs[0].active
                  ? "Decctivate"
                  : "Activate"}
              </Button>
            )}
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={onclickDelete}
            >
              {"Delete"}
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={onclickCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <TableContainer className={classes.tableContainer}>
        <PerfectScrollbar>
          <Box minWidth={700}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                  />
                </TableCell> */}
                  <TableCell>
                    <Box marginLeft={"60px"}>Club Name</Box>
                  </TableCell>
                  <TableCell>Numbers of Members</TableCell>
                  <TableCell>Numbers of Groups</TableCell>
                  <TableCell>Parent Lead</TableCell>
                  <TableCell>Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profileLoading ? null : displayData &&
                  displayData.length > 0 ? (
                  displayData.map((club, index) => {
                    // const isCustomerSelected =
                    //   selectedClubs.length > 0 &&
                    //   selectedClubs[0].clubid === club.clubid

                    return (
                      <TableRow
                        hover
                        key={index}
                        // selected={isCustomerSelected}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              className={classes.avatar}
                              src={club?.images ? club.images : img1}
                            >
                              {getInitials(club?.clubName)}
                            </Avatar>
                            <Typography
                              marginLeft={3}
                              className={classes.tableCol}
                            >
                              {club.clubName ? club.clubName : "-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography className={classes.tableCol}>
                            {getTotalUsers(club.group)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className={classes.tableCol}>
                            {club.groups
                              ? club.groups.join(", ")
                              : club.group.length}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className={classes.tableCol}>
                            <Box display="flex" alignItems="center">
                              <FiberManualRecordIcon
                                className={classes.circleIcon}
                              />
                              {club.active ? club.active : "Jask"}
                            </Box>
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>
                            <IconButton
                              component={RouterLink}
                              to={
                                (userrole === "Parent"
                                  ? "/app/parent/club/edit/"
                                  : "/app/host/club/edit/") + club.clubid
                              }
                              onClick={() => onclickEdit(club.clubid)}
                            >
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={displayData?.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        </PerfectScrollbar>
      </TableContainer>
    </Card>
  );
};

//ListTable.propTypes = {
//	className: PropTypes.string,
//	customers: PropTypes.array.isRequired,
//}

//ListTable.defaultProps = {
//	customers: [],
//}

export default ClublistTable;
