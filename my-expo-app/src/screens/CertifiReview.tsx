import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

export default function CertifiReview() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certification Review</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Company Card */}
        <View style={styles.companyCard}>
          <View style={styles.companyIconBox}>
            <MaterialIcons name="eco" size={28} color="#22C55E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.companyName}>GreenTech Solutions</Text>
            <Text style={styles.companyType}>Sustainable Technology</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Pending Review</Text>
              </View>
              <Text style={styles.companyId}>ID: #GT2024001</Text>
            </View>
          </View>
        </View>

        {/* Eco-Score Assessment */}
        <View style={styles.ecoScoreBox}>
          <View>
            <Text style={styles.ecoScoreLabel}>Eco-Score Assessment</Text>
            <Text style={styles.ecoScoreValue}>
              <Text style={{ color: '#22C55E', fontWeight: 'bold', fontSize: 22 }}>8.7</Text>
              <Text style={styles.ecoScoreOutOf}> /10</Text>
            </Text>
          </View>
          <View style={styles.ecoScoreIconCircle}>
            <MaterialIcons name="eco" size={28} color="#22C55E" />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <Text style={[styles.tab, styles.tabActive]}>Details</Text>
          <Text style={styles.tab}>Documents</Text>
          <Text style={styles.tab}>History</Text>
        </View>
        <View style={styles.tabUnderline} />

        {/* Company Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Company Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Business Type</Text>
            <Text style={styles.infoValue}>Technology</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Registration</Text>
            <Text style={styles.infoValue}>LLC-2019-456</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>San Francisco, CA</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Employees</Text>
            <Text style={styles.infoValue}>25-50</Text>
          </View>
        </View>

        {/* Sustainability Metrics */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Sustainability Metrics</Text>
          <View style={styles.metricRow}>
            <View style={styles.metricIcon}>
              <Feather name="zap" size={16} color="#F59E42" />
            </View>
            <Text style={styles.metricLabel}>Energy Efficiency</Text>
            <View style={styles.metricBarBg}>
              <View style={[styles.metricBarFill, { width: '85%' }]} />
            </View>
            <Text style={styles.metricValue}>8.5</Text>
          </View>
          <View style={styles.metricRow}>
            <View style={styles.metricIcon}>
              <FontAwesome5 name="recycle" size={16} color="#22C55E" />
            </View>
            <Text style={styles.metricLabel}>Waste Reduction</Text>
            <View style={styles.metricBarBg}>
              <View style={[styles.metricBarFill, { width: '90%' }]} />
            </View>
            <Text style={styles.metricValue}>9.0</Text>
          </View>
          <View style={styles.metricRow}>
            <View style={styles.metricIcon}>
              <FontAwesome5 name="water" size={16} color="#60A5FA" />
            </View>
            <Text style={styles.metricLabel}>Water Conservation</Text>
            <View style={styles.metricBarBg}>
              <View style={[styles.metricBarFill, { width: '80%' }]} />
            </View>
            <Text style={styles.metricValue}>8.0</Text>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          <View style={styles.contactRow}>
            <Feather name="user" size={16} color="#374151" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.contactName}>Sarah Johnson</Text>
              <Text style={styles.contactRole}>CEO & Founder</Text>
            </View>
          </View>
          <View style={styles.contactRow}>
            <Feather name="mail" size={16} color="#374151" />
            <Text style={styles.contactValue}>sarah@greentech.com</Text>
          </View>
          <View style={styles.contactRow}>
            <Feather name="phone" size={16} color="#374151" />
            <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.rejectBtn}>
          <Text style={styles.rejectBtnText}>✗ Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.approveBtn}>
          <Text style={styles.approveBtnText}>✓ Approve</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.requestInfoBtn}>
        <Feather name="message-square" size={18} color="#374151" />
        <Text style={styles.requestInfoText}>Request More Info</Text>
      </TouchableOpacity>
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
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#222', flex: 1, textAlign: 'center' },

  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  companyIconBox: {
    backgroundColor: '#E6F9F0',
    borderRadius: 10,
    padding: 10,
    marginRight: 14,
  },
  companyName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  companyType: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  statusBadge: {
    backgroundColor: '#FDE68A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  statusBadgeText: { color: '#B45309', fontSize: 12, fontWeight: 'bold' },
  companyId: { fontSize: 12, color: '#6B7280' },

  ecoScoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  ecoScoreLabel: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  ecoScoreValue: { fontSize: 22, fontWeight: 'bold', color: '#22C55E' },
  ecoScoreOutOf: { fontSize: 15, color: '#6B7280' },
  ecoScoreIconCircle: {
    backgroundColor: '#E6F9F0',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 0,
    marginTop: 0,
    paddingVertical: 8,
  },
  tab: { fontSize: 15, color: '#6B7280', fontWeight: 'bold', paddingBottom: 6 },
  tabActive: { color: '#22C55E', borderBottomWidth: 2, borderBottomColor: '#22C55E' },
  tabUnderline: {
    height: 2,
    backgroundColor: '#22C55E',
    width: '25%',
    marginLeft: 16,
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', marginBottom: 10 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: { fontSize: 13, color: '#6B7280' },
  infoValue: { fontSize: 13, color: '#222', fontWeight: 'bold' },

  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: { marginRight: 8 },
  metricLabel: { fontSize: 13, color: '#374151', flex: 1 },
  metricBarBg: {
    backgroundColor: '#E6F9F0',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: 70,
    marginHorizontal: 8,
  },
  metricBarFill: {
    backgroundColor: '#22C55E',
    height: 8,
    borderRadius: 4,
  },
  metricValue: { fontSize: 13, color: '#222', fontWeight: 'bold', width: 32, textAlign: 'right' },

  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  contactName: { fontSize: 13, color: '#222', fontWeight: 'bold' },
  contactRole: { fontSize: 12, color: '#6B7280' },
  contactValue: { fontSize: 13, color: '#222', marginLeft: 8 },

  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  rejectBtn: {
    backgroundColor: '#F43F5E',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rejectBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  approveBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  approveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  requestInfoBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F7F8FA',
  padding: 14,
  margin: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  marginBottom: 40,
  },
  requestInfoText: { color: '#374151', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
});
