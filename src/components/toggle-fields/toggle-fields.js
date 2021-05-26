// @flow

// packages
import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'

// styles
import { colors } from '../../common/styles/constant'

export type ToggleFieldsTypes = {
  actionInfoText: [string, string],
  actionText: [string, string],
  useToggle: [boolean, (boolean) => void],
  showToggleMenu: boolean,
}

const ToggleFields = ({
                        actionInfoText,
                        actionText,
                        useToggle,
                        showToggleMenu = true,
                      }: ToggleFieldsTypes) => {
  const [show, hide] = actionText
  const [showInfoText, hideInfoText] = actionInfoText
  const [isToggled, setToggled] = useToggle
  const { container, infoTextStyles, actionTextStyles } = styles
  return showToggleMenu ? (
    <View style={container}>
      <Text style={infoTextStyles}>
        {isToggled ? hideInfoText : showInfoText}{' '}
      </Text>
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={() => setToggled(!isToggled)}>
        <View style={styles.actionTextStylesButton}>
          <Text style={actionTextStyles}>{isToggled ? hide : show}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ) : null
}

const hitSlop = {top: 10, left: 10, bottom: 10, right: 10}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(2),
    marginBottom: verticalScale(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextStyles: {
    textAlign: 'center',
    color: colors.gray3,
    fontSize: verticalScale(12),
  },
  actionTextStyles: {
    color: colors.main,
    fontWeight: '700',
    fontSize: verticalScale(12),
  },
  actionTextStylesButton: {
    padding: 8,
    paddingLeft: 0,
  },
})

export default ToggleFields
