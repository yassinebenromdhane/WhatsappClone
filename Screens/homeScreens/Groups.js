import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const groups = ['GL1', 'BI1', 'GL2', 'BI2'];

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <View style={styles.container}>
      {selectedGroup ? (
        <View style={styles.forumContainer}>
          <Text style={styles.groupNameText}>Forum: {selectedGroup}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedGroup(null)}>
            <Text style={styles.backButtonText}>Back to Groups</Text>
          </TouchableOpacity>
        </View>
      ) : (
        groups.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={styles.groupButton}
            onPress={() => setSelectedGroup(group)}
          >
            <Text style={styles.groupText}>{group}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  groupButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  groupText: {
    color: '#fff',
    fontSize: 18,
  },
  forumContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupNameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});