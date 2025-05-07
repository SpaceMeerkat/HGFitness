import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { BASE_API_URL } from "@/components/network/apiConfig";
import { useAppContext } from "@/components/appContext";

type LoginWindowProps = {
    handleChildPage: (loggedIn: boolean, login: boolean, signup: boolean) => void;
  };

export function LoginWindow({ handleChildPage }: LoginWindowProps) {

  const { setProfile, setTrackingData, setMyPrograms, setBestSellers, setMealPrograms, setprofileImagePaths } = useAppContext();

  const [email, setEmail] = useState("");  // Track username
  const [password, setPassword] = useState("");  // Track password

  const handleSubmit = async () => {
    // const retrievedToken = await SecureStore.getItemAsync('jwtToken');
    const loginData = {
      // token: retrievedToken,
      email: email,
      password: password,
    };
    // Send this loginData in a fetch request to the backend
    sendLoginRequest(loginData);
  };

  const [submitting, setSubmitting] = useState(false);

  const sendLoginRequest = async (loginData: { email: string; password: string }) => {
    try {
      setSubmitting(true)
      const response = await fetch(`${BASE_API_URL}/accountsLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();

        // Store the JWT (using AsyncStorage or any state management you prefer)
        await SecureStore.setItemAsync('jwtToken', jsonResponse.token);
        setProfile(jsonResponse.profile);
        setMyPrograms(jsonResponse.myPrograms);
        setTrackingData(jsonResponse.trackingData);
        setBestSellers(jsonResponse.bestSellers);
        setMealPrograms(jsonResponse.mealPrograms);
        setprofileImagePaths(jsonResponse.profileImagePaths);
        setSubmitting(false);
        handleChildPage(true, false, false);
      } else {
        setSubmitting(false)
        console.error("Login failed with status:", response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  };

    return (
      <View style={{flex: 1, justifyContent: "center", paddingHorizontal: 16}}>
        <View style={{flex:0.85, backgroundColor: "black", 
          justifyContent: "center", 
          alignContent: "center", 
          alignItems: "center",
          borderColor: "cyan",
          borderWidth: 2,
          borderRadius: 50 }}>
            {/* Log in title block */}
            <View style={{flex: 0.1, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignContent: "center"}}>
              <Text style={{fontFamily: 'Edo', color: "white", fontSize: 25}}>Welcome to HG fitness</Text>
            </View>
            {/* slogan */}
            <View style={{flex: 0.1, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignContent: "center"}}>
              <Text style={{ color: "white", fontSize: 15}}>Get back to business and log in!</Text>
            </View>
            {/* Username block */}
            <View style={{flex: 0.15, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                <Text style={{color: "white", fontSize: 16}}>Email</Text>
              </View>
              <View style={{flex: 0.75, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.8, 
                  flexDirection: "column", 
                  backgroundColor: "black", 
                  justifyContent: "center", 
                  alignItems: "center",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 4,
                  }}>
                  <TextInput
                              cursorColor={'white'}
                              textAlign={'center'}
                              style={{ fontSize: 20, flex: 1, color: "white"}}
                              placeholder="JohnDoe@gmail.com"
                              value={email}
                              onChangeText={setEmail}
                              placeholderTextColor="grey"
                            />
                </View>
                <View style={{flex: 0.1}} />
              </View>
            </View>
            {/* Password block */}
            <View style={{flex: 0.15, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                <Text style={{color: "white", fontSize: 16}}>Password</Text>
              </View>
              <View style={{flex: 0.75, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.1}} />
                <View style={{flex: 0.8, 
                  flexDirection: "column", 
                  backgroundColor: "black", 
                  justifyContent: "center", 
                  alignItems: "center",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 4,
                  }}>
                  <TextInput
                              cursorColor={'white'}
                              textAlign={'center'}
                              style={{ fontSize: 20, flex: 1, color: "white"}}
                              placeholder="******"
                              value={password}
                              onChangeText={setPassword}
                              secureTextEntry={true}
                              placeholderTextColor="grey"
                            />
                </View>
                <View style={{flex: 0.1}} />
              </View>
            </View>

            {/* Submit button block */}
            <View style={{flex: 0.05, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 0}}>
              <View style={{flex: 1, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.35}} />
                <View style={{flex: 0.3, backgroundColor:"black", borderWidth:2, borderRadius:4, borderColor:"green", justifyContent: "center", alignItems: "center"}}>
                  <Pressable onPress={handleSubmit}>
                    <Text style={{color: "lime", fontSize: 16}}>
                        Submit
                    </Text>
                  </Pressable>
                </View>
                <View style={{flex: 0.35}} />
              </View>
            </View>
            
            {/* Make new account text block */}
            <View style={{flex: 0.1, flexDirection: "row", backgroundColor: "black", justifyContent: "center", alignItems: "flex-end"}}>
              <Text style={{color: "white", fontSize: 16}}>
                Don't have an account?
              </Text>
            </View>
            <Pressable onPress={() => handleChildPage(false, false, true)}>
            <View style={{flex: 0.02, flexDirection: "row", backgroundColor: "black", justifyContent: "center", alignItems: "flex-start"}}>
              <Text style={{color: "cyan", fontSize: 16}}>
                Sign up
              </Text>
            </View>
            </Pressable>
          </View>
      </View>
    );
}  
