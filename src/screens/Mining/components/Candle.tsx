import React from 'react'
import { ScaleLinear } from 'd3-scale'

import { Rect } from 'react-native-svg'

export interface CandleModel {
  date: string
  amount: number
}

interface CandleProps {
  candle: CandleModel
  index: number
  width: number
  scaleY: ScaleLinear<number, number>
  scaleBody: ScaleLinear<number, number>
}

export const Candle = ({ candle, index, width, scaleY, scaleBody }: CandleProps) => {
  const { amount } = candle
  const fill = '#554DF0'
  const x = index * width
  const max = amount
  const min = 0
  return (
    <Rect
      x={x + width / 2 - 6 / 2}
      y={scaleY(max)}
      width={6}
      ry={4}
      height={scaleBody(max - min)}
      {...{ fill }}
    />
  )
}
