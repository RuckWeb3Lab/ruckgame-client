// Mui
import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { AlertColor } from '@mui/material/Alert/Alert'

type Options = {
  severity: AlertColor
  title: string
  message: string
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  options: Options
}

const ActionAlert = ({ open, setOpen, options }: Props) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert variant="outlined" severity={options.severity} sx={{ width: '100%' }}>
        <AlertTitle>{options.title}</AlertTitle>
        {options.message}
      </Alert>
    </Snackbar>
  )
}

export default ActionAlert
