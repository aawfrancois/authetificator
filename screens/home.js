import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import  _  from 'lodash';
import { connect } from 'react-redux'
import ModalScreen from './screen'


class MainStack extends React.Component {

    static navigationOptions = {
        title: 'Authentificator',
    };

    async componentWillMount(){
        try {
            const result = await AsyncStorage.getItem('listing')
            if (result) {
                list  = JSON.parse(result) ;
                this.setState({listing:JSON.parse(result)});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async pushItem(list){
        try {
            alert(list);
            await AsyncStorage.setItem('listing',list);
        } catch (error) {
        }
    }

    async removeItem(){
        try {
            await AsyncStorage.removeItem('listing');
        } catch (error) {
        }
    }

    clear = () => {
       this.props.dispatch({ type: 'CLEAR' })
        this.removeItem();
        console.log("clear");
    };


    render() {
        const list = this.props.listing.map((item, id) => {
            return (
                <View key={id}>
                    <Text style={styles.ListText}>
                        {item.issuer} {item.label} {item.secret}
                    </Text>
                </View>
            )
        })

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => this.props.navigation.navigate("MyModal")}>
                    <Text> ADD </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonClear} onPress={this.clear}>
                    <Text> CLEAR </Text>
                </TouchableOpacity>
                <ScrollView>{list}</ScrollView>


            </View>
        );
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
    },
    ListText: {
        alignItems: "center",
        color: '#000000',
        backgroundColor: "#ffff66",
        marginTop: 10,
        padding: 10,
        margin: 10
    }
});

function mapStateToProps(state) {
    return {
        listing: state.listing
    }
}

export default connect(mapStateToProps)(MainStack)