import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';

const SplashScreenLoader = ({ children }) => {
    const [appIsReady, setAppIsReady] = useState(false);

    // Load required fonts
    const [loaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular
    });

    useEffect(() => {
        async function prepare() {
            try {
                // Artificially delay in order to see Splash
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        if (loaded) {
            prepare();
        }
    }, [loaded]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await ExpoSplashScreen.hideAsync()
        }
    }, [appIsReady])

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            {children}
        </View>
    )
}

export default SplashScreenLoader