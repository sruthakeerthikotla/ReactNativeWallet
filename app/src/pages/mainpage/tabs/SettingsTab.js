import React from 'react';
import { ButtonGroup, Text, Button } from 'react-native-elements';
import { View } from 'react-native';
import { JSONStoreCollection, WLJSONStore } from 'react-native-ibm-mobilefirst-jsonstore';
import PropTypes from 'prop-types';
import styles from '../MainPageStyle';

const buttons = ['100', '200', '300', '400', '500', '600', '700', '800'];

export default class SettingsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    var collection = new JSONStoreCollection('creditLimit');
    WLJSONStore.openCollections(['creditLimit']).then( res => {
      console.log('JSONStoreCollection opened successfully.');
      collection.findDocumentById(1).then( data => {
        console.log('JSONStoreCollection opened successfully.');
        this.setState({selectedIndex : buttons.indexOf(data.json.limit)});
      }).catch(err => {
        console.log('Failed to open JSONStoreCollection.');
      });    
    }).catch(err => {
      console.log('Failed to open JSONStoreCollection.');
    });    

    this.updateIndex = this.updateIndex.bind(this);
    this.saveLimit = this.saveLimit.bind(this);
  }

  updateIndex(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  saveLimit() {
    var collection = new JSONStoreCollection('creditLimit');
    collection.findAllDocuments().then( data => {
      console.log(JSON.stringify(data));
      
      if(data.length == 1) {
        data[0].json.limit = buttons[this.state.selectedIndex];
        collection.replaceDocument(data[0]).then(res =>{
          console.log('Limit updated successfully.');
        }).catch(err => {
          console.log('Failed to update limit.');
        });
      } else {
        collection.addData({limit: buttons[this.state.selectedIndex]}).then(data =>{
          console.log('Limit added successfully.');
        }).catch(err => {
          console.log('Failed to add limit.');
        });
      }
    }).catch(err => {
      console.log('Failed to fetch JSONStore Document');
    });
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <View style={styles.tabContainer}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
        >
          <Text style={styles.tabHeader}>Settings</Text>
          <View style={{marginTop: 10}}>
            <Button
              title="Logout"
              color="white"
              backgroundColor='red'
              borderRadius= {10}
              onPress={() => this.props.updateLoginStatus(false)}
            />
          </View>
        </View>
        <View style={styles.settingsWrapper}>
          <Text style={styles.settingsLabel}>Change limit for single Card Transaction</Text>
          <Text style={{ fontFamily: 'CircularStd-Book', marginBottom: 40 }}>(In thousand dollars)</Text>

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 80 }}
          />

          <View style={{height: 40, width: '100%', alignItems:'center'}}>
            <View style={{width: '50%', margin:10}}>
              <Button
                title="Change"
                backgroundColor="#8863fa"
                color="white"
                borderRadius= {10}
                onPress={this.saveLimit}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


SettingsTab.defaultProps = {
  updateLoginStatus: () => {},
};

SettingsTab.propTypes = {
  updateLoginStatus: PropTypes.func,
};
