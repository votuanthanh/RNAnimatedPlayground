import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  icon: string;
  label: string;
  bgColor: any;
};

const IconLabel: React.FunctionComponent<Props> = ({icon, label, bgColor}) => {
  let backgroundColor = {backgroundColor: bgColor};
  return (
    <TouchableOpacity
      onPress={() => null}
      style={[styles.shareButton, backgroundColor]}>
      <Icon name={icon} style={styles.icon} size={30} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    flex: 2,
  },
  label: {
    flex: 8,
    marginTop: 5,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IconLabel;
