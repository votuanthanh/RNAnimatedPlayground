import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import IconButton from './IconButton';

interface Props {
  item: {
    id: number;
    name: string;
    pic: any;
    full_pic: any;
  };
  cardAction: any;
  viewAction: any;
  bookmarkAction: any;
  shareAction: any;
}

class Card extends React.Component<Props> {
  scaleValue: Animated.Value;
  cardScale: Animated.AnimatedInterpolation;
  pan: Animated.ValueXY;
  panResponder: any;

  constructor(props: Props) {
    super(props);
    this.pan = new Animated.ValueXY();
    this.scaleValue = new Animated.Value(0);
    this.cardScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1.2],
    });
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (e, gesture) => {
        Animated.event([null, {dx: this.pan.x, dy: this.pan.y}], {
          useNativeDriver: false,
        })(e, gesture);
      },
      onPanResponderRelease: (e, gesture) => {},
    });
  }

  render() {
    const {
      cardAction,
      viewAction,
      bookmarkAction,
      shareAction,
      item,
    } = this.props;
    let [translateX, translateY] = [this.pan.x, this.pan.y];

    let transformStyle = {
      ...styles.card,
      transform: [{translateX}, {translateY}, {scale: this.cardScale}],
    };
    return (
      <Animated.View style={transformStyle} {...this.panResponder.panHandlers}>
        <Image source={item.pic} style={styles.thumbnail} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.icons}>
          <IconButton
            icon="search"
            onPress={() => {
              viewAction(item.name, item.full_pic);
            }}
            data={item}
          />
          <IconButton icon="bookmark" onPress={bookmarkAction} data={item} />
          <IconButton icon="share" onPress={shareAction} data={item} />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 140,
    backgroundColor: '#fafbfc',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 75,
    height: 75,
  },
  icons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Card;
