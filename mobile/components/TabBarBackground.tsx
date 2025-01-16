import React from 'react';
import { View, StyleSheet } from 'react-native';

interface TabBarBackgroundProps {
  color?: string; // Couleur personnalisable
}

const TabBarBackground: React.FC<TabBarBackgroundProps> = ({ color = '#FFFFFF' }) => {
  return <View style={[styles.background, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default TabBarBackground;
