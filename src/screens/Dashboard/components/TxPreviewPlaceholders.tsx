import React from 'react'
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder'
import { Layout as View } from '@ui-kitten/components'
import { StyleGuide } from '../../../StyleGuide'

const TxPreviewPlaceholders = () => {
  const color = StyleGuide.colors.background
  return (
    <View>
      {[...Array(10).keys()].map((chat) => (
        <Placeholder
          key={chat}
          Animation={(props) => (
            <Fade
              {...props}
              style={{
                backgroundColor: StyleGuide.colors.grey,
              }}
            />
          )}
          Left={(props) => (
            <PlaceholderMedia size={60} isRound color={color} style={props?.style} />
          )}
          style={{ marginBottom: 10, alignItems: 'center', paddingVertical: 10 }}
        >
          <PlaceholderLine height={40} noMargin color={color} />
        </Placeholder>
      ))}
    </View>
  )
}

export { TxPreviewPlaceholders }
