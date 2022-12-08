import React from 'react'
import { useSelector } from 'react-redux'

import { useTheme, styled } from '@mui/material/styles'

import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
import { fCurrency, fNumber } from '../../utils/formatNumber'
import BaseOptionChart from './BaseOptionChart'

export default function ChartDonut() {
  const theme = useTheme()

  const sovAmountPayable = useSelector((state) => state.loanCalculatorReducer.sovAmountPayable)
  const sovPrinciapl = useSelector((state) => state.loanCalculatorReducer.sovPrinciapl)
  const sovInterestAmount = useSelector((state) => state.loanCalculatorReducer.sovInterestAmount)

  const CHART_DATA = [sovPrinciapl, sovInterestAmount]

  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Principal Amount', 'Interest'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fCurrency(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                return fCurrency(sum)
              },
            },
          },
        },
      },
    },
  })
  return <ReactApexChart type='donut' series={CHART_DATA} options={chartOptions} width={400} />
}
