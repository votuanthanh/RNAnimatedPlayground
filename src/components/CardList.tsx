import React from 'react';
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import Card from './Card';
import pokemon from '../data/pokemon';
import {HEADER_MAX_HEIGHT} from '../settings/layout';

interface Props {
  data: typeof pokemon;
  cardAction: any;
  viewAction: any;
  bookmarkAction: any;
  shareAction: any;
  onScroll: any;
  scrollEnabled: boolean;
}

const CardList: React.FunctionComponent<Props> = ({
  data,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction,
  onScroll,
  scrollEnabled,
}) => {
  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View style={{alignItems: 'center'}}>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({item}) => (
            <Card
              item={item}
              cardAction={cardAction}
              viewAction={viewAction}
              bookmarkAction={bookmarkAction}
              shareAction={shareAction}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scroll_container: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? HEADER_MAX_HEIGHT : 0,
  },
});

export default CardList;
