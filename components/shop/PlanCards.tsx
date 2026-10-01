import { CardSheen, GOLD_RING, shineStyles, SilverBadge } from "@/components/CardShine";
import { ShopStyles } from "@/components/HGStyles";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

type PlanCardProps = {
    cardImage: any;
    badge: React.ReactNode;
    title: string;
    subtitle: string;
    onPress: () => void;
};

// Shiny plan card, matching the subscription cards in MyPrograms (SubscriptionProgramCard)
export function PlanCard({ cardImage, badge, title, subtitle, onPress }: PlanCardProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.cardPressable, pressed && { opacity: 0.85 }]}>
            <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, styles.card]}>
                <CardSheen />
                <View style={styles.cardBadge}>
                    {badge}
                </View>
                <View style={styles.cardText}>
                    <Text style={[shineStyles.glowTitle, styles.cardTitle]} numberOfLines={1} adjustsFontSizeToFit>{title}</Text>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                </View>
                <View style={styles.cardLogo}>
                    <Image source={require("@/assets/images/WhiteTransparentLogo.png")} style={styles.cardLogoImage} />
                </View>
            </ImageBackground>
        </Pressable>
    );
}

type PremiumPlanCardProps = {
    subtitle: string;
    onPress: () => void;
};

export function PremiumPlanCard({ subtitle, onPress }: PremiumPlanCardProps) {
    return (
        <PlanCard
            cardImage={require('@/assets/images/premiumCard.jpg')}
            badge={
                <SilverBadge ringColors={GOLD_RING}>
                    <Ionicons name="star" size={22} color="#FFD700" style={styles.goldStar} />
                </SilverBadge>
            }
            title="Premium"
            subtitle={subtitle}
            onPress={onPress}
        />
    );
}

export function SubscriptionPlanCard({ onPress }: { onPress: () => void }) {
    return (
        <PlanCard
            cardImage={require('@/assets/images/SubscriptionCard4day.jpg')}
            badge={
                <View style={styles.badgePair}>
                    <SilverBadge size={42}>
                        <Text style={[shineStyles.badgeNumber, styles.badgePairNumber]}>2</Text>
                    </SilverBadge>
                    <View style={styles.badgePairOverlap}>
                        <SilverBadge size={42}>
                            <Text style={[shineStyles.badgeNumber, styles.badgePairNumber]}>4</Text>
                        </SilverBadge>
                    </View>
                </View>
            }
            title="Subscription"
            subtitle="2 or 4 days a week"
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    cardPressable: {
        width: '100%',
    },
    card: {
        height: 80,
        paddingTop: 0,
        overflow: 'hidden',
        borderColor: 'grey',
        backgroundColor: 'transparent',
        marginBottom: 12,
    },
    // Fixed width so the overlapping 2/4 badge pair fits and every card's text lines up
    cardBadge: {
        width: 76,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        flex: 1,
        paddingLeft: 12,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 24,
    },
    cardSubtitle: {
        color: '#c8c8c8',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        paddingTop: 2,
    },
    cardLogo: {
        flex: 0.3,
        height: '60%',
        paddingRight: 10,
    },
    cardLogoImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    badgePair: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgePairOverlap: {
        marginLeft: -12,
    },
    badgePairNumber: {
        fontSize: 30,
    },
    goldStar: {
        textShadowColor: 'rgba(255, 215, 0, 0.7)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
});
