//import React from 'react'
import type { FC, FormEvent } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
} from '@mui/material'
import wait from 'src/utils/wait'
import { makeStyles } from '@mui/styles'
interface NotificationProps {
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
}))

const Notifications: FC<NotificationProps> = ({ className, ...rest }) => {
	const classes = useStyles()

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()
		// NOTE: Make API request
		await wait(500)
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card className={clsx(classes.root, className)} {...rest}>
				<CardHeader title='Notifications' />
				<Divider />
				<CardContent>
					<Grid container spacing={6} wrap='wrap'>
						<Grid item md={4} sm={6} xs={12}>
							<Typography gutterBottom variant='h6' color='textPrimary'>
								System
							</Typography>
							<Typography gutterBottom variant='body2' color='textSecondary'>
								You will recieve emails in your business email address
							</Typography>
							<div>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label='Email alerts'
								/>
							</div>
							<div>
								<FormControlLabel
									control={<Checkbox />}
									label='Push Notifications'
								/>
							</div>
							<div>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label='Text message'
								/>
							</div>
							<div>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label={
										<>
											<Typography variant='body1' color='textPrimary'>
												Phone calls
											</Typography>
											<Typography variant='caption'>
												Short voice phone updating you
											</Typography>
										</>
									}
								/>
							</div>
						</Grid>
						<Grid item md={4} sm={6} xs={12}>
							<Typography gutterBottom variant='h6' color='textPrimary'>
								Chat App
							</Typography>
							<Typography gutterBottom variant='body2' color='textSecondary'>
								You will recieve emails in your business email address
							</Typography>
							<div>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label='Email'
								/>
							</div>
							<div>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label='Push notifications'
								/>
							</div>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box p={2} display='flex' justifyContent='flex-end'>
					<Button color='secondary' type='submit' variant='contained'>
						Save Settings
					</Button>
				</Box>
			</Card>
		</form>
	)
}

Notifications.propTypes = {
	className: PropTypes.string,
}

export default Notifications
