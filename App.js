import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, head } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  MainStack  from './screens/home';
import  ModalScreen  from './screens/screen';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const initial_state = {
    listing: []
};

function reducer (prev_state = initial_state, action) {
    switch (action.type) {
        case 'ADD':
            return Object.assign({}, prev_state,{
                listing: [...prev_state.listing, action.data]
            });
        case 'CLEAR' :
            return Object.assign({}, prev_state, {
                listing: []
            });
        default:
            return prev_state
    }
}


const store = createStore(reducer)

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
            <Provider store={store}>
                <RootStack/>
            </Provider>
        )
    }
}


