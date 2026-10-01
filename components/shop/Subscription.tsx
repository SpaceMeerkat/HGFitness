import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PricingModal from "../premium/PricingModal";
import { PremiumPlanCard, SubscriptionPlanCard } from "./PlanCards";

type WhatsHotProps = {
    handleBackButton: () => void;
  };

const highlights: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [
    { icon: 'calendar-outline', text: 'New program\nevery month' },
    { icon: 'trending-up-outline', text: 'Builds on\nthe last one' },
    { icon: 'stats-chart-outline', text: 'Track every\nsession' },
];

export function SubscriptionPage({handleBackButton}: WhatsHotProps) {

    const [premiumVisible, setPremiumVisible] = useState(false);
    const [defaultPricing, setDefaultPricing] = useState<"subscription" | "premium">("premium");

    const openPricing = (type: "subscription" | "premium") => {
        setDefaultPricing(type);
        setPremiumVisible(true);
    };

    return (
        <>

        <PricingModal
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
        defaultType={defaultPricing}
        />

        <ScrollView style={styles.page} contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                <Ionicons name="arrow-back" size={22} color="white" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.eyebrow}>FRESH TRAINING, EVERY MONTH</Text>
                <Text style={styles.title}>Monthly subscriptions</Text>
                <LinearGradient
                    colors={['rgba(255, 215, 0, 0)', 'rgba(255, 215, 0, 0.9)', 'rgba(255, 215, 0, 0)']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.titleRule}
                />
                <Text style={styles.subtitle}>
                    A brand new gym program lands every month, each one building on the last.
                </Text>
            </View>

            {/* Highlights */}
            <View style={styles.highlightsRow}>
                {highlights.map(({ icon, text }) => (
                    <View key={icon} style={styles.highlight}>
                        <View style={styles.highlightIcon}>
                            <Ionicons name={icon} size={18} color="white" />
                        </View>
                        <Text style={styles.highlightText}>{text}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionLabel}>CHOOSE YOUR PLAN</Text>

            <SubscriptionPlanCard onPress={() => openPricing('subscription')} />
            <PremiumPlanCard subtitle="Monthly rewards" onPress={() => openPricing('premium')} />
        </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    pageContent: {
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 8,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 6,
    },
    header: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 22,
        paddingHorizontal: 8,
    },
    eyebrow: {
        color: '#9a9a9a',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 2,
        paddingBottom: 8,
    },
    title: {
        fontFamily: 'Edo',
        color: 'gold',
        fontSize: 34,
        textAlign: 'center',
        textShadowColor: 'rgba(255, 215, 0, 0.45)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    titleRule: {
        width: '60%',
        height: 1.5,
        marginTop: 10,
        marginBottom: 14,
    },
    subtitle: {
        color: '#d0d0d0',
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
    },
    highlightsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 26,
    },
    highlight: {
        flex: 1,
        alignItems: 'center',
    },
    highlightIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#151515',
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    highlightText: {
        color: '#9a9a9a',
        fontSize: 11,
        lineHeight: 15,
        textAlign: 'center',
    },
    sectionLabel: {
        color: '#6b6b6b',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1.5,
        paddingBottom: 8,
        paddingLeft: 2,
    },
});
