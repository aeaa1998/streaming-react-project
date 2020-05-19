/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Keyboard, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HeaderHeightContext, useHeaderHeight } from '@react-navigation/stack';
// AutoScrollableView
class AutoScrollableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get('window').height
            //  -= props.useHeaderHeight(),
        };
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

    }
    _keyboardDidShow(e) {
        this.setState({
            height:
                this.state.height - e.endCoordinates.height
        });
    }
    _keyboardDidHide(e) {
        this.setState({
            height:
                Dimensions.get('window').height
        });
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    render() {
        return (
            < KeyboardAwareScrollView
                enableOnAndroid={true}
                style={{ backgroundColor: 'white', minHeight: this.state.height }
                }
            >
                {this.props.children}
            </KeyboardAwareScrollView >
        );
    }
}

// const AutoScrollableView = (props) => {
//     return (
//         <Dummy
//         // useHeaderHeight={useHeaderHeight}
//         >
//             {props.children}
//         </Dummy>
//     );
// };

export default AutoScrollableView;
