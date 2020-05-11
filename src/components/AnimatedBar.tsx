import React, {Component} from 'react';
import {StyleSheet, Animated} from 'react-native';

type Props = {
  value: number;
  index: number;
};
export default class AnimatedBar extends Component<Props> {
  width: Animated.Value;
  constructor(props: Props) {
    super(props);
    this.width = new Animated.Value(0);
  }

  animateBar = () => {
    const {value, index} = this.props;
    this.width.setValue(0);
    Animated.timing(this.width, {
      toValue: value,
      delay: index * 150,
      useNativeDriver: false,
    }).start();
  };

  componentDidMount() {
    this.animateBar();
  }

  componentDidUpdate() {
    this.animateBar();
  }

  render() {
    let widthStyle = {width: this.width};
    return <Animated.View style={[styles.bar, widthStyle]} />;
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 15,
    borderWidth: 1,
    borderColor: '#c72f06',
    backgroundColor: '#e75832',
  },
});
