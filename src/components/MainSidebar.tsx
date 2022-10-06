import { useEffect } from 'react'
import type { FC } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button, Drawer } from '@mui/material'
import type { Theme } from 'src/theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { makeStyles } from '@mui/styles'

import Logo from './Logo'

interface MainSidebarProps {
  onMobileClose: () => void
  openMobile: boolean
}
const useStyles = makeStyles((theme: Theme) => ({
  drawerDiv: {
    backgroundColor: 'background.default',
    width: '256px',
  },
  mainBox: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 2,
  },
  signUpButton: {
    marginTop: 1,
  },
  rightButtons: {
    marginRight: '10px',
    marginTop: 1,
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    // display: { xs: 'block', md: 'none' },
  },
}))
const MainSidebar: FC<MainSidebarProps> = (props) => {
  const classes = useStyles()
  const { onMobileClose, openMobile } = props
  const location = useLocation()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
  }, [location.pathname])

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={!lgUp && openMobile}
      variant="temporary"
      PaperProps={{
        className: classes.drawerDiv,
      }}
    >
      <Box className={classes.mainBox}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box display="flex" paddingBottom={2} paddingTop={3}></Box>
        <Button
          className={classes.rightButtons}
          color="primary"
          component="a"
          href="/app/host/confirm"
          variant="outlined"
          size="small"
        >
          Post Your Club
        </Button>
        <Button
          className={classes.rightButtons}
          color="primary"
          component="a"
          href="/app/parent/recommendclub"
          variant="outlined"
          size="small"
        >
          Recommend A Club
        </Button>
        <Button
          className={classes.rightButtons}
          color="primary"
          component="a"
          href="/login"
          variant="outlined"
          size="small"
        >
          Sign In
        </Button>
        <Button
          color="primary"
          component="a"
          href="/register"
          size="small"
          className={classes.signUpButton}
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
    </Drawer>
  )
}

MainSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
}

export default MainSidebar
