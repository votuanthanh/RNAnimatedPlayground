import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import Header from './Header';
const {height, width} = Dimensions.get('window');

type Props = {
  visible: boolean;
  title: string;
  image?: any;
  onClose: () => void;
};
export default class AnimatedModal extends Component<Props> {
  yTranslate: Animated.Value;
  opacityValue: Animated.Value;

  constructor(props: Props) {
    super(props);
    this.yTranslate = new Animated.Value(0);
    this.opacityValue = new Animated.Value(0);
  }

  componentDidUpdate() {
    if (this.props.visible) {
      this.yTranslate.setValue(0);
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }

  render() {
    const {title, children, onClose} = this.props;
    const negativeHeight = -height + 20;
    const modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight],
    });

    const modalOpacity = this.opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    let bottomStyle = {
      transform: [{translateY: modalMoveY}],
      opacity: modalOpacity,
    };

    return (
      <Animated.View style={[styles.container, bottomStyle]}>
        <Header title={title}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 30,
  },
  closeText: {
    fontSize: 17,
    color: '#fff',
  },
});
