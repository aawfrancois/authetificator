import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import  _  from 'lodash';


export class MainStack extends React.Component {

    static navigationOptions = {
        title: 'Authentificator',
    };

    constructor() {
        super();
        this.state = {
            listing: []
        };
    }

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

    _add = obj => {
        if(_.some(this.state.listing, obj )){
            alert(`Sorry the entry ${obj.label} already exist`)

        } else {
            this.setState({listing:[...this.state.listing, obj]}, () => {
                list = JSON.stringify(this.state.listing)
                console.log(list);
                this.pushItem(list)

            });


        }

    };

    async removeItem(){
        try {
            await AsyncStorage.removeItem('listing');
        } catch (error) {
        }
    }

    clear = () => {
        this.setState({listing:[]});
        this.removeItem();
        console.log("clear");
    };


    render() {
        const list = this.state.listing.map((item, id) => {
            return (
                <View key={id}>
                    <Text style={styles.ListText}>
                        {item.label}
                        {item.secret}
                        {item.issuer}
                    </Text>
                </View>
            )
        })

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() =>
                        this.props.navigation.navigate("MyModal", {
                            add: this._add
                        })
                    }
                >
                    <Text> ADD </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonClear} onPress={this.clear}>
                    <Text> CLEAR</Text>
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
        padding: 10
    }
});