import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const icon_color = '#586069';
const icon_size = 15;

type Props = {
  icon: string;
  onPress: any;
  data: {
    id: number;
    name: string;
    pic: any;
    full_pic: any;
  };
};
export default class IconButton extends Component<Props> {
  rotateValue: Animated.Value;

  constructor(props: Props) {
    super(props);
    this.rotateValue = new Animated.Value(0);
  }

  render() {
    const {icon, onPress, data} = this.props;
    const rotation = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          Animated.timing(this.rotateValue, {
            toValue: 1,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
          onPress(data);
        }}
        onPressOut={() => {
          Animated.timing(this.rotateValue, {
            toValue: 0,
            duration: 350,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        }}>
        <Animated.View style={{transform: [{rotate: rotation}]}}>
          <Icon
            name={icon}
            style={styles.icon}
            size={icon_size}
            color={icon_color}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});
