import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Box, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'

import type { ClubSimInfo } from 'src/types/clubinfo'
import Header from './Header'
import ClublistTable from 'src/components/ClublistTable'
import { useDispatch, useSelector } from 'src/store'
import {
  getUserData,
  selectUser,
  selectUserApiToken,
} from 'src/slices/userprofileSlice'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

const ManagedClubListView: FC = () => {
  const classes = useStyles()
  const userProfile = useSelector(selectUser)
  const userApiToken = useSelector(selectUserApiToken)
  const dispatch = useDispatch()

  const [clublist, setClublist] = useState<ClubSimInfo[]>([])

  useEffect(() => {
    if (userApiToken) {
      dispatch(getUserData())
    }
  }, [dispatch, userApiToken])

  useEffect(() => {
    //console.log(userProfile)
    if (userProfile && userProfile.managedClubs) {
      setClublist(userProfile.managedClubs)
    }
  }, [userProfile, userProfile.managedClubs, setClublist])
  /* 	if (clublist) {
		console.log(clublist.length || 0)
		console.log('clublist:', clublist)
	} */

  return (
    <Page className={classes.root} title="Manage Club List">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <ClublistTable clublist={clublist || []} />
        </Box>
      </Container>
    </Page>
  )
}

export default ManagedClubListView
