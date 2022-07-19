import { StatusBar } from 'expo-status-bar';
import * as ExpoSplashScreen from 'expo-splash-screen';
import SplashScreenLoader from './src/components/SplashScreen';
import Home from './src/screens/HomeScreen';

ExpoSplashScreen.preventAutoHideAsync().catch(() => { })

export default function App() {
  return (
    <SplashScreenLoader>
      <StatusBar style='auto' />
      <Home />
    </SplashScreenLoader>
  );
}