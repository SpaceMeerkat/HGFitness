import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Shared "shiny" card treatment used by the subscription cards in MyPrograms and the shop.

// Glossy sheen across a card and a highlight along its top edge. Place inside a container
// with overflow: 'hidden' and a borderRadius so the overlays are clipped to the card.
export function CardSheen() {
    return (
        <>
            <LinearGradient
                pointerEvents="none"
                colors={['rgba(255, 255, 255, 0.10)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.06)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />
            <LinearGradient
                pointerEvents="none"
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.65)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={shineStyles.topHighlight}
            />
        </>
    );
}

type GradientColors = readonly [string, string, ...string[]];

export const SILVER_RING: GradientColors = ['#f5f5f5', '#6e6e6e', '#d9d9d9', '#4a4a4a'];
export const GOLD_RING: GradientColors = ['#fff3b0', '#b8860b', '#ffd700', '#7a5a00'];

type SilverBadgeProps = {
    size?: number;
    ringColors?: GradientColors;
    children: React.ReactNode;
};

// Circular badge: metallic ring (silver by default), dark bevelled face, gloss on the top half
export function SilverBadge({ size = 50, ringColors = SILVER_RING, children }: SilverBadgeProps) {
    const ringWidth = 2;
    return (
        <LinearGradient
            colors={ringColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: size, height: size, borderRadius: size / 2, padding: ringWidth }}
        >
            <LinearGradient
                colors={['#3c3c3c', '#0b0b0b', '#1f1f1f']}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.8, y: 1 }}
                style={[shineStyles.badgeFace, { borderRadius: size / 2 - ringWidth }]}
            >
                <LinearGradient
                    pointerEvents="none"
                    colors={['rgba(255, 255, 255, 0.28)', 'rgba(255, 255, 255, 0)']}
                    style={shineStyles.badgeGloss}
                />
                <View>{children}</View>
            </LinearGradient>
        </LinearGradient>
    );
}

export const shineStyles = StyleSheet.create({
    topHighlight: {
        position: 'absolute',
        top: 1,
        left: 0,
        right: 0,
        height: 1,
    },
    badgeFace: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeGloss: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    // Edo digit for inside a SilverBadge
    badgeNumber: {
        fontFamily: 'Edo',
        color: 'white',
        fontSize: 36,
        includeFontPadding: false,
        // Edo's glyphs sit slightly below the centre of their line box
        marginTop: -2,
        textShadowColor: 'rgba(255, 255, 255, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    // Edo card title with a soft glow
    glowTitle: {
        fontFamily: 'Edo',
        color: 'white',
        textShadowColor: 'rgba(255, 255, 255, 0.35)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
});
