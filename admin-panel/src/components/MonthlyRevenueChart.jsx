import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const MonthlyRevenueChart = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }
    ]
  })

  useEffect(() => {
    fetch(`${API_URL}/orders/monthly-revenue`)
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => {
          return months[item.month - 1] || ''
        })

        const revenueData = data.map((item) => item.total)

        setData({
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: revenueData,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 1,
              barThickness: 50,
              maxBarThickness: 80,
              borderRadius: 5
            }
          ]
        })
      })
  }, [API_URL])

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 5,
          font: {
            size: 12,
            weight: '400',
            color: 'white',
            family: 'Poppins'
          },
          callback: function (value) {
            return value + '€'
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14,
            weight: '400',
            color: 'white',
            family: 'Poppins'
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default MonthlyRevenueChart
