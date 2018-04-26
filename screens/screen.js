import React from 'react';
import {Platform, StyleSheet, Text, View, Alert, head, Button} from 'react-native';
import {Constants, BarCodeScanner, Permissions} from 'expo';
import {connect} from 'react-redux';
import  _  from 'lodash';


class ModalScreen extends React.Component {

    state = {
        hasCameraPermission: null
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead = ({type, data}) => {


        let array = data.match(/^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/);
        if (!array) {
            Alert.alert(
                'Scan not possible!!  Wrong Type!! ',
            );
        } else {

            label = array[1]
            secret = array[2]
            issuer = array[3]

            const obj = {
                label,
                secret,
                issuer
            };

            if (_.some(this.props.listing, obj)) {
                alert(`Sorry the entry ${obj.label} already exist`)

            } else {
                this.props.dispatch({type: 'ADD', data: obj})
            }

        }
        this.props.navigation.goBack();


    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{height: 200, width: 200}}
                        />
                }
                <Text> {this.state.secret} {this.state.label} {this.state.issuer} </Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        listing: state.listing
    }
}

export default connect(mapStateToProps)(ModalScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
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
    }
});