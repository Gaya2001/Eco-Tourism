import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

const metrics = [
    {
        icon: <MaterialIcons name="assignment" size={28} color="#F59E42" />,
        badge: '+12',
        badgeColor: '#F59E42',
        value: 24,
        label: 'Pending Applications',
    },
    {
        icon: <Ionicons name="document-text-outline" size={28} color="#60A5FA" />,
        badge: '+5',
        badgeColor: '#34D399',
        value: 156,
        label: 'Reports',
    },
    {
        icon: <Feather name="speaker" size={28} color="#A78BFA" />,
        badge: 'Active',
        badgeColor: '#60A5FA',
        value: 8,
        label: 'Campaigns',
    },
    {
        icon: <FontAwesome5 name="chart-line" size={28} color="#34D399" />,
        badge: 'Live',
        badgeColor: '#A78BFA',
        value: '92%',
        label: 'Analytics',
    },
];

const quickActions = [
    { icon: <Feather name="user-plus" size={24} color="#22C55E" />, label: 'Add User' },
    { icon: <Feather name="file-plus" size={24} color="#60A5FA" />, label: 'New Report' },
    { icon: <FontAwesome5 name="rocket" size={24} color="#A78BFA" />, label: 'Launch' },
    { icon: <Feather name="settings" size={24} color="#FACC15" />, label: 'Settings' },
    { icon: <Feather name="shield" size={24} color="#F43F5E" />, label: 'Security' },
    { icon: <Feather name="users" size={24} color="#6366F1" />, label: 'Team' },
];

interface AdminDashboardProps {
    onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

