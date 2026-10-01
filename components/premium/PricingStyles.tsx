import { StyleSheet } from "react-native";

export const PricingStyles = StyleSheet.create({
  // Also used by SettingsModal
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },

  // Modal shell
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    padding: 16,
  },
  backdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    maxHeight: '90%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2e2e2e',
    padding: 16,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  headerText: {
    color: '#9a9a9a',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
  },
  closeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Segmented tabs
  tabTrack: {
    flexDirection: 'row',
    backgroundColor: '#0d0d0d',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    padding: 3,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'lime',
  },
  tabText: {
    color: '#8a8a8a',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'lime',
  },

  // Tier content
  content: {
    flexShrink: 1,
  },
  hero: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTitle: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Edo',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 4,
  },
  priceCurrency: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 6,
    paddingRight: 2,
  },
  priceText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 44,
  },
  priceCadence: {
    color: '#b5b5b5',
    fontSize: 14,
    paddingBottom: 7,
    paddingLeft: 6,
  },
  benefitsScroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  benefitsContent: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    color: '#6b6b6b',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    paddingBottom: 6,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#222',
  },
  benefitIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitIconYes: {
    backgroundColor: 'rgba(0, 255, 0, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 0, 0.4)',
  },
  benefitIconNo: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  benefitText: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  benefitTextNo: {
    color: '#6b6b6b',
  },
  purchaseButton: {
    marginTop: 12,
    borderRadius: 999,
    overflow: 'hidden',
  },
  purchaseGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 999,
  },
  purchaseText: {
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
})
