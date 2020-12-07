import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { scaleLinear } from 'd3-scale'
import { Svg } from 'react-native-svg'
import { format } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { Candle, CandleModel } from './Candle'
import { StyleGuide } from '../../../StyleGuide'
import { useAppState } from '../../../setup-kit/useAppState'
import { useAppLocales } from '../../../setup-kit/locales'

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.5,
    transform: [{ translateY: 7 }],
  },
})

const locales = {
  ru,
  en: enGB,
}

export const { width: screenWidth } = Dimensions.get('window')
const xAxisWidth = 20
const padding = 16
const size = screenWidth - padding * 2 - xAxisWidth

interface ChartProps {
  candles: CandleModel[]
  domain: [number, number]
}

const Canvas = ({ candles, domain }: ChartProps) => {
  const width = size / candles.length
  const scaleY = scaleLinear().domain(domain).range([220, 0])
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain)])
    .range([0, size])

  return (
    <Svg width={size} height={220}>
      {candles.map((candle, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Candle key={index} {...{ candle, index, width, scaleY, scaleBody }} />
      ))}
    </Svg>
  )
}

const HorizontalGrid = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          borderLeftWidth: 1,
          borderRightWidth: 0.5,
          borderColor: '#262C33',
        }}
      />
      <View
        style={{
          flex: 1,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: '#262C33',
        }}
      />
      <View
        style={{
          flex: 1,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: '#262C33',
        }}
      />
      <View
        style={{
          flex: 1,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: '#262C33',
        }}
      />
      <View
        style={{
          flex: 1,
          borderLeftWidth: 0.5,
          borderRightWidth: 1,
          borderColor: '#262C33',
        }}
      />
    </>
  )
}

const Grid = () => {
  return (
    <View style={[StyleSheet.absoluteFill, { height: 220 }]} pointerEvents="none">
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderBottomWidth: 0.5,
          borderColor: '#262C33',
        }}
      >
        <HorizontalGrid />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#262C33',
        }}
      >
        <HorizontalGrid />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#262C33',
        }}
      >
        <HorizontalGrid />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderTopWidth: 0.5,
          borderBottomWidth: 1,
          borderColor: '#262C33',
        }}
      >
        <HorizontalGrid />
      </View>
    </View>
  )
}

const Chart = () => {
  const [{ user }] = useAppState()
  const { locale } = useAppLocales()
  const history = user?.posmining_history || []
  const data = [...history].reverse()
  const LOWSHIFT = 0
  const HIGHSHIFT = 50

  const getDomain = (rows: CandleModel[]): [number, number] => {
    const values = rows.map(({ amount }) => amount)
    return [0 - LOWSHIFT, Math.max(...values) + HIGHSHIFT]
  }

  const d = getDomain(data)
  const max = d[1]
  const delta = max / 4
  return (
    <View
      style={{
        borderRadius: 5,
        height: 250,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ marginRight: 'auto', paddingHorizontal: 8, height: 220 }}>
          <View style={[{ flex: 1 }]} pointerEvents="none">
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={styles.label}>{`${Math.round(delta * 3)}`}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={styles.label}>{`${Math.round(delta * 2)}`}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={styles.label}>{`${Math.round(delta)}`}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={styles.label}>0</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: size,
            backgroundColor: StyleGuide.colors.backgroundLevel2,
            marginRight: 8,
          }}
        >
          <Grid />
          <Canvas {...{ candles: data, domain: d }} />
          <View
            style={{
              height: 30,
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: StyleGuide.colors.background,
            }}
          >
            {data.map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <View style={{ flex: 1, alignItems: 'center' }} key={index}>
                  <Text style={styles.label}>
                    {format(new Date(item.date), 'MMM', {
                      locale: locales[locale],
                    })}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
}

export { Chart }
