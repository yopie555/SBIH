import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * SafeScreen - A reusable wrapper component that handles safe area insets
 * 
 * Props:
 * - children: React nodes to render
 * - style: Additional styles for the container
 * - backgroundColor: Background color for the screen (default: '#f5f7fa')
 * - statusBarStyle: 'light-content' or 'dark-content' (default: 'dark-content')
 * - statusBarBackgroundColor: Background color for status bar (default: 'transparent')
 * - edges: Which edges to apply safe area insets to (default: ['top', 'bottom'])
 *          Can be: 'top', 'bottom', 'left', 'right' or combination
 */
const SafeScreen = ({
    children,
    style,
    backgroundColor = '#f5f7fa',
    statusBarStyle = 'dark-content',
    statusBarBackgroundColor = 'transparent',
    edges = ['top', 'bottom'],
}) => {
    const insets = useSafeAreaInsets();

    const containerStyle = {
        flex: 1,
        backgroundColor,
        paddingTop: edges.includes('top') ? insets.top : 0,
        paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: edges.includes('left') ? insets.left : 0,
        paddingRight: edges.includes('right') ? insets.right : 0,
    };

    return (
        <View style={[containerStyle, style]}>
            <StatusBar
                translucent
                backgroundColor={statusBarBackgroundColor}
                barStyle={statusBarStyle}
            />
            {children}
        </View>
    );
};

export default SafeScreen;
