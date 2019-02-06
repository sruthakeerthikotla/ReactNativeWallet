import React from 'react';
import { Button, Text, Card, Avatar, FormInput, FormLabel, List, ListItem } from 'react-native-elements';
import { View, ScrollView, Platform, Image, FlatList, TouchableOpacity, CameraRoll, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../MainPageStyle';
import {WLResourceRequest} from 'react-native-ibm-mobilefirst';

const visaCard = require('../../../../assets/images/visacard2.png');
const masterCard = require('../../../../assets/images/mastercard.png');


export default class CardTab extends React.Component {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.setSelectedCard = this.setSelectedCard.bind(this);
    this.renderTransactionList = this.renderTransactionList.bind(this);
    //make call to adapter
    //assign the response of the adapter to returnedData of state
    //this.setState({returnedData:JSON});

    this.state = {
      selectedCard: {},
      returnedData:[{
        "valid": "MMYY",
        "balance": "$$$$$$$$",
        "name": ".....",
        "type": "visa",
        "transactions": [{
          "date": "May 1",
          "amount": "$200",
          "name": "Transfer from",
          "type": "Visa 6600 8800 0066 0088"
        }],
        "cardNumber": "xxxx xxxx xxxx xxxx"
      }, {
        "valid": "MMYY",
        "balance": "$$$$$$$$",
        "name": ".....",
        "type": "visa",
        "transactions": [{
          "date": "May 1",
          "amount": "$200",
          "name": "Transfer from",
          "type": "Visa 6600 8800 0066 0088"
        }],
        "cardNumber": "xxxx xxxx xxxx xxxx"
      }, {
        "valid": "MMYY",
        "balance": "$$$$$$$$",
        "name": ".....",
        "type": "mastercard",
        "transactions": [{
          "date": "May 1",
          "amount": "$200",
          "name": "Transfer from",
          "type": "Visa 6600 8800 0066 0088"
        }],
        "cardNumber": "xxxx xxxx xxxx xxxx"
      }, {
        "valid": "MMYY",
        "balance": "$$$$$$$$",
        "name": ".....",
        "type": "mastercard",
        "transactions": [{
          "date": "May 1",
          "amount": "$200",
          "name": "Transfer from",
          "type": "Visa 6600 8800 0066 0088"
        }],
        "cardNumber": "xxxx xxxx xxxx xxxx"
      }]
    };
  }

  componentDidMount(){
    var rr = new WLResourceRequest("adapters/ResourceAdapter/balance", WLResourceRequest.GET, 5000,"accessRestricted" );
    rr.send().then((response)=>{
      console.log('adapter response '+ JSON.stringify(response) );
      this.setState({
        returnedData: response.responseJSON,
        selectedCard: response.responseJSON[0]
      });
    }).catch((error)=>{
      console.log('error in adapter invoke' + JSON.stringify(error));
    })

  }

  setSelectedCard(card) {
    this.setState({
      selectedCard: card || {},
    });
  }

  renderTransactionList(transaction) {
    return (
      <View style={{ width: '100%', height: 40 }}>
        <Text >{transaction.item.name}</Text>
      </View>
    );
  }

  renderCard({ item, index }) {
    const viewWidth = Dimensions.get('window').width;

    return (
      <View style={{ width: viewWidth, padding: 10 }}>
        <Image
          style={{ width: '100%', resizeMode: 'cover' }}
          source={item.type === 'visa' ? visaCard : masterCard}
        />

        <Text style={styles.cardNumberLabel}>{item.cardNumber}</Text>
        <Text style={styles.cardNameLabel}>{item.name}</Text>
        <Text style={styles.cardValidLabel}>VALID THRU</Text>
        <Text style={styles.cardValid}>{item.valid}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.tabHeader}>Your Cards</Text>
        <Carousel
          data={this.state.returnedData}
          renderItem={this.renderCard}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          layout={'default'}
          onSnapToItem={(slideIndex) => { this.setSelectedCard(this.state.returnedData[slideIndex]); }}
        />
        <Text style={styles.balanceLabel}>BALANCE</Text>
        <Text style={styles.balance}>{this.state.selectedCard.balance}</Text>
        <List>
          <FlatList
            data={this.state.selectedCard.transactions}
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={transaction => (
              <View style={styles.transactionItemWrapper}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontFamily: 'CircularStd-Bold' }}>{`${transaction.item.name}`}</Text>
                    <Text style={{ fontFamily: 'CircularStd-Book', paddingTop: 4 }}>{transaction.item.type}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'CircularStd-Bold', fontSize: 20 }}>{transaction.item.amount}</Text>
                    <Text style={{ fontFamily: 'CircularStd-Book', fontSize: 10 }}>{transaction.item.date}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </List>
      </View>
    );
  }
}
