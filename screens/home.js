import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import TOTP from '../mlib/totp'


class MainStack extends React.Component {

    static navigationOptions = {
        title: 'Authentificator',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
    };

    state = {
        timer: null
    };

    async componentWillMount() {
        try {
            AsyncStorage.getItem('@authentificator::listing').then((result) => {
                    if (result) {
                        list = JSON.parse(result)
                        this.props.dispatch({
                            type: 'QRCODE_INIT', data: {list}
                        })
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async removeItem() {
        try {
            await AsyncStorage.removeItem('@authentificator::listing');
        } catch (error) {
        }
    }


    clear = () => {
        this.props.dispatch({type: 'CLEAR'});
        this.removeItem();
        console.log("clear");
    };

    clearOne = id => {
        list = [...this.props.listing]
        list.splice(id, 1);
        const str = JSON.stringify(list);

        Alert.alert(
            'Deleted !!',
            'Are you sure delete entry ??',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => AsyncStorage.setItem('@authentificator::listing', str).then(() => {
                    this.props.dispatch({
                        type: 'QRCODE_INIT',
                        data: {
                            list: list
                        }
                    })
                })
                },
            ],
            {cancelable: false}
        )
    };

    componentDidUpdate() {
        const duration = 5000;
        if (!this.state.timer) {
            this.ret = setInterval(() => {
                this.setState({timer: this.state.timer + duration})
            }, duration)
        }
    }

    componentWillUnmount() {
        clearInterval(this.ret)
    }

    render() {
        if (this.props.listing.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textTitle}>First entry in App</Text>
                    <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={() => this.props.navigation.navigate("MyModal")}>
                        <Text> ADD </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        const list = this.props.listing.map((item, id) => {

            const token = new TOTP(item.secret, 5).generate()

            return (
                <TouchableOpacity style={styles.items} onLongPress={() => this.clearOne(id)} key={id}>
                    <Text style={styles.item}>{item.issuer}</Text>
                    <Text style={{fontWeight: 'bold', width: '100%', fontSize: 30}}>{token}</Text>
                    <Text style={styles.item}>{item.label}</Text>
                    <Text style={styles.item}>{item.secret}</Text>
                </TouchableOpacity>
            )
        });

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
        paddingHorizontal: 10,
        backgroundColor: Platform.OS === 'ios' ? '#f4d5bf' : '#e6e6fa',
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
    },
    textTitle: {
        textAlign: "center",
        fontSize: 20
    },
    item: {
        width: '100%'
    },
    items: {
        marginTop: 10,
        backgroundColor: "#ffd700",
        padding: 20,
        width: '90%'
    }
});

function mapStateToProps(state) {
    return {
        listing: state.listing
    }
}

export default connect(mapStateToProps)(MainStack)