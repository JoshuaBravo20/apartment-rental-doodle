import { useState } from 'react';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { ListingScreen } from './components/screens/ListingScreen';
import { Toaster } from '@/components/ui/toaster';

type Screen = 'auth' | 'onboarding' | 'listing';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {currentScreen === 'auth' && (
        <AuthScreen onComplete={() => handleScreenChange('onboarding')} />
      )}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={() => handleScreenChange('listing')} />
      )}
      {currentScreen === 'listing' && <ListingScreen />}
      <Toaster />
    </div>
  );
}

export default App;