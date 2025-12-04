import React from 'react';
import { TouchableOpacity } from 'react-native';

/**
 * SafeTabBarButton - Wrapper untuk TabBarButton yang menghapus key dari props
 * untuk menghindari warning "A props object containing a 'key' prop is being spread into jsx"
 */
const SafeTabBarButton = (props) => {
  const { key, ...restProps } = props;
  return <TouchableOpacity {...restProps} />;
};

export default SafeTabBarButton;

