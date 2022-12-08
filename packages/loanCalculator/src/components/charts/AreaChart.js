import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'

import BaseOptionChart from './BaseOptionChart'

export default function AreaChart() {
  const chartAmountPayable = useSelector((state) => state.loanCalculatorReducer.chartAmountPayable)
  const chartInstalmentNumber = useSelector((state) => state.loanCalculatorReducer.chartInstalmentNumber)
  const paymentSeries = useSelector((state) => state.loanCalculatorReducer.paymentSeries)

  const CHART_DATA = [{ name: 'Loan Balance', data: [...chartAmountPayable] }]

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      type: 'numeric',
      decimalsInFloat: 0,
      title: {
        text: 'Instalments',
      },
      categories: [...chartInstalmentNumber],
    },
    yaxis: {
      title: {
        text: 'Loan Balance ($)',
      },
    },
  })
  return <ReactApexChart type='area' series={CHART_DATA} options={chartOptions} height={280} width='100%' />
}
