import { View, Text, TextInput, Pressable  } from "react-native";
import { useState } from "react";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from "@/components/network/apiConfig";

type SignupWindowProps = {
    handleChildPage: (loggedIn: boolean, login: boolean, signup: boolean) => void;
  };

export function SignupWindow({ handleChildPage }: SignupWindowProps) {

  const [username, setUsername] = useState("");  // Track username
  const [password, setPassword] = useState("");  // Track password
  const [email, setEmail] = useState("");  // Track email

  const handleSubmit = () => {
    const SignupData = {
      username: username,
      password: password,
      email: email,
    };
    // Send this loginData in a fetch request to the backend
    sendSignupRequest(SignupData);
  };

  const [submitting, setSubmitting] = useState(false);

  const sendSignupRequest = async (SignupData: { username: string; password: string; email: string }) => {
    try {
      setSubmitting(true)
      const response = await fetch(`${BASE_API_URL}/accountsSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignupData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;  // Assuming the JWT is returned as 'token' in the response body     
        // Store the JWT (using AsyncStorage or any state management you prefer)
        await SecureStore.setItemAsync('jwtToken', token);
        setSubmitting(false)
        handleChildPage(false, true, false); // Moves the user to the login page having successfully signed up
      } else {
        setSubmitting(false)
        console.error("Signup failed with status:", response.status);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  };

  return (
      <View style={{flex: 1, justifyContent: "center", paddingHorizontal: 16, paddingVertical: 20}}>
        <View style={{flex:0.85, backgroundColor: "black", 
          justifyContent: "center", 
          alignContent: "center", 
          alignItems: "center",
          borderColor: "cyan",
          borderWidth: 2,
          borderRadius: 30,
          paddingVertical: 16 ,
          paddingHorizontal: 16 }}>
            {/* Page back block */}
            <View style={{flex: 0.2, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 0, paddingVertical: 4}}>
                <View style={{flex: 1, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                    <Pressable onPress={() => handleChildPage(false, true, false)} style={{ flex: 0.2, flexDirection: "row", padding: 0, margin: 0 }}>
                        <View style={{flexDirection: "row", backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
                            <TabBarIcon name={'arrow-back'} color="cyan" size={20} />
                            <Text style={{color: "cyan", fontSize: 18}}> Back</Text>
                        </View>
                    </Pressable>
                    <View style={{flex: 0.8}} />
                </View>
            </View>
            <View style={{flex: 0.3, flexDirection: "row", paddingBottom: 10}}>
              <View style={{flex: 0.5, flexDirection: "column", backgroundColor: "black", justifyContent: "center"}}>
                <Text style={{color: "white", fontSize: 20, textAlign: 'right', textAlignVertical: 'top'}}>Welcome to  </Text>
              </View>
              <View style={{flex: 0.5, flexDirection: "column", backgroundColor: "black", justifyContent: "center"}}>
                <Text style={{fontFamily: 'Edo', color: "white", fontSize: 28, textAlign: 'left'}}>HG Fitness</Text>
              </View>
            </View>
            <View style={{flex: 0.02, backgroundColor: 'grey', width: '100%', minHeight:1, maxHeight:1, marginBottom: 30}}/>
            <View style={{flex: 0.1, flexDirection: "column", backgroundColor: "black", 
              justifyContent: "flex-end", alignContent: "flex-end", padding: 0}}>
              <Text style={{ color: "white", fontSize: 14}}>Before you can start tracking and training</Text>
            </View>
            {/* Sign up title block */}
            <View style={{flex: 0.3, flexDirection: "column", backgroundColor: "black", justifyContent: "flex-start", 
              alignContent: "center", padding: 0}}>
              <View style={{flex:0.5, flexDirection: 'column', backgroundColor: 'black'}}>
                <Text style={{color: "white", fontSize: 12, textAlign: 'center', paddingBottom: 20}}>please...</Text>
                <Text style={{color: "white", fontSize: 32}}>Sign up</Text>
              </View>
            </View>
            {/* Email block */}
            <View style={{flex: 0.01, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                <Text style={{color: "white", fontSize: 16}}>Email</Text>
              </View>
              <View style={{flex: 0.75, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.05}} />
                <View style={{flex: 0.9, 
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
                              style={{ fontSize: 16, flex: 1, color: "white"}}
                              placeholder="HooligainsUser@gmail.com"
                              value={email}
                              onChangeText={setEmail}
                              placeholderTextColor="grey"
                            />
                </View>
                <View style={{flex: 0.05}} />
              </View>
            </View>
            {/* Username block */}
            <View style={{flex: 0.01, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                <Text style={{color: "white", fontSize: 16}}>Username</Text>
              </View>
              <View style={{flex: 0.75, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.05}} />
                <View style={{flex: 0.9, 
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
                              style={{ fontSize: 16, flex: 1, color: "white"}}
                              placeholder="Hooligains User"
                              value={username}
                              onChangeText={setUsername}
                              placeholderTextColor="grey"
                            />
                </View>
                <View style={{flex: 0.05}} />
              </View>
            </View>
            {/* Password block */}
            <View style={{flex: 0.05, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
                <Text style={{color: "white", fontSize: 16}}>Password</Text>
              </View>
              <View style={{flex: 0.75, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.05}} />
                <View style={{flex: 0.9, 
                  flexDirection: "column", 
                  backgroundColor: "black", 
                  justifyContent: "center", 
                  alignItems: "center",
                  borderColor: "grey",
                  borderWidth: 2,
                  borderRadius: 4,
                  }}>
                  <TextInput
                              cursorColor={'black'}
                              textAlign={'center'}
                              style={{ fontSize: 16, flex: 1, color: "white"}}
                              placeholder="******"
                              value={password}
                              onChangeText={setPassword}
                              secureTextEntry={true}
                              placeholderTextColor="grey"
                            />
                </View>
                <View style={{flex: 0.05}} />
              </View>
            </View>
            {/* Next button block */}
            <View style={{flex: 0.3, flexDirection: "column", backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 4}}>
              <View style={{flex: 1, flexDirection: "row", backgroundColor: "black", alignItems: "center", paddingVertical: 4}}>
                <View style={{flex: 0.35}} />
                <View style={{flex: 0.3, backgroundColor:"black", borderWidth:2, borderRadius:4, borderColor:"green", justifyContent: "center", alignItems: "center"}}>
                  <Pressable onPress={handleSubmit}>
                    <Text style={{color: "green", fontSize: 16}}>
                        Submit
                    </Text>
                  </Pressable>
                </View>
                <View style={{flex: 0.35}} />
              </View>
            </View>
          </View>
      </View>
  );
}
