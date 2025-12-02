import React from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAppContext } from "../appContext";
import { DefaultTabStyles, ShopStyles } from "../HGStyles";
import { SubscriptionPayment } from "../premium/PremiumPayment";
    
    type SubscriptionOptionsModalProps = {
      visible: boolean;
      onClose: () => void;
    };
    
    export default function SubscriptionOptionsModal({
      visible,
      onClose,
    }: SubscriptionOptionsModalProps) {

    const cardImage= require('@/assets/images/SubscriptionCard4day.jpg');
    const images: Record<string, any> = {
        "4": require("@/assets/images/4Days.png"),
        "2": require("@/assets/images/2Days.png"),
    };
    const imageSource = require("@/assets/images/WhiteTransparentLogo.png");
    const { profile, setProfile } = useAppContext();
    const itemCategory = "gymSubscription";
    const shortCardTitle = "Days a week";
    const image = require("@/assets/images/HGBackground.png");   

      return (
        <Modal transparent animationType="fade" visible={visible}>
          <KeyboardAvoidingView
            style={styles.center}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.card}>  
            <ImageBackground source={image} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%' }}>   
            <View style={{flex: 0.8, width: '100%', paddingHorizontal: 8}}>
                <View style={{flex: 0.2, width: '100%', paddingVertical: 10}}>
                    <Text style={{fontFamily: 'Edo', color: 'white', fontSize: 28, textAlign: 'center'}}>
                        Monthly Gym Plan
                    </Text>
                </View>
                <View style={{flex: 0.4, width: '100%', paddingHorizontal: 10, paddingBottom: 0}}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                        If you want a new and exciting gym program every month, that builds upon the previous program, you're in the right place!
                    </Text>
                </View>
                <View style={{flex: 0.3, width: '100%', paddingHorizontal: 10, paddingBottom: 0}}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                        Gain access to both 2 and 4 day gym plans!
                    </Text>
                </View>
                <View style={{flex: 0.3, width: '100%', paddingHorizontal: 10, paddingBottom: 0}}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                        And the best part... your first month is <Text style={{fontFamily: 'Edo', fontSize: 20}}>completely free!</Text>
                    </Text>
                </View>
            </View>
            <Pressable onPress={profile.premium? () => {} : async () =>  await SubscriptionPayment({itemCategory, profile, setProfile})} style={{flex: 0.2, width: '100%', paddingHorizontal: 8}}>
                <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, {overflow: 'hidden', maxHeight: 70}]}>
                    <View style={{ flex: 0.25 }}>
                        <Image source={images["2"]} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                    <View style={{ flex: 0.8, paddingLeft: 8 }}>
                        <Text style={[DefaultTabStyles.defaultBoldText, { color: 'white' }]}>{shortCardTitle}</Text>
                    </View>
                    <View style={{ flex: 0.3, paddingRight: 10 }}>
                        <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                </ImageBackground>
                <ImageBackground source={cardImage} resizeMode="cover" style={[ShopStyles.myProgramsBlockContainer, {overflow: 'hidden', maxHeight: 70}]}>
                    <View style={{ flex: 0.25 }}>
                        <Image source={images["4"]} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                    <View style={{ flex: 0.75, paddingLeft: 8 }}>
                        <Text style={[DefaultTabStyles.defaultBoldText, { color: 'white' }]}>{shortCardTitle}</Text>
                    </View>
                    <View style={{ flex: 0.3, paddingRight: 10 }}>
                        <Image source={imageSource} style={{ flex: 1, width: "100%", resizeMode: "contain" }} />
                    </View>
                </ImageBackground>
            </Pressable>
            
            <View style={{flex: 0.2}} />
    
              {/* Close button below */}
              <View style={[styles.closeRow, {justifyContent: 'flex-end'}]}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.btn, styles.closeBtn]}
                >
                  <Text style={[styles.btnText, {color: "white"}]}>Close</Text>
                </TouchableOpacity>
              </View>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
    }
    
    const styles = StyleSheet.create({
      center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      card: {
        width: "94%",
        height: "90%",
        padding: 0,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "grey",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        overflow: 'hidden'
      },
      title: {
        flex: 0.4,
        fontFamily: "Edo",
        fontSize: 32,
        paddingTop: 36,
        paddingBottom: 12,
        fontWeight: "600",
        textAlign: "center",
        color: "white",
      },
      explanationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      explanationBox: {
        flex: 0.5,
        marginHorizontal: 6,
      },
      explanationTitle: {
        color: "cyan",
        fontSize: 16,
        fontWeight: "600",
        paddingBottom: 4,
        textAlign: "center",
      },
      explanationText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
      },
      buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      flexBtn: {
        flex: 1,
        marginHorizontal: 6,
        backgroundColor: "#ffffffff",
      },
      closeRow: {
        alignItems: "center",
        paddingTop: 34,
      },
      btn: {
        paddingVertical: 14,
        borderRadius: 8,
      },
      btnText: {
        color: "#000000ff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
      },
      closeBtn: { width: "50%" },
    });
    