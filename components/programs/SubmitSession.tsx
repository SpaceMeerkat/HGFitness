import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from "../network/apiConfig";

export const SubmitSession = async (
    programID: string, 
    programDay:any, 
    token: any, 
    trackingDictionary: any, 
    trackingData: any, 
    setTrackingData: (data: any) => void,
    setSaving: (saving: boolean) => void
) => { 
    setSaving(true);
    let updatedTrackingData = { ...trackingData };
    
    // Submit to the asyncStorage
    // Submit to the backend as a POST request
    try {
        const url = `${BASE_API_URL}/saveProgramTracking`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                programID: programID,
                week: programDay[0],
                day: programDay[1],
                trackingData: trackingDictionary,
                token: token
            }),
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          const completedStatus = jsonResponse.completed;
          const streakDates = jsonResponse.streakDates;
          updatedTrackingData[programID] = { ...updatedTrackingData[programID] };
            updatedTrackingData[programID]['memoryData'] = { 
            ...updatedTrackingData[programID]['memoryData'], 
            [`week-${programDay[0]}-day-${programDay[1]}`]: {
                trackingData: trackingDictionary
            }
            };
          // Update the completed status
          updatedTrackingData[programID]['completed'] = completedStatus;
          // Update streakDates if subscription triggered a date appending
          updatedTrackingData[programID]['streakDates'] = streakDates;
          await AsyncStorage.setItem('trackingData', JSON.stringify(updatedTrackingData));
          setTrackingData(updatedTrackingData);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error pushing data:', error);
        return null; 
    } finally {
        setSaving(false);
    }
};