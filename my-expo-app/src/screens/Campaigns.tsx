import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function Campaigns({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header with navigation button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.navBtn}>
          <Feather name="menu" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaigns</Text>
        <View style={styles.headerIcons}>
          <Feather name="search" size={20} color="#6B7280" style={{ marginRight: 18 }} />
          <Feather name="bell" size={20} color="#6B7280" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Active</Text>
            <MaterialIcons name="trending-up" size={18} color="#22C55E" style={{ marginTop: 4 }} />
            <Text style={styles.statsValue}>12</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Completed</Text>
            <Feather name="check-circle" size={18} color="#22C55E" style={{ marginTop: 4 }} />
            <Text style={styles.statsValue}>48</Text>
          </View>
        </View>

        {/* Create Campaign Button */}
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnText}>+ Create New Campaign</Text>
        </TouchableOpacity>

        {/* Recent Campaigns */}
        <View style={styles.recentRow}>
          <Text style={styles.recentLabel}>Recent Campaigns</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Campaign Cards */}
        <View style={styles.campaignCard}>
          <View style={styles.campaignHeaderRow}>
            <Text style={styles.campaignTitle}>Summer Sale Push</Text>
            <View style={styles.statusActive}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <Text style={styles.campaignType}>Push Notification</Text>
          <View style={styles.campaignInfoRow}>
            <Text style={styles.campaignInfo}>Sent: 15,432</Text>
            <Text style={styles.campaignInfo}>Opens: 8,321</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: '60%' }]} />
          </View>
        </View>

        <View style={styles.campaignCard}>
          <View style={styles.campaignHeaderRow}>
            <Text style={styles.campaignTitle}>Weekly Newsletter</Text>
            <View style={styles.statusScheduled}>
              <Text style={styles.statusText}>Scheduled</Text>
            </View>
          </View>
          <Text style={styles.campaignType}>Email Campaign</Text>
          <View style={styles.campaignInfoRow}>
            <Text style={styles.campaignInfo}>Recipients: 23,567</Text>
            <Text style={styles.campaignInfo}>Tomorrow 9:00 AM</Text>
          </View>
        </View>

        <View style={styles.campaignCard}>
          <View style={styles.campaignHeaderRow}>
            <Text style={styles.campaignTitle}>Product Launch</Text>
            <View style={styles.statusCompleted}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
          <Text style={styles.campaignType}>Push Notification</Text>
          <View style={styles.campaignInfoRow}>
            <Text style={styles.campaignInfo}>Sent: 45,123</Text>
            <Text style={styles.campaignInfo}>Opens: 28,456</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: '80%' }]} />
          </View>
        </View>

        <View style={[styles.campaignCard, { marginBottom: 40 }]}>
          <View style={styles.campaignHeaderRow}>
            <Text style={styles.campaignTitle}>App Update Notice</Text>
            <View style={styles.statusDraft}>
              <Text style={styles.statusText}>Draft</Text>
            </View>
          </View>
          <Text style={styles.campaignType}>Push Notification</Text>
          <View style={styles.campaignInfoRow}>
            <Text style={styles.campaignInfo}>Target: 67,890</Text>
            <Text style={styles.campaignInfo}>Created 2 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  navBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 16,
  },
  statsBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  statsLabel: { fontSize: 13, color: '#6B7280', fontWeight: 'bold', marginBottom: 4 },
  statsValue: { fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 4 },
  createBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  recentLabel: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  viewAll: { fontSize: 13, color: '#22C55E', fontWeight: 'bold' },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  campaignHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  campaignTitle: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  campaignType: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  campaignInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 6,
  },
  campaignInfo: { fontSize: 13, color: '#374151' },
  statusActive: {
    backgroundColor: '#E6FCE6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusScheduled: {
    backgroundColor: '#E6F0FC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusCompleted: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusDraft: {
    backgroundColor: '#FEF9E6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusText: { fontSize: 13, fontWeight: 'bold', color: '#6B7280' },
  progressBarBg: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    height: 7,
    marginTop: 8,
    marginBottom: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#22C55E',
    height: 7,
    borderRadius: 6,
  },
});
