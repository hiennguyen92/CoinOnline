import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';

import { List, ListItem } from 'react-native-elements';

import HeaderTitle from '../component/HeaderTitle';
import { removeAllCoins } from '../actions/actions';
import { connect } from 'react-redux';

const contentHeight = Dimensions.get('window').height;


class SettingController extends Component {
    static navigationOptions = ({ navigation }) => ({
      header: null
      // headerTitle: '设置' ,
      // headerStyle:{
      //     backgroundColor: '#3c82f7',
      // },
      // headerTitleStyle: {
      //     color: '#ffffff',
      // },
      // headerBackTitleStyle:{
      //     color: '#ffffff',
      // }
    });

    __rednerTitle() {
      if (Platform.OS === 'ios') {
        return <HeaderTitle title="Setting" indent={1}/>;
      }
      return <View/>;
    }

    render() {
      const { dispatch } = this.props;
      return (
            <View>
                <StatusBar barStyle="light-content"/>
                {this.__rednerTitle()}
                <ScrollView style={{ height: contentHeight }}>
                
                </ScrollView>

            </View>
      );
    }
}

const styles = StyleSheet.create({
  list: {
  }

});


function select(state) {
  return {
    visibleCoins: state.reducer.coins,
    visibleSettings: state.reducer.settings
  };
}

export default connect(select)(SettingController);
