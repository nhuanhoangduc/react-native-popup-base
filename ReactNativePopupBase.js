import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, PanResponder } from 'react-native';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


export default class ReactNativePopupBase extends Component {

    state = {
        pageOffsetX: -1,
        pageOffsetY: -1,

        showPopup: false,
    }

    constructor(props) {
        super(props);

        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.onPopupOutsidePressed = this.onPopupOutsidePressed.bind(this);

        this._panResponderPopupContainer = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.onPopupOutsidePressed();
            },
        });

        this._panResponderPopup = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: () => true,
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.containerRef.measure((width, height, px, py, fx, fy) => {
                this.setState({
                    pageOffsetX: fx,
                    pageOffsetY: fy,
                })
            })
        }, 100);
    }


    onButtonPressed(event) {
        this.setState({ showPopup: true, });
    }

    onPopupOutsidePressed() {
        this.setState({ showPopup: false, });
    }


    render() {
        const { children } = this.props;
        const { pageOffsetX, pageOffsetY, showPopup } = this.state;

        return (
            <View style={{ position: 'relative', }} ref={(instance) => this.containerRef = instance}>
                {/* Background container: width = deviceWidth, height = deviceHeight, position: fixed, top = 0, left = 0 */}
                {showPopup && (
                    <View
                        style={{
                            width: deviceWidth,
                            height: deviceHeight,
                            position: 'absolute',
                            top: -pageOffsetY,
                            left: -pageOffsetX,
                            backgroundColor: 'transparent',
                        }}
                        { ...this._panResponderPopupContainer.panHandlers }
                    >
                        <View
                            style={{
                                position: 'relative',
                                top: pageOffsetY,
                                left: pageOffsetX,
                                backgroundColor: 'red',
                                width: 200,
                                height: 200,
                            }}
                            { ...this._panResponderPopup.panHandlers }
                        >
                            <Text>popup content</Text>
                        </View>
                    </View>
                )}

                <TouchableWithoutFeedback onPress={ this.onButtonPressed }>
                    <View>{ children }</View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
