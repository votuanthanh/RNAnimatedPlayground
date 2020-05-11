import React, {Component} from 'react';
import {View, Text, Easing, StyleSheet, Animated} from 'react-native';
import DataRow from './DataRow';
import {PokemonStatus} from '../screens/Home';

type Props = {
  data: PokemonStatus[];
  image: any;
  title: string;
};
export default class BigCard extends Component<Props> {
  imageOpacityValue: Animated.Value;
  titleTranslateValue: Animated.Value;
  titleScaleValue: Animated.Value;

  constructor(props: Props) {
    super(props);
    this.imageOpacityValue = new Animated.Value(0);
    this.titleTranslateValue = new Animated.Value(0);
    this.titleScaleValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.imageOpacityValue.setValue(0);
    this.titleTranslateValue.setValue(0);
    this.titleScaleValue.setValue(0);
    Animated.sequence([
      Animated.timing(this.imageOpacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(this.titleTranslateValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }

  render() {
    const {image, title, data} = this.props;
    const imageOpacity = this.imageOpacityValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0.25, 0.5, 0.75, 1],
    });
    const imageOpacityStyle = {
      opacity: imageOpacity,
    };

    const titleMoveY = this.titleTranslateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 280],
    });

    const titleTransformStyle = {
      transform: [{translateY: titleMoveY}],
    };

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Animated.Image
            source={image}
            style={[styles.image, imageOpacityStyle]}
            resizeMode={'contain'}
          />
          <View style={styles.titleContainer}>
            <Animated.Text style={[styles.title, titleTransformStyle]}>
              {title}
            </Animated.Text>
          </View>
        </View>
        {data && (
          <View style={styles.dataContainer}>{this.renderDataRows(data)}</View>
        )}
      </View>
    );
  }

  renderDataRows = (data: PokemonStatus[]) => {
    return data.map((item, index: number) => {
      return (
        <DataRow
          label={item.label}
          value={item.value}
          index={index}
          key={item.label}
        />
      );
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleContainer: {
    position: 'absolute',
    top: -100,
  },
  mainContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 150,
  },
  dataContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
});
