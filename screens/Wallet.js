import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { useAuth } from './AuthContext';

export default function Wallet() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getBalance = async () => {
    const db = getDatabase();
    const node = ref(db, 'wallet/' + user + '/balance');
    // read the value
    const snapshot = await get(node);
    const value = snapshot.val();
    return value;
  }
  const fetchBalance = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };

  useEffect(() => {
    fetchBalance();
  });

  useEffect(() => {
    const fetchTransactions = () => {
      try {
        const db = getDatabase();
        const transactionsNode = ref(db, 'transactions/' + user); // Use user in the node path

        // Set up a listener to listen for changes in the transactions node
        onValue(transactionsNode, (snapshot) => {
          if (snapshot.exists()) {
            const transactionsData = snapshot.val();
            const transactionsArray = [];

            // Convert the transactions data into an array
            for (const date in transactionsData) {
              for (const timestamp in transactionsData[date]) {
                const transaction = transactionsData[date][timestamp];
                transactionsArray.push({
                  date,
                  timestamp,
                  ...transaction,
                });
              }
            }

            setTransactions(transactionsArray);
          }
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 10, marginBottom: 20, height: 100, width: '90%', backgroundColor: '#F9F9F9' }}>
        <View style={{ padding: 10, alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>           Your Wallet       </Text>
          <Text style={{ fontSize: 12 }}>Below is your wallet balance</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabelLeft}>Your Wallet Balance: : {balance} </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionItemText} >Date: {item.date}</Text>
              <Text>Timestamp: {item.timestamp}</Text>
              <Text>Mode: {item.mode}</Text>
              <Text>Comments: {item.comments}</Text>
              <Text>Amount: {item.amount}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.transactionsFlatList}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  inputLabelLeft: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputLabelRight: {
    fontSize: 12,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    paddingLeft: 10,
    width: '95%',
    height: '20%',
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: '#5FD164',
    padding: 8,
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button1: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderColor: '#FE6D53',
    borderWidth: 1,
  },
  button2: {
    backgroundColor: '#FE6D53',
    padding: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText1: {
    color: '#FE6D53',
    fontSize: 16,
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: 300,
    marginTop: 10,

  },
  blankFlatList: {
    flex: 1,
    marginTop: 16,
    backgroundColor: 'white', // You can adjust this color as needed
  },
  transactionItemText: {
    fontWeight: 'bold',
  },
  transactionItem: {
    padding: 5,
  }
});
