import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';



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

    _add = obj => {
        this.setState({listing:[...this.state.listing, obj]});
    };


    render()
    {
        const list = this.state.listing.map((item , id ) => {
            return (
                <View  key = {id}>
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
        marginTop : 10,
        padding: 10
    }
});