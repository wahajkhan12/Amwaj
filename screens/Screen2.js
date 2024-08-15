import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import { useAuth } from './AuthContext';


const translations = {
  en: {
    yourjobs: "Your Jobs",
    normal: "Normal",
    task: "Task: ",
    department: "Department: ",
    status: "Status: ",
    serviceteam: "Service team will arrive at: ",
    approval: "Approval: ",
    fee: "Fee: ",
    approve: "Approve",
    close: "Close",
    pay: "Pay",
    urgentask: "Urgent Task",
  },
  ar: {
    yourjobs: "طلبات الصيانة",
    normal: " :صيانة عادية",
    task: " :التفاصيل",
    department: " :القسم",
    status: " :الحالة",
    serviceteam: " :سيتم ارسال فريق الصيانة في",
    approval: " :تمت الموافقة",
    fee: " :مجموع الرسوم",
    approve: "زر الموافقة",
    close: "زر الاغلاق",
    pay: "زر الدفع",
    urgentask: "المهمة العاجلة",
  },
};



const Jobs = () => {
  const { user } = useAuth();
  const [jobData, setJobData] = useState([]);
  const [urgentTask, setUrgentTask] = useState('');
  const [urgentStatus, setUrgentStatus] = useState('');
  const [dep, setDep] = useState('');
  const [balance, setBalance] = useState(null);
  const timestamp = new Date().toLocaleTimeString();
  const now = new Date().toLocaleDateString();


  const handletransaction = (dept, amount) => {
    if (parseInt(balance) < parseInt(amount)) {
      return
    }
    const db = getDatabase();
    const datenode = now.replace(/\//g, '-');
    const node = ref(db, 'transactions/' + user + '/' + datenode + '/' + timestamp);

    set(node, {
      mode: 'debitted',
      comments: dept + ' رسوم الخدمة المتعلقة بقسم ',
      amount: amount,
    })
      .then(() => {
        console.log('Transaction recorded successfully!');
        // Show success alert
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Show error alert
        alert('An error occurred while updating the status.');
      });
  };

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

  const handlewallet = (amount) => {
    const db = getDatabase();
    if (parseInt(balance) < parseInt(amount)) {
      alert('Insufficient Balance, Please top up your wallet');
      return
    }
    //const datenode = now.replace(/\//g, '-');
    const newbalance = parseInt(balance) - parseInt(amount);
    const node = ref(db, 'wallet/' + user);
    update(node, {
      balance: newbalance,
    })
      .then(() => {
        console.log('Wallet Updated successfully!');
        // Show success alert
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Show error alert
        alert('An error occurred while updating the status.');
      });
  };

  const handleApproveButtonPress = (dept) => {
    const db = getDatabase();
    const node = ref(db, 'normal/' + user + '/' + dept);
    update(node, {
      Approval: 'approved',
    })
      .then(() => {
        console.log('Job confirmed successfully!');
        // Show success alert
        alert('Job confirmed Successfully');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Show error alert
        alert('An error occurred while updating the status.');
      });
  };

  const handlePayButtonPress = (dept, amount) => {
    const db = getDatabase();
    if (parseInt(balance) < parseInt(amount)) {
      return
    }
    const node = ref(db, 'normal/' + user + '/' + dept);
    update(node, {
      Approval: 'Paid',
    })
      .then(() => {
        console.log('Payment confirmed successfully!');
        // Show success alert
        alert('Payment Received Successfully');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Show error alert
        alert('An error occurred while updating the status.');
      });
  };

  const handleCloseButtonPress = (dept) => {
    const db = getDatabase();
    const node = ref(db, 'normal/' + user + '/' + dept);

    update(node, {
      status: 'Closed',
    })
      .then(() => {
        console.log('Status updated successfully!');
        // Show success alert
        alert('Job closed Successfully');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Show error alert
        alert('An error occurred while updating the status.');
      });
  };



  const fetchJobData = async () => {
    const db = getDatabase();
    const node = ref(db, 'normal/' + user);
    const snapshot = await get(node);
    const value = snapshot.val();
    const data = value
      ? Object.entries(value).map(([dept, deptData]) => ({ dept, ...deptData }))
      : [];
    setJobData(data);
  };

  const fetchUrgentTask = async () => {
    const db = getDatabase();
    const node = ref(db, 'urgent/' + user + '/task');
    const snapshot = await get(node);
    const value = snapshot.val();
    setUrgentTask(value);
  };

  const fetchUrgentStatus = async () => {
    const db = getDatabase();
    const node = ref(db, 'urgent/' + user + '/status');
    const snapshot = await get(node);
    const value = snapshot.val();
    setUrgentStatus(value);
  };

  useEffect(() => {
    fetchJobData();
    fetchUrgentTask();
    fetchUrgentStatus();
  }, []);

  useFocusEffect(() => {
    fetchJobData();
    fetchUrgentTask();
    fetchUrgentStatus();
    fetchBalance();
  });

  const renderItem = ({ item }) => {

    const sum = item.afee;  // Calculate the sum for the current item

    let prefTime12 = '';
    if (item.PrefTime) {
      const prefTime24 = item.PrefTime; // Assuming PrefTime is in 24-hour format (e.g., "15:30")
      const prefTimeParts = prefTime24.split(':');
      const hours24 = parseInt(prefTimeParts[0]);
      const minutes = parseInt(prefTimeParts[1]);
      const period = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = hours24 % 12 || 12;
      prefTime12 = hours12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;
    }

    if (item.status === 'Closed') {
      return null; // Return null to render nothing
    }

    return (
      <View style={styles.jobItem}>
        <Text style={styles.taskValue}>Normal</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>Task: </Text>
          <Text>{item.task}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Department: </Text>
          <Text>{item.dept}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Status: </Text>
          <Text>{item.status}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Service team will arrive at: </Text>
          <Text>{prefTime12}</Text>
          <Text>  </Text>
          <Text>{item.PrefDate}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.approvalText, item.Approval === 'awaiting' && styles.redText]}>Approval: </Text>
          <Text style={[styles.approvalText, item.Approval === 'awaiting' && styles.redText]}> {item.Approval}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>Fee: </Text>
          <Text style={{ fontWeight: 'bold' }}>{sum}</Text>
        </View>
        {item.Approval === 'awaiting' && item.Status !== 'Closed' && (
          <TouchableOpacity style={styles.ApproveButton} onPress={() => handleApproveButtonPress(item.dept)
          }>
            <Text>Approve</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Completed' && item.Approval === 'Paid' && (
          <TouchableOpacity style={styles.ApproveButton} onPress={() => handleCloseButtonPress(item.dept)}>
            <Text>Close</Text>
          </TouchableOpacity>
        )}
        {item.Approval === 'approved' && (
          <TouchableOpacity style={styles.ApproveButton} onPress={() => {
            handlePayButtonPress(item.dept, sum)
            handletransaction(item.dept, sum)
            handlewallet(sum)
          }}>
            <Text>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Jobs</Text>
      <FlatList
        data={jobData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.jobList}
      />
      <View style={[styles.urgentContainer, !urgentTask && styles.hidden]}>
        <Text style={styles.urgentLabel}>Urgent task</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.urgentStatus}>Task: </Text>
          {urgentTask && <Text style={styles.urgentTask}>{urgentTask}</Text>}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.urgentStatus}>Status: </Text>
          <Text style={[styles.urgentStatus, { color: urgentStatus === 'Seen' || urgentStatus === 'In Progress' || urgentStatus === 'Pending' ? 'red' : 'green' }]}>
            {urgentStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  jobList: {
    flex: 1,
    marginBottom: 16,
  },
  jobItem: {
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
  taskValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  urgentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: '40%',
  },
  urgentLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  urgentTask: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  urgentStatus: {
    fontSize: 16,
    color: '#666',
  },
  approvalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', // Default color for approval text
  },
  redText: {
    color: 'red',
  },
  ApproveButton: {
    marginTop: 10,
    backgroundColor: '#5FD164',
    padding: 8,
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default Jobs;
