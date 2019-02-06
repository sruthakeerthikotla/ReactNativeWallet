import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 0,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FCFAF2',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  tabContainer: {
    margin: 0,
  },
  tabHeader: {
    marginLeft: 24,
    marginTop: 31,
    fontFamily: 'CircularStd-Medium',
    fontSize: 40,
    color: '#444444',
    paddingLeft: 4,
  },
  cardNameLabel: {
    flex: 1,
    position: 'absolute',
    bottom: 60,
    left: 40,
    fontFamily: 'kredit',
    fontSize: 20,
  },
  cardValidLabel: {
    flex: 1,
    position: 'absolute',
    bottom: 100,
    left: 40,
    fontFamily: 'CircularStd-Book',
    fontSize: 10,
  },
  cardValid: {
    flex: 1,
    position: 'absolute',
    bottom: 96,
    left: 106,
    fontFamily: 'kredit',
    fontSize: 16,
  },
  cardNumberLabel: {
    flex: 1,
    position: 'absolute',
    top: 100,
    left: 40,
    fontFamily: 'kredit',
    fontSize: 31,
  },
  balanceLabel: {
    fontFamily: 'CircularStd-Book',
    fontSize: 13,
    alignSelf: 'center',
  },
  balance: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 26,
    alignSelf: 'center',
    color: '#8863fa',
  },
  transactionItemWrapper: {
    backgroundColor: '#FCFAF2',
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#A8ABAF',
  },
  settingsWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
  },
  settingsLabel: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    color: '#444444',
    marginTop: 18,
  },
  settingsChangeBtn: {
    borderRadius: 40,
    backgroundColor: '#8863fa',
  },
  logoutBtn: {
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    marginTop: 31,
    marginRight: 10,
  },
  logoutBtnText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
    color: '#000000',
  },
});

export default styles;
