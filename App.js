import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, head } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MainStack } from './screens/home';
import { ModalScreen } from './screens/screen';


const RootStack = StackNavigator(
    {
        home: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
    }
);

export default class App extends React.Component {

    render() {
        return (
            <RootStack/>
        )
    }
}


