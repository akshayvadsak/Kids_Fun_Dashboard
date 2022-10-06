import type { FC } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Box, Table, TableBody, TableHead, TableContainer } from '@mui/material'

interface CommonTableProps {
  tableHeader?: React.ReactNode
  tableBody?: React.ReactNode
}

const CommonTable: FC<CommonTableProps> = (props) => {
  return (
    <PerfectScrollbar>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>{props.tableHeader}</TableHead>
            <TableBody>{props.tableBody}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </PerfectScrollbar>
  )
}
export default CommonTable
