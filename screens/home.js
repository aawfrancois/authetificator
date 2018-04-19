import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, head } from 'react-native';



export class MainStack extends React.Component {

    static navigationOptions = {
        title: 'Authentificator',
    };


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MyModal')}
                    style={styles.buttonAdd}
                >
                    <Text> Add </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonClear}
                >
                    <Text> Clear </Text>
                </TouchableOpacity>
                {/*<View style={[styles.countContainer]}>
                 <Text style={[styles.countText]}>
                 { this.state.count !== 0 ? this.state.count : null}
                 </Text>
                 </View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    buttonAdd: {
        alignItems: 'center',
        backgroundColor: '#8bc900',
        padding: 10,
        marginBottom: 30,
        marginTop: 50
    },
    buttonClear: {
        alignItems: 'center',
        backgroundColor: '#e81f3f',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
});