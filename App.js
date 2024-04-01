import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, FlatList } from 'react-native';
import { surahNames, surahDetails } from './QuranData';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('surah');

  const filteredData = selectedTab === 'surah' ? surahDetails : surahNames;
  const filteredResults = filteredData.filter(item =>
    item.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSurahItem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        marginBottom: 10, borderColor: '#ccc',
        borderBottomWidth: 1, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 0, marginRight: 30 }}>
            <Text>{item.english}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginRight: 10 }}>Verses: {item.verses}</Text>
              <Text>{item.meanings}</Text>
            </View>
          </View>
          <Text style={{ alignSelf: 'flex-start' }}>{item.arabic}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderJuzzItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>{item.english}</Text>
        <Text>{item.arabic}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = selectedTab === 'surah' ? renderSurahItem : renderJuzzItem;

  return (
    <View style={[styles.container, darkMode && styles.darkMode]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quran Search</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{marginLeft: 150}}>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
          />
          </View>
          
        </View>
      </View>

      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search..."
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'surah' && styles.selectedTab]}
          onPress={() => setSelectedTab('surah')}
        >
          <Text style={styles.tabButtonText}>Surah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'juzz' && styles.selectedTab]}
          onPress={() => setSelectedTab('juzz')}
        >
          <Text style={styles.tabButtonText}>Juzz</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  darkMode: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: '#CF9FFF',
  },
  tabButtonText: {
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,

    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
});

export default App;
