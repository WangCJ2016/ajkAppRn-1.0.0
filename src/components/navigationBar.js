import React from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View
} from 'react-native'
const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        };
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data? data : null}
            </View>
        );
    }

    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View>: null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.title}>{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={styles.navBarTitleContainer}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}
NavigationBar.propTypes = {
    //style: View.propTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton:  PropTypes.element,
    leftButton: PropTypes.element,
}
NavigationBar.defaultProps={
    statusBar: {
        barStyle: 'default',
        hidden: false,
    },
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth:0.5,
        borderColor: '#d8d8d8'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: '#333',
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,

    },
})


export default NavigationBar