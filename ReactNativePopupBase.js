import React, { Component, Fragment } from 'react';
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
                if (this.state.showPopup) {
                    this.onPopupOutsidePressed();
                }
            },
        });

        this._panResponderPopup = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: () => true,
        });
    }

    componentDidMount() {
        setTimeout(() => {
            
        }, 200);
    }


    onButtonPressed(event) {
        this.containerRef.measure((width, height, px, py, fx, fy) => {
            console.log(fx, fy);
            this.setState({
                pageOffsetX: fx,
                pageOffsetY: fy,
                showPopup: true,
            })
        });
    }

    onPopupOutsidePressed() {
        this.setState({ showPopup: false, });
    }


    render() {
        const { children } = this.props;
        const { pageOffsetX, pageOffsetY, showPopup } = this.state;

        return (
            <View 
                style={{
                    position: 'relative',
                    height: showPopup ? deviceHeight : 'auto',
                    width: showPopup ? deviceWidth : 'auto',
                    top: showPopup ? -pageOffsetY : 0,
                    left: showPopup ? -pageOffsetX : 0,
                    backgroundColor: 'yellow',
                }}
                ref={(instance) => this.containerRef = instance}
                { ...this._panResponderPopupContainer.panHandlers }
            >
                {/* Background container: width = deviceWidth, height = deviceHeight, position: fixed, top = 0, left = 0 */}
                {showPopup && (
                    <Fragment>
                        <View
                            style={{
                                position: 'absolute',
                                top: pageOffsetY,
                                left: pageOffsetX,
                            }}
                            { ...this._panResponderPopup.panHandlers }
                        >
                            <TouchableWithoutFeedback onPress={ this.onButtonPressed }>
                                <View>{ children }</View>
                            </TouchableWithoutFeedback>
                            <Text>popup content</Text>
                        </View>
                    </Fragment>
                )}

                {!showPopup && (
                    <TouchableWithoutFeedback onPress={ this.onButtonPressed }>
                        <View>{ children }</View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        );
    }
}
