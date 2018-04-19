import React from 'react';
import {StyleSheet, Text, View, Alert, head, Button} from 'react-native';
import {Constants, BarCodeScanner, Permissions} from 'expo';



export class ModalScreen extends React.Component {

    state = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };



    _handleBarCodeRead = ({data}) => {
        const {state, goBack } = this.props.navigation
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );

        let array =  data.match(/^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)/);
        label = array[1];
        secret =  array[2];
        issuer =  array[3];
        this.setState({
            label : label,
            secret : secret,
            issuer : issuer
        });


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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
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