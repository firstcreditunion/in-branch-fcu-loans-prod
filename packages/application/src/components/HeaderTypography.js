import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}))

export default HeaderTypography
