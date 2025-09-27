import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function EcoAnalytics() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="eco" size={22} color="#22C55E" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>EcoAnalytics</Text>
        </View>
        <View style={styles.headerRight}>
          <Feather name="bell" size={22} color="#6B7280" style={{ marginRight: 16 }} />
          <FontAwesome5 name="user-circle" size={28} color="#6B7280" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tourism Growth */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Tourism Growth</Text>
            <Feather name="external-link" size={18} color="#22C55E" />
          </View>
          <Text style={styles.growthValue}>+24.5%</Text>
          <Text style={styles.growthChange}>+2.1%</Text>
          <Text style={styles.growthSub}>vs last month</Text>
        </View>

        {/* Active Tours & Sustainability */}
        <View style={styles.cardRowWrap}>
          <View style={styles.cardSmall}>
            <Text style={styles.cardSmallLabel}>Active Tours</Text>
            <FontAwesome5 name="map-marked-alt" size={18} color="#22C55E" />
            <Text style={styles.cardSmallValue}>1,247</Text>
            <Text style={styles.cardSmallChange}>+18 today</Text>
          </View>
          <View style={styles.cardSmall}>
            <Text style={styles.cardSmallLabel}>Sustainability</Text>
            <Feather name="filter" size={18} color="#22C55E" />
            <Text style={styles.cardSmallValue}>8.7</Text>
            <Text style={styles.cardSmallChange}>Excellent</Text>
          </View>
        </View>

        {/* Tourism Growth Trend */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Tourism Growth Trend</Text>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>Last 6 months</Text>
              <Feather name="chevron-down" size={16} color="#374151" />
            </TouchableOpacity>
          </View>
          {/* Enhanced Line Chart with Axes */}
          <View style={styles.chartArea}>
            {/* Y Axis */}
            <View style={styles.yAxisChart}>
              {[0, 10, 20, 30].map((val) => (
                <Text key={val} style={styles.yAxisChartLabel}>
                  {val}%
                </Text>
              ))}
            </View>
            {/* X Axis */}
            <View style={styles.xAxisChart}>
              {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, idx) => (
                <Text key={month} style={styles.xAxisChartLabel}>
                  {month}
                </Text>
              ))}
            </View>
            {/* Line and Points */}
            <View style={styles.lineChartContainer}>
              {/* SVG-like line using absolute Views */}
              {/* Data points for 6 months */}
              {(() => {
                const data = [10, 14, 17, 20, 22, 25];
                const points = data.map((val, idx) => ({
                  x: 32 + idx * 40,
                  y: 140 - val * 4,
                }));
                // Draw lines between points
                const lines = points.slice(1).map((pt, idx) => {
                  const prev = points[idx];
                  return (
                    <View
                      key={`line-${idx}`}
                      style={{
                        position: 'absolute',
                        left: prev.x,
                        top: prev.y,
                        width: Math.sqrt(Math.pow(pt.x - prev.x, 2) + Math.pow(pt.y - prev.y, 2)),
                        height: 2,
                        backgroundColor: '#22C55E',
                        transform: [
                          {
                            rotateZ: `${(Math.atan2(pt.y - prev.y, pt.x - prev.x) * 180) / Math.PI}deg`,
                          },
                        ],
                        zIndex: 2,
                      }}
                    />
                  );
                });
                // Draw dots
                const dots = points.map((pt, idx) => (
                  <View
                    key={`dot-${idx}`}
                    style={{
                      position: 'absolute',
                      left: pt.x - 5,
                      top: pt.y - 5,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#22C55E',
                      borderWidth: 2,
                      borderColor: '#fff',
                      zIndex: 3,
                    }}
                  />
                ));
                return [...lines, ...dots];
              })()}
              {/* X and Y axis lines */}
              <View style={styles.chartYAxisLine} />
              <View style={styles.chartXAxisLine} />
            </View>
          </View>
        </View>

        {/* Activity Heatmap */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Activity Heatmap</Text>
          <Text style={styles.heatmapSub}>Average days spent by tourists at each location</Text>
          <View style={styles.heatmapArea}>
            {/* Simple Vertical Bar Graph */}
            <View style={styles.barGraphContainer}>
              {/* Y-axis labels */}
              <View style={styles.yAxisLabels}>
                {[10, 8, 6, 4, 2, 0].map((val) => (
                  <Text key={val} style={styles.yAxisLabel}>
                    {val}
                  </Text>
                ))}
              </View>
              {/* Bars and X-axis */}
              <View style={styles.barsArea}>
                {[
                  { location: 'Sigiriya', days: 7 },
                  { location: 'Arugam Bay', days: 5 }, // reduced height
                  { location: 'Mirissa', days: 6 },
                  { location: 'Galle', days: 4 },
                ].map((loc, idx) => (
                  <View key={loc.location} style={styles.barItem}>
                    <View style={[styles.bar, { height: loc.days * 18 }]} />
                    <Text style={styles.xAxisLabel}>{loc.location}</Text>
                  </View>
                ))}
                {/* Y-axis line */}
                <View style={styles.yAxisLine} />
                {/* X-axis line */}
                <View style={styles.xAxisLine} />
              </View>
            </View>
          </View>
        </View>

        {/* Sustainability Index */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Sustainability Index</Text>
            <Text style={styles.updatedText}>Updated 2h ago</Text>
          </View>
          <View style={styles.sustainRow}>
            <View style={styles.sustainItem}>
              <FontAwesome5 name="tint" size={18} color="#38BDF8" style={{ paddingRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sustainLabel}>Water Conservation</Text>
                <Text style={styles.sustainSub}>92% efficiency</Text>
              </View>
              <Text style={[styles.sustainValue, { color: '#38BDF8' }]}>9.2</Text>
            </View>
            <View style={styles.sustainItem}>
              <Feather name="wind" size={18} color="#22C55E" style={{ paddingRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sustainLabel}>Carbon Footprint</Text>
                <Text style={styles.sustainSub}>15% reduction</Text>
              </View>
              <Text style={[styles.sustainValue, { color: '#22C55E' }]}>8.5</Text>
            </View>
            <View style={styles.sustainItem}>
              <FontAwesome5 name="trash" size={18} color="#F59E42" style={{ paddingRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sustainLabel}>Waste Management</Text>
                <Text style={styles.sustainSub}>78% recycled</Text>
              </View>
              <Text style={[styles.sustainValue, { color: '#F59E42' }]}>7.8</Text>
            </View>
            <View style={styles.sustainItem}>
              <FontAwesome5 name="users" size={18} color="#A78BFA" style={{ paddingRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sustainLabel}>Local Community</Text>
                <Text style={styles.sustainSub}>High engagement</Text>
              </View>
              <Text style={[styles.sustainValue, { color: '#A78BFA' }]}>9.1</Text>
            </View>
          </View>
        </View>

        {/* Recent Insights */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <Text style={styles.cardLabel}>Recent Insights</Text>
          <View style={styles.insightItemGreen}>
            <FontAwesome5 name="map-pin" size={16} color="#22C55E" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Peak Activity Alert</Text>
              <Text style={styles.insightDesc}>
                Northern trail experiencing 40% higher traffic than usual. Consider capacity
                management.
              </Text>
              <Text style={styles.insightTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.insightItemBlue}>
            <FontAwesome5 name="tint" size={16} color="#38BDF8" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Sustainability Milestone</Text>
              <Text style={styles.insightDesc}>
                Water conservation efforts have reduced usage by 25% this quarter.
              </Text>
              <Text style={styles.insightTime}>5 hours ago</Text>
            </View>
          </View>
          <View style={styles.insightItemYellow}>
            <Feather name="cloud" size={16} color="#F59E42" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Weather Impact</Text>
              <Text style={styles.insightDesc}>
                Upcoming storm may affect coastal activities. Prepare contingency plans.
              </Text>
              <Text style={styles.insightTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  yAxisLine: {
    position: 'absolute',
    left: 10, // shifted left from 24
    bottom: 18,
    width: 2,
    height: 160,
    backgroundColor: '#CBD5E1',
    zIndex: 1,
  },
  xAxisLine: {
    position: 'absolute',
    left: 24,
    bottom: 40, // moved up from 18
    width: '85%',
    height: 2,
    backgroundColor: '#CBD5E1',
    zIndex: 1,
  },
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
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  yAxisChart: {
    position: 'absolute',
    left: 0,
    top: 8,
    height: 140,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 10,
    paddingLeft: 8,
  },
  yAxisChartLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'right',
    marginBottom: 2,
  },
  xAxisChart: {
    position: 'absolute',
    left: 32,
    bottom: 0,
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  xAxisChartLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    width: 40,
  },
  lineChartContainer: {
    position: 'absolute',
    left: 0,
    top: 8,
    width: '100%',
    height: 140,
  },
  chartYAxisLine: {
    position: 'absolute',
    left: 30, // shifted right from 20
    top: 0,
    width: 2,
    height: 140,
    backgroundColor: '#CBD5E1',
    zIndex: 1,
  },
  chartXAxisLine: {
    position: 'absolute',
    left: 32,
    top: 140,
    width: 240,
    height: 2,
    backgroundColor: '#CBD5E1',
    zIndex: 1,
  },
  // ...existing code...
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  growthValue: { fontSize: 28, fontWeight: 'bold', color: '#22C55E', marginTop: 8 },
  growthChange: { fontSize: 15, color: '#22C55E', fontWeight: 'bold', marginTop: 2 },
  growthSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cardRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 12,
  },
  cardSmall: {
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
  cardSmallLabel: { fontSize: 13, color: '#6B7280', fontWeight: 'bold', marginBottom: 4 },
  cardSmallValue: { fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 4 },
  cardSmallChange: { fontSize: 13, color: '#22C55E', marginTop: 2 },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dropdownText: { fontSize: 13, color: '#374151', marginRight: 4 },
  chartArea: {
    height: 160,
    marginTop: 8,
    backgroundColor: '#E6FCE6',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  chartLine: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#22C55E',
    opacity: 0.3,
  },
  chartPoints: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chartPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    opacity: 1,
  },
  heatmapSub: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  heatmapArea: {
    height: 180,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barGraphContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginRight: 8,
    paddingBottom: 40, // moved up from 18
  },
  yAxisLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'right',
    height: 24,
  },
  barsArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    height: 160,
    justifyContent: 'space-around',
    paddingBottom: 18,
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 28,
    backgroundColor: '#22C55E',
    borderRadius: 6,
    marginBottom: 4,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
  updatedText: { fontSize: 12, color: '#22C55E', fontWeight: 'bold' },
  sustainRow: { marginTop: 8 },
  sustainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  sustainLabel: { fontSize: 13, color: '#222', fontWeight: 'bold' },
  sustainSub: { fontSize: 12, color: '#6B7280' },
  sustainValue: { fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
  insightItemGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FCE6',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  insightItemBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FC',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  insightItemYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9E6',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  insightTitle: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  insightDesc: { fontSize: 13, color: '#374151', marginTop: 2 },
  insightTime: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
