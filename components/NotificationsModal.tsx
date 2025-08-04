import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type NotificationItem = {
  date: string;
  time: string;
  title: string;
  message: string;
};

type NotificationsModalProps = {
  visible: boolean;
  notifications?: Record<string, NotificationItem>; // optional
  onClose: () => void;
};


const NotificationsModal: React.FC<NotificationsModalProps> = ({
  visible,
  notifications,
  onClose,
}) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleBack = () => {
    setSelectedKey(null);
  };

  const renderDetailModal = () => {
    if (!selectedKey || !notifications || !notifications[selectedKey]) return null;

    const { title, message } = notifications[selectedKey];
    const lines = message.split('\\');

    return (
      <View style={styles.modalContent}>
        <Text style={styles.detailTitle}>{title}</Text>
        {lines.map((line, index) => (
          <Text key={index} style={styles.messageLine}>
            {line.trim()}
          </Text>
        ))}
        <Pressable onPress={handleBack} style={styles.closeButton}>
          <Text style={styles.closeText}>Back</Text>
        </Pressable>
      </View>
    );
  };

  const renderListModal = () => {
    if (!notifications) {
      return (
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Notifications</Text>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications right now</Text>
          </View>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      );
    }

    const sortedEntries = Object.entries(notifications).sort(([, a], [, b]) => {
      const dateA = new Date(
        `${a.date.split('/').reverse().join('-')}T${a.time}`
      );
      const dateB = new Date(
        `${b.date.split('/').reverse().join('-')}T${b.time}`
      );

      return dateB.getTime() - dateA.getTime(); // newest to oldest
    });

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Notifications</Text>
        <FlatList
          data={sortedEntries}
          keyExtractor={([key]) => key}
          renderItem={({ item: [key, notif] }) => (
            <Pressable onPress={() => setSelectedKey(key)} style={styles.row}>
              <Text style={styles.title}>{notif.title}</Text>
              <Text style={styles.date}>{notif.date}</Text>
            </Pressable>
          )}
        />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </View>
    );
  };

  // **Here is the missing return:**
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalBackground}>
        {selectedKey === null ? renderListModal() : renderDetailModal()}
      </View>
    </Modal>
  );
};


export default NotificationsModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    paddingBottom: 22,
  },
  messageLine: {
    fontSize: 16,
    paddingBottom: 6,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#000000ff',
    borderRadius: 100,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
