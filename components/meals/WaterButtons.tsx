import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CYAN = '#4DD0E1';

type HandleWaterClickProps = {
    handleWaterClick: (amount: any) => void;
};

const AddButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.addButtonWrap}>
        <LinearGradient
            colors={['#1a1a1a', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButton}
        >
            <Ionicons name="add-circle-outline" size={18} color="lime" />
            <Text style={styles.addButtonText}>Add</Text>
        </LinearGradient>
    </TouchableOpacity>
);

type WaterAmountCardProps = {
    amount: number;
    label: string;
    handleWaterClick: (amount: any) => void;
};

const WaterAmountCard = ({ amount, label, handleWaterClick }: WaterAmountCardProps) => {
    const fillLevel = Math.min(amount / 1, 1);

    return (
        <View style={styles.cardWrapper}>
            <LinearGradient
                colors={['rgba(77, 208, 225, 0.18)', '#131313', 'rgba(77, 208, 225, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.iconCircle}>
                    <FontAwesome6 name="bottle-water" size={20} color={CYAN} />
                </View>

                <View style={styles.infoColumn}>
                    <Text style={styles.amountText}>{label}<Text style={styles.unitText}> L</Text></Text>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${fillLevel * 100}%` }]} />
                    </View>
                </View>

                <AddButton onPress={() => handleWaterClick(amount)} />
            </LinearGradient>
        </View>
    );
};

export function Water250({ handleWaterClick }: HandleWaterClickProps) {
    return <WaterAmountCard amount={0.25} label="0.25" handleWaterClick={handleWaterClick} />;
}

export function Water500({ handleWaterClick }: HandleWaterClickProps) {
    return <WaterAmountCard amount={0.5} label="0.5" handleWaterClick={handleWaterClick} />;
}

export function Water1000({ handleWaterClick }: HandleWaterClickProps) {
    return <WaterAmountCard amount={1} label="1" handleWaterClick={handleWaterClick} />;
}

export function WaterCustom({ handleWaterClick }: HandleWaterClickProps) {
    const [amount, setAmount] = useState<number | null>(null);

    const handlePress = () => {
        if (amount !== null) {
            handleWaterClick(amount);
        }
    };

    return (
        <View style={styles.cardWrapper}>
            <LinearGradient
                colors={['rgba(77, 208, 225, 0.18)', '#131313', 'rgba(77, 208, 225, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.iconCircle}>
                    <FontAwesome6 name="droplet" size={17} color={CYAN} />
                </View>

                <View style={styles.customInputColumn}>
                    <TextInput
                        keyboardType="number-pad"
                        cursorColor={CYAN}
                        placeholderTextColor="#666"
                        textAlign="center"
                        textAlignVertical="center"
                        style={styles.customInput}
                        placeholder="Custom amount"
                        onChangeText={(text) =>
                            setAmount(text ? parseFloat(text) : null)
                        }
                    />
                    <Text style={styles.customUnit}>L</Text>
                </View>

                <AddButton onPress={handlePress} />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: 5,
        marginVertical: 5,
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        paddingVertical: 12,
        paddingHorizontal: 12,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: CYAN,
        backgroundColor: 'rgba(77, 208, 225, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoColumn: {
        flex: 1,
        marginLeft: 14,
        marginRight: 10,
    },

    amountText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },

    unitText: {
        color: '#999',
        fontSize: 14,
        fontWeight: 'normal',
    },

    progressTrack: {
        marginTop: 8,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#232323',
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: CYAN,
    },

    customInputColumn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 14,
        marginRight: 10,
    },

    customInput: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#1c1c1c',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },

    customUnit: {
        color: '#999',
        fontSize: 15,
        marginLeft: 8,
    },

    addButtonWrap: {
        borderRadius: 100,
        overflow: 'hidden',
    },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'lime',
    },

    addButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 4,
    },
});
