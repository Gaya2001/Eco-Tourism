import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const reports = [
    {
        type: 'Harassment',
        status: 'Open',
        description: 'User reported inappropriate behavior and offensive language in community chat.',
        user: 'Sarah Kim',
        time: '2 hours ago',
        priority: 'High',
        icon: <MaterialIcons name="report" size={22} color="#F87171" />,
        statusColor: '#F87171',
        priorityColor: '#F59E42',
    },
    {
        type: 'Spam Content',
        status: 'Open',
        description:
            'Multiple users reporting spam posts with promotional links in violation of community guidelines.',
        user: 'Mike Chen',
        time: '4 hours ago',
        priority: 'Medium',
        icon: <FontAwesome5 name="bullhorn" size={22} color="#FBBF24" />,
        statusColor: '#F87171',
        priorityColor: '#FBBF24',
    },
    {
        type: 'Copyright Violation',
        status: 'Resolved',
        description: 'User uploaded copyrighted material without permission. Content has been removed.',
        user: 'Emma Davis',
        time: '1 day ago',
        priority: 'High',
        icon: <Feather name="check-circle" size={22} color="#22C55E" />,
        statusColor: '#22C55E',
        priorityColor: '#F59E42',
    },
    {
        type: 'Privacy Violation',
        status: 'Open',
        description: 'User sharing personal information of another member without consent.',
        user: 'Alex Johnson',
        time: '6 hours ago',
        priority: 'High',
        icon: <FontAwesome5 name="user-secret" size={22} color="#A78BFA" />,
        statusColor: '#F87171',
        priorityColor: '#F59E42',
    },
    {
        type: 'Inappropriate Content',
        status: 'Open',
        description:
            "Posted content contains explicit material inappropriate for the platform's community standards.",
        user: 'David Wilson',
        time: '8 hours ago',
        priority: 'Medium',
        icon: <Feather name="slash" size={22} color="#60A5FA" />,
        statusColor: '#F87171',
        priorityColor: '#FBBF24',
    },
    {
        type: 'Fake Account',
        status: 'Resolved',
        description: 'Reported fake profile impersonating another user. Account has been suspended.',
        user: 'Lisa Taylor',
        time: '2 days ago',
        priority: 'High',
        icon: <Feather name="check-circle" size={22} color="#22C55E" />,
        statusColor: '#22C55E',
        priorityColor: '#F59E42',
    },
    {
        type: 'Hate Speech',
        status: 'Open',
        description:
            'User posting discriminatory content targeting specific groups in violation of community guidelines.',
        user: 'Tom Rodriguez',
        time: '12 hours ago',
        priority: 'High',
        icon: <FontAwesome5 name="bullhorn" size={22} color="#FBBF24" />,
        statusColor: '#F87171',
        priorityColor: '#F59E42',
    },
];

export default function ReportViolations() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="arrow-left" size={22} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reports & Violations</Text>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={22} color="#374151" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsRow}>
                <Text style={[styles.tab, styles.tabActive]}>All (24)</Text>
                <Text style={[styles.tab, styles.tabGray]}>Open (18)</Text>
                <Text style={[styles.tab, styles.tabGray]}>Resolved (6)</Text>
            </View>

            {/* Combined Stats Section */}
            <View style={styles.combinedStatsSection}>
                <View style={styles.combinedStatBox}>
                    <Text style={[styles.statValue, { color: '#F87171' }]}>18</Text>
                    <Text style={styles.statLabel}>Open Reports</Text>
                </View>
                <View style={styles.combinedStatBox}>
                    <Text style={[styles.statValue, { color: '#22C55E' }]}>6</Text>
                    <Text style={styles.statLabel}>Resolved</Text>
                </View>
                <View style={styles.combinedStatBox}>
                    <Text style={[styles.statValue, { color: '#F59E42' }]}>3</Text>
                    <Text style={styles.statLabel}>High Priority</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {reports.map((report, idx) => (
                    <View key={idx} style={styles.reportCard}>
                        <View style={styles.reportIcon}>{report.icon}</View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.reportHeaderRow}>
                                <Text style={styles.reportType}>{report.type}</Text>
                                <Text
                                    style={[
                                        styles.reportStatus,
                                        {
                                            backgroundColor: report.status === 'Open' ? '#FEE2E2' : '#D1FADF',
                                            color: report.statusColor,
                                        },
                                    ]}>
                                    {report.status}
                                </Text>
                            </View>
                            <Text style={styles.reportDesc}>{report.description}</Text>
                            <View style={styles.reportFooterRow}>
                                <View style={styles.reportUserRow}>
                                    <FontAwesome5 name="user-circle" size={16} color="#6B7280" />
                                    <Text style={styles.reportUser}>{report.user}</Text>
                                </View>
                                <Text style={styles.reportTime}>{report.time}</Text>
                                <Text
                                    style={[
                                        styles.reportPriority,
                                        {
                                            backgroundColor: report.priority === 'High' ? '#FDE68A' : '#F3F4F6',
                                            color: report.priorityColor,
                                        },
                                    ]}>
                                    {report.priority}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.loadMoreBtn}>
                    <Text style={styles.loadMoreText}>Load More Reports</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.fabBtn}>
                <Feather name="plus" size={28} color="#fff" />
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
    tabsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 10,
    },
    tab: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: 'bold',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    tabActive: { backgroundColor: '#2563EB', color: '#fff' },
    tabGray: { backgroundColor: '#F3F4F6', color: '#374151' },
    combinedStatsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        marginTop: 8,
        marginBottom: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
    },
    combinedStatBox: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 8,
    },
    statValue: { fontSize: 20, fontWeight: 'bold' },
    statLabel: { fontSize: 13, color: '#6B7280', marginTop: 2 },
    reportCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 14,
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    reportIcon: { marginRight: 12, marginTop: 2 },
    reportHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    reportType: { fontSize: 15, fontWeight: 'bold', color: '#222' },
    reportStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    reportDesc: { fontSize: 13, color: '#374151', marginBottom: 8 },
    reportFooterRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    reportUserRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    reportUser: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
    reportTime: { fontSize: 12, color: '#9CA3AF' },
    reportPriority: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginLeft: 4,
    },
    loadMoreBtn: { alignItems: 'center', marginVertical: 18, paddingBottom: 40 },
    loadMoreText: { color: '#2563EB', fontWeight: 'bold', fontSize: 15 },
    fabBtn: {
        position: 'absolute',
        right: 24,
        bottom: 32,
        backgroundColor: '#2563EB',
        borderRadius: 32,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
});
