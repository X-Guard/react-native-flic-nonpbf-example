import React, { Component } from 'react';
import {
  Button,
  NativeEventEmitter,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Flic from 'react-native-flic-nonpbf';

if (Platform.OS === 'ios' && __DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.eventListener = false;
  }

  state = {
    status: '',
    statusHistory: [],
    pressCount: 0,
    buttonConnected: false,
  }

  componentDidMount() {
    if (!this.eventListener) {
      const FlicEvents = new NativeEventEmitter(Flic);
      FlicEvents.addListener('FLIC', event => this.receivedEvent(event));

      Flic.initFlic('52067c97-f6a5-4f48-82d7-d8121664f5de', 'f86d3b63-3c90-4db4-bcca-856321160fcd');
    }
  }

  receivedEvent(response) {
    const { pressCount, statusHistory } = this.state;

    console.log('Response received:', response);

    if (response.event) {
      this.setState({
        status: response,
        statusHistory: [ ...statusHistory, response.event ],
      });

      switch (response.event) {
        case 'didReceiveButtonClick':
          this.setState({ pressCount: pressCount + 1 });
          break;

        default:
      }
    }
  }

  render() {
    const { statusHistory, status, pressCount } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Flic Example</Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Button title="Init Flic" onPress={() => Flic.initFlic()} />
            <Button title="Grab Button" onPress={() => Flic.grabFlicButton('FlicExampleApp')} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Button title="Get Count" onPress={() => Flic.getButtonCount()} />
            <Button title="Get BT status" onPress={() => Flic.getBluetoothState()} />
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Button title="Connect buttons" onPress={() => Flic.connectKnownButtons()} />
            <Button title="Remove buttons" onPress={() => Flic.removeAllButtons()} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Button title="Disconnect buttons" onPress={() => Flic.disconnectKnownButtons()} />
            <Button title="Flash LED" onPress={() => Flic.indicateLED(3)} />
          </View>
        </View>

        <Text style={{ marginTop: 10}}>Flic event:</Text>
        <Text style={{ marginBottom: 10 }}>{JSON.stringify(status)}</Text>

        <Text>Flic history:</Text>
        <ScrollView style={{ paddingVertical: 20 }}>
          {Object.keys(statusHistory.reverse()).map(key => <Text key={key}>{statusHistory[key]}</Text>)}
        </ScrollView>

        {pressCount > 0 &&
          <Text style={{ fontSize: 24 }}>{pressCount} time(s) pressed</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 50,
  },
});
