import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ApparelProps = {
    handleBackButton: () => boolean;
};

const ACCENT_COLOR = '#FF3B30';

export function ApparelShop({ handleBackButton }: ApparelProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,59,48,0.15)' }]}>
                    <Ionicons name="shirt" size={48} color={ACCENT_COLOR} />
                </View>
                <Text style={[styles.title, { color: ACCENT_COLOR }]}>Apparel</Text>
                <Text style={styles.subtitle}>
                    Coming soon! Premium fitness apparel to level up your workout style.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 6,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 60,
    },
    iconBadge: {
        width: 100,
        height: 100,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Edo',
        fontSize: 32,
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },
});
