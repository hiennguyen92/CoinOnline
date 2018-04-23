import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { addCoin, deleteCoin, pushBalance, setVisibilityFilter, showBalance, VisibilityFilters } from '../actions/actions';

import CoinItem from '../component/CoinItem';
import Header from '../component/HeaderMain';
import { editCoinMiddleware, updateCoinMiddleware } from '../middleware/CustomMiddleware';

const contentHeight = Dimensions.get('window').height - 300;

class MainController extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  getTotalBalance() {
    const arr = [...this.props.visibleCoins];
    if (arr.length === 0) return 0;
    const sum = arr.filter(item => !item.deleted).reduce((prev, current) => prev + parseFloat(current.balance), 0);
    return sum;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.refreshBalance();
  }

  refreshBalance() {
    const { dispatch } = this.props;
    // Update the balance to the new balance
    this.props.visibleCoins.map((item, index) => {
      if (!item.deleted) {
        dispatch(editCoinMiddleware(
          index,
          `${item.text.split('-')[0]}-${this.props.visibleSettings.nation}`,
          item.numbers,
          item.description
        ));
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const totalBalance = this.getTotalBalance();
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <Header
          nav={navigate}
          balance={totalBalance}
        />
        <ScrollView style={{ height: contentHeight, backgroundColor: '#f1f1f1' }}>
          {
            this.props.visibleCoins.map((item, index) => {
              if (!item.deleted) {
                return <CoinItem cuy={item.text} numbers={item.numbers} key={index} itemIndex={index} balance={item.balance} description={item.description} nav={navigate} />;
              }
            })
          }
        </ScrollView>
      </View>
    );
  }
}


function select(state) {
  return {
    visibleCoins: state.reducer.coins,
    visibleSettings: state.reducer.settings
  };
}
export default connect(select)(MainController);
