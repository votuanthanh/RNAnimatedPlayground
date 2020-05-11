import React, {Component} from 'react';
import {
  View,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import pokemons, {PokemonItem} from '../data/pokemon';
import pokemon_stats from '../data/pokemon-stats';
import CardList from '../components/CardList';
import AnimatedHeader from '../components/AnimatedHeader';
import {getRandomInt, shuffleArray} from '../lib/random';

import {HEADER_MAX_HEIGHT} from '../settings/layout';
import {HomeScreenNavigationProp} from '../../App';

export interface PokemonStatus {
  label: string;
  value: number;
}

interface Props {
  navigation: HomeScreenNavigationProp;
}
interface State {
  isModalVisible: boolean;
  pokemon: string;
  image: any;
  stats: Array<PokemonStatus>;
  pokemons: PokemonItem[];
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const springAnimationProperties = {
  type: LayoutAnimation.Types.spring,
  property: LayoutAnimation.Properties.scaleXY,
  springDamping: 0.1,
};

const animationConfig = {
  duration: 500, // how long the animation will take
  create: springAnimationProperties,
  update: springAnimationProperties,
  delete: springAnimationProperties,
};

export default class Home extends Component<Props, State> {
  state = {
    isModalVisible: false,
    pokemon: '',
    image: null,
    stats: [],
    pokemons: pokemons,
  };
  pokemon_stats: PokemonStatus[];
  nativeScrollY: any;

  constructor(props: Props) {
    super(props);
    this.pokemon_stats = [];
    // add this:
    this.nativeScrollY = new Animated.Value(
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    );
  }

  getPokemonStats = () => {
    let pokemon_stats_data: PokemonStatus[] = [];
    pokemon_stats.forEach((item) => {
      pokemon_stats_data.push({
        label: item,
        value: getRandomInt(25, 150),
      });
    });

    return pokemon_stats_data;
  };

  cardAction = () => {};

  viewAction = (pokemon: string, image: any) => {
    this.props.navigation.navigate('Detail', {
      title: pokemon,
      image: image,
      data: this.getPokemonStats(),
    });
  };

  bookmarkAction = () => {};

  shareAction = () => {
    this.props.navigation.navigate('');
  };

  shuffleData = () => {
    LayoutAnimation.configureNext(animationConfig); // configure next LayoutAnimation
    let newArray = shuffleArray(this.state.pokemons); // randomly order the items in the array
    this.setState({
      pokemons: newArray,
    });
  };

  render() {
    let nativeScrollY = Animated.add(
      this.nativeScrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );

    return (
      <View style={styles.container}>
        {/* <AnimatedHeader
          title={'Poke-Gallery'}
          nativeScrollY={nativeScrollY}
          onPress={this.shuffleData}
        /> */}
        {this.nativeScrollY && (
          <CardList
            data={this.state.pokemons}
            cardAction={this.cardAction}
            viewAction={this.viewAction}
            bookmarkAction={this.bookmarkAction}
            shareAction={this.shareAction}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.nativeScrollY}}}],
              {
                useNativeDriver: true,
              },
            )}
          />
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
