import React, { Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';

import ReactNativePopupBase from './ReactNativePopupBase';


export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    marginTop: 200,
                    marginLeft: 200,
                }}>
                    <ReactNativePopupBase>
                        <Text>Hoang Duc Nhuan</Text>
                    </ReactNativePopupBase>
                </View>
            </SafeAreaView>
        );
    }
}
