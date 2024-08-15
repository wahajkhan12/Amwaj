import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'; // Import Firebase functions
import { getDatabase, ref, onValue, set, get, update } from 'firebase/database';
import { useAuth } from './AuthContext';

export default function Bills() {
  const { user } = useAuth(); // Get the user from AuthContext
  const [billData, setBillData] = useState([]);
  const timestamp = new Date().toLocaleTimeString();
  const now = new Date().toLocaleDateString();

  const getBalance = async () => {
    try {
      const db = getDatabase();
      const walletNode = ref(db, 'wallet/' + user + '/balance');
      const snapshot = await get(walletNode);
      return snapshot.val();
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  };

  const handleApproveButtonPress = async (date, dept, amount) => {
    try {
      const db = getDatabase();
      const currentBalance = await getBalance();

      if (isNaN(currentBalance) || currentBalance < amount) {
        alert('Insufficient Balance, Please top up your wallet');
        return;
      }

      const billsNode = ref(db, 'bills/' + user + '/' + dept + '/' + date);

      update(billsNode, {
        payment: 'Payed',
      })
        .then(async () => {
          console.log('Payment status updated successfully!');

          // Update wallet balance
          const newBalance = currentBalance - amount;
          await update(ref(db, 'wallet/' + user), {
            balance: newBalance,
          });

          // Record transaction
          const datenode = now.replace(/\//g, '-');
          const transactionNode = ref(db, 'transactions/' + user + '/' + datenode + '/' + timestamp);

          set(transactionNode, {
            mode: 'debitted',
            comments: 'Payment for ' + dept + ' bill',
            amount: amount,
          })
            .then(() => {
              console.log('Transaction recorded successfully!');
              // Show success alert for payment and transaction recording
              alert('Payment Successful');
            })
            .catch((error) => {
              console.error('Error recording transaction:', error);
              // Show error alert for transaction recording
              alert('An error occurred while recording the transaction.');
            });
        })
        .catch((error) => {
          console.error('Error updating payment status:', error);
          // Show error alert for payment status update
          alert('An error occurred while updating the payment status.');
        });
    } catch (error) {
      console.error('Error fetching balance:', error);
      // Show error alert for fetching balance
      alert('An error occurred while fetching the wallet balance.');
    }
  };

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const db = getDatabase();
        const billsNode = ref(db, 'bills/' + user); // Use user in the node path

        // Set up a listener to listen for changes in the database
        onValue(billsNode, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const billsArray = [];

            // Convert the nested data structure into a flat array
            for (const billType in userData) {
              for (const date in userData[billType]) {
                const bill = userData[billType][date];
                billsArray.push({
                  billType,
                  date,
                  ...bill,
                });
              }
            }

            setBillData(billsArray);
          }
        });
      } catch (error) {
        console.error('Error fetching bill data:', error);
      }
    };
    fetchBillData();
  }, [user]);

  return (
    <View style={styles.container}>
      <FlatList
        data={billData}
        renderItem={({ item }) => (
          <View style={styles.billItem}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Bill Type: </Text>
              <Text> {item.billType}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Date: </Text>
              <Text> {item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Amount: </Text>
              <Text> {item.amount}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Payment: </Text>
              <Text> {item.payment}</Text>
            </View>
            {item.payment === 'Pending' && (
              <TouchableOpacity style={styles.ApproveButton} onPress={() => handleApproveButtonPress(item.date, item.billType, item.amount)} >
                <Text >Pay</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  billItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flatList: {
    flex: 1,
    marginBottom: 16,
  },
  ApproveButton: {
    marginTop: 10,
    backgroundColor: '#5FD164',
    padding: 8,
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
  },
})