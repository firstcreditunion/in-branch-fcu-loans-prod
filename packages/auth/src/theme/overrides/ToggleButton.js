import { alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// ----------------------------------------------------------------------

export default function ToggleButton(theme) {
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const style = (color) => ({
    props: { color },
    style: {
      '&:hover': {
        borderColor: alpha(theme.palette[color].main, 0.48),
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
      },
      '&.Mui-selected': {
        borderColor: alpha(theme.palette[color].main, 0.48),
      },
    },
  })

  return {
    MuiToggleButton: {
      variants: [
        {
          props: { color: 'standard' },
          style: {
            '&.Mui-selected': {
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.common.white,
            },
          },
        },
        style('primary'),
        style('secondary'),
        style('info'),
        style('success'),
        style('warning'),
        style('error'),
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadiusXl,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${theme.palette.grey[500_12]}`,
          '& .MuiToggleButton-root': {
            margin: 4,
            borderColor: 'transparent !important',
            borderRadius: `${theme.shape.borderRadiusXl}px !important`,
          },
        },
      },
    },
  }
}