    return (
        <View style={styles.container}>
            {/* Dropdown Overlay */}
            {showLogoutDropdown && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                    }}
                    onPress={() => setShowLogoutDropdown(false)}
                    activeOpacity={1}
                />
            )}

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logoBox}>
                        <MaterialIcons name="eco" size={24} color="#22C55E" />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>EcoAdmin</Text>
                        <Text style={styles.headerSubtitle}>Dashboard</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.notificationBox}>
                        <Feather name="bell" size={22} color="#374151" />
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>3</Text>
                        </View>
                    </View>
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            onPress={() => setShowLogoutDropdown(!showLogoutDropdown)}
                        >
                            <Image source={require('../../assets/profileSarah.png')} style={styles.profileImage} />
                        </TouchableOpacity>
                        
                        {/* Logout Dropdown */}
                        {showLogoutDropdown && (
                            <View style={{
                                position: 'absolute',
                                top: 45,
                                right: 0,
                                backgroundColor: 'white',
                                borderRadius: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                minWidth: 120,
                                zIndex: 1000,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        padding: 12,
                                        borderRadius: 8,
                                    }}
                                    onPress={() => {
                                        setShowLogoutDropdown(false);
                                        onLogout && onLogout();
                                    }}
                                >
                                    <Text style={{ 
                                        color: '#dc2626', 
                                        fontSize: 16, 
                                        fontWeight: '500',
                                        textAlign: 'center'
                                    }}>
                                        Logout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Card */}
                <View style={styles.welcomeCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.welcomeTitle}>Welcome back, Admin!</Text>
                        <Text style={styles.welcomeSubtitle}>Here's what's happening today</Text>
                        <View style={styles.welcomeStatsRow}>
                            <View style={styles.welcomeStat}>
                                <Text style={styles.welcomeStatValue}>127</Text>
                                <Text style={styles.welcomeStatLabel}>Total Users</Text>
                            </View>
                            <View style={styles.welcomeStat}>
                                <Text style={styles.welcomeStatValue}>89%</Text>
                                <Text style={styles.welcomeStatLabel}>Growth</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.welcomeIconBox}>
                        <MaterialIcons name="eco" size={32} color="#fff" />
                    </View>
                </View>

                {/* Metrics Grid in White Box */}
                <View style={styles.metricsBox}>
                    <View style={styles.metricsGrid}>
                        {[0, 1].map((row) => (
                            <View key={row} style={styles.metricsGridRow}>
                                {metrics.slice(row * 2, row * 2 + 2).map((metric, idx) => (
                                    <View key={idx} style={styles.metricCard}>
                                        <View style={styles.metricIconBox}>
                                            {metric.icon}
                                            <View style={[styles.metricBadge, { backgroundColor: metric.badgeColor }]}>
                                                <Text style={styles.metricBadgeText}>{metric.badge}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.metricValue}>{metric.value}</Text>
                                        <Text style={styles.metricLabel}>{metric.label}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quick Actions Grid in White Box */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsBox}>
                    <View style={styles.quickActionsGrid}>
                        {[0, 1].map((row) => (
                            <View key={row} style={styles.quickActionsGridRow}>
                                {quickActions.slice(row * 3, row * 3 + 3).map((action, idx) => (
                                    <TouchableOpacity key={idx} style={styles.quickActionCard}>
                                        <View style={styles.quickActionIconBox}>{action.icon}</View>
                                        <Text style={styles.quickActionLabel}>{action.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.activityHeader}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.activityList}>
                    <View style={styles.activityItem}>
                        <View style={styles.activityIconCircleGreen}>
                            <Feather name="check" size={18} color="#22C55E" />
                        </View>
                        <View style={styles.activityTextBox}>
                            <Text style={styles.activityTitle}>Application approved</Text>
                            <Text style={styles.activityDesc}>John Doe's eco project was approved</Text>
                            <Text style={styles.activityTime}>2 minutes ago</Text>
                        </View>
                    </View>
                    <View style={styles.activityItem}>
                        <View style={styles.activityIconCircleBlue}>
                            <Feather name="file-text" size={18} color="#60A5FA" />
                        </View>
                        <View style={styles.activityTextBox}>
                            <Text style={styles.activityTitle}>New report submitted</Text>
                            <Text style={styles.activityDesc}>Monthly sustainability report uploaded</Text>
                            <Text style={styles.activityTime}>15 minutes ago</Text>
                        </View>
                    </View>
                    <View style={styles.activityItem}>
                        <View style={styles.activityIconCirclePurple}>
                            <Feather name="star" size={18} color="#A78BFA" />
                        </View>
                        <View style={styles.activityTextBox}>
                            <Text style={styles.activityTitle}>Campaign milestone reached</Text>
                            <Text style={styles.activityDesc}>Green Energy campaign hit 10K participants</Text>
                            <Text style={styles.activityTime}>1 hour ago</Text>
                        </View>
                    </View>
                </View>

                {/* Eco Impact Metrics */}
                <Text style={styles.sectionTitle}>Eco Impact Metrics</Text>
                <View style={styles.ecoMetricsCard}>
                    <View style={styles.ecoMetricsRow}>
                        <View style={styles.ecoMetricItem}>
                            <View style={styles.ecoMetricIconCircle}>
                                <FontAwesome5 name="tree" size={24} color="#22C55E" />
                            </View>
                            <Text style={styles.ecoMetricValue}>2,847</Text>
                            <Text style={styles.ecoMetricLabel}>Trees Planted</Text>
                        </View>
                        <View style={styles.ecoMetricItem}>
                            <View style={styles.ecoMetricIconCircleBlue}>
                                <Feather name="refresh-cw" size={24} color="#60A5FA" />
                            </View>
                            <Text style={styles.ecoMetricValue}>15.2K</Text>
                            <Text style={styles.ecoMetricLabel}>Kg Recycled</Text>
                        </View>
                    </View>
                    <View style={styles.ecoMetricFootprintRow}>
                        <Text style={styles.ecoMetricFootprintLabel}>Carbon Footprint Reduced</Text>
                        <Text style={styles.ecoMetricFootprintValue}>-23.4%</Text>
                    </View>
                    <View style={styles.ecoMetricFootprintBarBg}>
                        <View style={styles.ecoMetricFootprintBarFill} />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Feather name="home" size={22} color="#22C55E" />
                    <Text style={styles.bottomNavLabelActive}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Feather name="bar-chart-2" size={22} color="#374151" />
                    <Text style={styles.bottomNavLabel}>Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Feather name="users" size={22} color="#374151" />
                    <Text style={styles.bottomNavLabel}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavItem}>
                    <Feather name="settings" size={22} color="#374151" />
                    <Text style={styles.bottomNavLabel}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 10,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    logoBox: {
        backgroundColor: '#E6F9F0',
        borderRadius: 8,
        padding: 6,
        marginRight: 10,
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#22C55E' },
    headerSubtitle: { fontSize: 13, color: '#6B7280' },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    notificationBox: { marginRight: 14, position: 'relative' },
    notificationBadge: {
        position: 'absolute',
        top: -6,
        right: -8,
        backgroundColor: '#F43F5E',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 1,
        minWidth: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
    profileImage: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#22C55E' },

    welcomeCard: {
        backgroundColor: '#22C55E',
        borderRadius: 16,
        margin: 18,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#22C55E',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    welcomeTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    welcomeSubtitle: { color: '#E6F9F0', fontSize: 14, marginBottom: 12 },
    welcomeStatsRow: { flexDirection: 'row', gap: 32 },
    welcomeStat: { marginRight: 32 },
    welcomeStatValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    welcomeStatLabel: { color: '#E6F9F0', fontSize: 13 },
    welcomeIconBox: {
        backgroundColor: '#16A34A',
        borderRadius: 12,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    metricsBox: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginHorizontal: 18,
        marginBottom: 14,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    metricsGrid: {
        flexDirection: 'column',
        gap: 10,
    },
    metricsGridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    metricCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        marginHorizontal: 2,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
        position: 'relative',
    },
    metricIconBox: { position: 'relative', marginBottom: 8 },
    metricBadge: {
        position: 'absolute',
        top: -8,
        right: -12,
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metricBadgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
    metricValue: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginBottom: 2 },
    metricLabel: { fontSize: 13, color: '#6B7280', textAlign: 'center' },

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 8,
    },
    quickActionsBox: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginHorizontal: 18,
        marginBottom: 14,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    quickActionsGrid: {
        flexDirection: 'column',
        gap: 10,
    },
    quickActionsGridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    quickActionCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '30%',
        alignItems: 'center',
        paddingVertical: 14,
        margin: 5,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    quickActionIconBox: {
        backgroundColor: '#F7F8FA',
        borderRadius: 8,
        padding: 8,
        marginBottom: 6,
    },
    quickActionLabel: { fontSize: 13, color: '#374151', textAlign: 'center' },

    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 8,
    },
    viewAll: { color: '#22C55E', fontSize: 13, fontWeight: 'bold' },
    activityList: { marginHorizontal: 18, marginBottom: 10 },
    activityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
    activityIconCircleGreen: {
        backgroundColor: '#E6F9F0',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    activityIconCircleBlue: {
        backgroundColor: '#E0F2FE',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    activityIconCirclePurple: {
        backgroundColor: '#F3E8FF',
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    activityTextBox: { flex: 1 },
    activityTitle: { fontSize: 14, fontWeight: 'bold', color: '#374151' },
    activityDesc: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
    activityTime: { fontSize: 12, color: '#9CA3AF' },

    ecoMetricsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 18,
        marginBottom: 18,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    ecoMetricsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14 },
    ecoMetricItem: { alignItems: 'center' },
    ecoMetricIconCircle: {
        backgroundColor: '#E6F9F0',
        borderRadius: 16,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    ecoMetricIconCircleBlue: {
        backgroundColor: '#E0F2FE',
        borderRadius: 16,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    ecoMetricValue: { fontSize: 17, fontWeight: 'bold', color: '#374151' },
    ecoMetricLabel: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
    ecoMetricFootprintRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    ecoMetricFootprintLabel: { fontSize: 13, color: '#6B7280' },
    ecoMetricFootprintValue: { fontSize: 13, color: '#22C55E', fontWeight: 'bold' },
    ecoMetricFootprintBarBg: {
        backgroundColor: '#E6F9F0',
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    ecoMetricFootprintBarFill: {
        backgroundColor: '#22C55E',
        height: 8,
        width: '70%',
        borderRadius: 4,
    },

    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    bottomNavItem: { alignItems: 'center', flex: 1 },
    bottomNavLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    bottomNavLabelActive: { fontSize: 12, color: '#22C55E', marginTop: 2, fontWeight: 'bold' },
});
