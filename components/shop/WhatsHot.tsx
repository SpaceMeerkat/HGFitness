import { useAppContext } from "@/components/appContext";
import { ShopStyles, TrackingNotesStyles } from "@/components/HGStyles";
import { S3_API_URL } from "@/components/network/apiConfig";
import { PremiumButton } from "@/components/profile/PremiumButton";
import { GymCard } from "@/components/shop/ShopCard";
import { CardInfo } from "@/components/shop/ShopCardInfo";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PricingModal from "../premium/PricingModal";
import { FreeProgramCard } from "./FreeProgramCard";

type WhatsHotProps = {
    handleBackButton: () => void;
};

// Color palette
const COLORS = {
    gold: '#FFB800',
    cyan: '#00D9FF',
    magenta: '#FF00FF',
    dark: '#111',
    cardBg: '#1a1a1a',
};

export function WhatsHot({ handleBackButton }: WhatsHotProps) {

    const { bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms } = useAppContext();

    const [menCardInfoBeginners, setMenCardInfoBeginners] = useState<any | null>(null);
    const [menCardInfoIntermediate, setMenCardInfoIntermediate] = useState<any | null>(null);
    const [menCardInfoAdvanced, setMenCardInfoAdvanced] = useState<any | null>(null);
    const [womenCardInfoBeginners, setWomenCardInfoBeginners] = useState<any | null>(null);
    const [womenCardInfoIntermediate, setWomenCardInfoIntermediate] = useState<any | null>(null);
    const [womenCardInfoAdvanced, setWomenCardInfoAdvanced] = useState<any | null>(null);

    const [menCardNameBeginners, setMenCardNameBeginners] = useState<string | ''>('');
    const [menCardNameIntermediate, setMenCardNameIntermediate] = useState<string | ''>('');
    const [menCardNameAdvanced, setMenCardNameAdvanced] = useState<string | ''>('');
    const [womenCardNameBeginners, setWomenCardNameBeginners] = useState<string | ''>('');
    const [womenCardNameIntermediate, setWomenCardNameIntermediate] = useState<string | ''>('');
    const [womenCardNameAdvanced, setWomenCardNameAdvanced] = useState<string | ''>('');

    const bestSellersImage = require("@/assets/images/bestSellers.jpg");
    const whatsHotImage = require("@/assets/images/WhatsHot2.jpg");
    const freeTrialImage = require("@/assets/images/WhatsHot4.jpg");
    const challengesImage = require("@/assets/images/challenges.jpg");

    const [isWindowVisible, setisWindowVisible] = useState(false);
    const [content, setContent] = useState<any | null>(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null);
    const [selectedCardName, setSelectedCardName] = useState('');
    const [overlayColor, setOverlayColor] = useState(COLORS.gold);

    const [premiumVisible, setPremiumVisible] = useState(false);
    const [defaultPricing, setDefaultPricing] = useState<string | any>("premium");

    useEffect(() => {
        setMenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.men]);
        setWomenCardInfoBeginners(beginnerPrograms[bestSellers.beginner.women]);
        setMenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.men]);
        setWomenCardInfoIntermediate(intermediatePrograms[bestSellers.intermediate.women]);
        setMenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.men]);
        setWomenCardInfoAdvanced(advancedPrograms[bestSellers.advanced.women]);
        setMenCardNameBeginners(bestSellers.beginner.men);
        setWomenCardNameBeginners(bestSellers.beginner.women);
        setMenCardNameIntermediate(bestSellers.intermediate.men);
        setWomenCardNameIntermediate(bestSellers.intermediate.women);
        setMenCardNameAdvanced(bestSellers.advanced.men);
        setWomenCardNameAdvanced(bestSellers.advanced.women);
    }, [bestSellers, beginnerPrograms, intermediatePrograms, advancedPrograms]);

    // Free Programs overlay content
    const showFreePrograms = async () => {
        setOverlayColor(COLORS.gold);
        setContent(
            <>
                <View style={styles.overlayHeader}>
                    <Text style={[styles.overlayTitle, { color: COLORS.gold }]}>Free Programs</Text>
                    <Text style={styles.overlaySubtitle}>
                        Browse our range of free once-off programs, ready to use and free forever!
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }} style={{ flex: 1 }}>
                    <FreeProgramCard cardTitle="Free program" cardDays="3" cardLevel="beginner" />
                    <FreeProgramCard cardTitle="Free program" cardDays="4" cardLevel="advanced" />
                    <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
                    <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
                    <FreeProgramCard cardTitle="Free program" cardDays="2" cardLevel="intermediate" />
                </ScrollView>
            </>
        );
    };

    // Challenges overlay content
    const showChallenges = async () => {
        setOverlayColor(COLORS.magenta);
        setContent(
            <View style={styles.overlayEmptyState}>
                <View style={[styles.iconBadgeLarge, { backgroundColor: 'rgba(255,0,255,0.15)' }]}>
                    <MaterialCommunityIcons name="fire" size={48} color={COLORS.magenta} />
                </View>
                <Text style={[styles.overlayTitle, { color: COLORS.magenta, marginTop: 20 }]}>Challenges</Text>
                <Text style={styles.overlaySubtitle}>
                    No challenges right now, but soon to come!
                </Text>
            </View>
        );
    };

    // Subscriptions overlay content
    const showSubscriptions = async () => {
        setOverlayColor(COLORS.cyan);
        setContent(
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
                <View style={styles.overlayHeader}>
                    <Text style={[styles.overlayTitle, { color: COLORS.cyan }]}>Premium - Free Trial</Text>
                    <Text style={[styles.overlaySubtitle, { marginTop: 12 }]}>
                        If you want a new and exciting gym program each month, that builds upon the previous program, you're in the right place!
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
                    <PremiumButton />
                </View>
            </ScrollView>
        );
    };

    // Best Sellers overlay content
    const handleCardPress = (programName: any, programDetails: any) => {
        setSelectedCardName(programName);
        setSelectedCardInfo(programDetails);
        setOverlayVisible(true);
    };

    const showBestSellers = () => {
        setOverlayColor(COLORS.gold);

        const menImgUriBeginner = `${S3_API_URL}/${menCardNameBeginners?.replace(/ /g, "+")}.jpg`;
        const menImgUriIntermediate = `${S3_API_URL}/${menCardNameIntermediate?.replace(/ /g, "+")}.jpg`;
        const menImgUriAdvanced = `${S3_API_URL}/${menCardNameAdvanced?.replace(/ /g, "+")}.jpg`;

        const womenImgUriBeginner = `${S3_API_URL}/${womenCardNameBeginners?.replace(/ /g, "+")}.jpg`;
        const womenImgUriIntermediate = `${S3_API_URL}/${womenCardNameIntermediate?.replace(/ /g, "+")}.jpg`;
        const womenImgUriAdvanced = `${S3_API_URL}/${womenCardNameAdvanced?.replace(/ /g, "+")}.jpg`;

        setContent(
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <View style={styles.overlayHeader}>
                    <Text style={[styles.overlayTitle, { color: COLORS.gold, fontSize: 36 }]}>Best Sellers!</Text>
                    <Text style={styles.overlaySubtitle}>As chosen by you...</Text>
                </View>

                <View style={styles.levelSection}>
                    <Text style={[styles.levelLabel, { color: 'cyan' }]}>Beginners</Text>
                    <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'transparent' }]}>
                        <GymCard key={1} cardFullName={menCardNameBeginners} imgUri={menImgUriBeginner} cardInfo={menCardInfoBeginners} onPress={() => handleCardPress(menCardNameBeginners, menCardInfoBeginners)} />
                        <GymCard key={2} cardFullName={womenCardNameBeginners} imgUri={womenImgUriBeginner} cardInfo={womenCardInfoBeginners} onPress={() => handleCardPress(womenCardNameBeginners, womenCardInfoBeginners)} />
                    </View>
                </View>

                <View style={styles.levelSection}>
                    <Text style={[styles.levelLabel, { color: COLORS.gold }]}>Intermediate</Text>
                    <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'transparent' }]}>
                        <GymCard key={1} cardFullName={menCardNameIntermediate} imgUri={menImgUriIntermediate} cardInfo={menCardInfoIntermediate} onPress={() => handleCardPress(menCardNameIntermediate, menCardInfoIntermediate)} />
                        <GymCard key={2} cardFullName={womenCardNameIntermediate} imgUri={womenImgUriIntermediate} cardInfo={womenCardInfoIntermediate} onPress={() => handleCardPress(womenCardNameIntermediate, womenCardInfoIntermediate)} />
                    </View>
                </View>

                <View style={styles.levelSection}>
                    <Text style={[styles.levelLabel, { color: COLORS.magenta }]}>Advanced</Text>
                    <View style={[ShopStyles.cardBlockContainer, { backgroundColor: 'transparent' }]}>
                        <GymCard key={1} cardFullName={menCardNameAdvanced} imgUri={menImgUriAdvanced} cardInfo={menCardInfoAdvanced} onPress={() => handleCardPress(menCardNameAdvanced, menCardInfoAdvanced)} />
                        <GymCard key={2} cardFullName={womenCardNameAdvanced} imgUri={womenImgUriAdvanced} cardInfo={womenCardInfoAdvanced} onPress={() => handleCardPress(womenCardNameAdvanced, womenCardInfoAdvanced)} />
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <PricingModal
                visible={premiumVisible}
                onClose={() => setPremiumVisible(false)}
                defaultType={defaultPricing}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <ImageBackground source={whatsHotImage} style={styles.heroImage} resizeMode="cover">
                        <View style={styles.heroOverlay}>
                            <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                            <View style={styles.heroTextContainer}>
                                <Text style={styles.heroTitle}>What's Hot</Text>
                                <Text style={styles.heroSubtitle}>Discover what's trending</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Feature Cards */}
                <View style={styles.cardsContainer}>

                    {/* Best Sellers Card */}
                    <TouchableOpacity
                        style={styles.featureCard}
                        onPress={() => [showBestSellers(), setisWindowVisible(true)]}
                        activeOpacity={0.7}
                    >
                        <ImageBackground source={bestSellersImage} style={styles.cardBg} resizeMode="contain" imageStyle={{ right: 0, left: 'auto', width: '60%' }}>
                            <View style={styles.cardOverlay}>
                                <View style={[styles.accentBar, { backgroundColor: COLORS.gold }]} />
                                <View style={styles.cardContent}>
                                    <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,184,0,0.2)' }]}>
                                        <Ionicons name="trophy" size={28} color={COLORS.gold} />
                                    </View>
                                    <Text style={styles.cardTitle}>Best Sellers</Text>
                                    <Text style={styles.cardSubtitle}>What people love</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Free Trial Card */}
                    <TouchableOpacity
                        style={styles.featureCard}
                        onPress={() => [showSubscriptions(), setisWindowVisible(true)]}
                        activeOpacity={0.7}
                    >
                        <ImageBackground source={freeTrialImage} style={styles.cardBg} resizeMode="cover">
                            <View style={styles.cardOverlay}>
                                <View style={[styles.accentBar, { backgroundColor: COLORS.cyan }]} />
                                <View style={styles.cardContent}>
                                    <View style={[styles.iconBadge, { backgroundColor: 'rgba(0,217,255,0.2)' }]}>
                                        <Ionicons name="gift" size={28} color={COLORS.cyan} />
                                    </View>
                                    <Text style={styles.cardTitle}>Free Trial</Text>
                                    <Text style={styles.cardSubtitle}>Try premium for one month</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Challenges Card */}
                    <TouchableOpacity
                        style={styles.featureCard}
                        onPress={() => [showChallenges(), setisWindowVisible(true)]}
                        activeOpacity={0.7}
                    >
                        <ImageBackground source={challengesImage} style={styles.cardBg} resizeMode="contain" imageStyle={{ right: 0, left: 'auto', width: '60%' }}>
                            <View style={styles.cardOverlay}>
                                <View style={[styles.accentBar, { backgroundColor: COLORS.magenta }]} />
                                <View style={styles.cardContent}>
                                    <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,0,255,0.2)' }]}>
                                        <MaterialCommunityIcons name="fire" size={28} color={COLORS.magenta} />
                                    </View>
                                    <Text style={styles.cardTitle}>Challenges</Text>
                                    <Text style={styles.cardSubtitle}>Get involved</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                </View>

                {/* Bottom spacing */}
                <View style={{ height: 20 }} />

            </ScrollView>

            {/* Full-screen overlay */}
            {isWindowVisible && (
                <View style={styles.fullOverlay}>
                    <TouchableOpacity
                        style={styles.overlayBackButton}
                        onPress={() => [setisWindowVisible(false), setContent(null)]}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>

                    {content}

                    {overlayVisible && (
                        <View style={styles.cardInfoOverlay}>
                            <TouchableOpacity
                                style={styles.overlayBackButton}
                                onPress={() => setOverlayVisible(false)}
                            >
                                <Ionicons name="arrow-back" size={24} color="white" />
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                            {selectedCardInfo && <CardInfo cardFullName={selectedCardName} cardInfo={selectedCardInfo} />}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dark,
    },

    // Hero Section
    heroContainer: {
        height: 220,
        width: '100%',
    },
    heroImage: {
        flex: 1,
        width: '100%',
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'space-between',
        padding: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 6,
        fontWeight: '500',
    },
    heroTextContainer: {
        marginBottom: 16,
    },
    heroTitle: {
        fontFamily: 'Edo',
        fontSize: 40,
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 4,
    },

    // Feature Cards
    cardsContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    featureCard: {
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
    },
    cardBg: {
        flex: 1,
        width: '100%',
    },
    cardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
    },
    accentBar: {
        width: 5,
    },
    cardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    iconBadge: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontFamily: 'Edo',
        fontSize: 24,
        color: 'white',
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },

    // Full Overlay
    fullOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.dark,
        zIndex: 10,
    },
    overlayBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 20,
    },
    overlayHeader: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    overlayTitle: {
        fontFamily: 'Edo',
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },
    overlaySubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 22,
    },
    overlayContent: {
        flex: 1,
    },
    overlayEmptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconBadgeLarge: {
        width: 100,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelSection: {
        paddingHorizontal: 8,
        paddingTop: 10,
    },
    levelLabel: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    cardInfoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.dark,
        zIndex: 20,
    },
});
