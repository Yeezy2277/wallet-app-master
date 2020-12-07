import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  withShadow: {
    elevation: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
})

type FontSize =
  | 'bold'
  | 'normal'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined

export const StyleGuide = {
  fonts: {
    textPrimary: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'SFProText-Regular',
    },
    textBold: {
      fontWeight: 'bold' as FontSize,
      fontFamily: 'SFProText-Semibold',
    },
  },
  colors: {
    white: '#ffffff',
    black: '#000000',
    lightGrey: '#8C8C8C',
    background: '#141B23',
    backgroundLevel2: '#19202A',
    grey: '#293039',
    brand: '#554DF0',
    shadow: 'rgba(0, 0, 0, 0.25)',
    danger: '#F24C4C',
    success: '#43A260',
    svgAccentLime: '#1ae5be',
  },
  shadow: {
    ...styles.withShadow,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
}

export const regularHeader = {
  headerTitleStyle: { ...StyleGuide.fonts.textPrimary, ...StyleGuide.fonts.textBold },
  headerBackTitle: '',
  headerTintColor: StyleGuide.colors.brand,
}

export const boarderlessHeader = {
  ...regularHeader,
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    elevation: 0,
  },
  cardStyle: {},
}

export const noHeader = {
  headeShown: false,
}
