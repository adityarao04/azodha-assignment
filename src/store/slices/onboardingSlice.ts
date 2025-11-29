import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PersonalProfile {
  name: string;
  age: string;
  email: string;
  profilePicture: string | null;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface OnboardingState {
  currentStep: number;
  personalProfile: PersonalProfile;
  favoriteSongs: string[];
  paymentInfo: PaymentInfo;
  isCompleted: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  personalProfile: {
    name: '',
    age: '',
    email: '',
    profilePicture: null,
  },
  favoriteSongs: [],
  paymentInfo: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  isCompleted: false,
};

// Load from localStorage on initialization
const loadOnboardingState = (): OnboardingState => {
  const stored = localStorage.getItem('onboardingState');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialState;
    }
  }
  return initialState;
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: loadOnboardingState(),
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      localStorage.setItem('onboardingState', JSON.stringify(state));
    },
    updatePersonalProfile: (state, action: PayloadAction<Partial<PersonalProfile>>) => {
      state.personalProfile = { ...state.personalProfile, ...action.payload };
      localStorage.setItem('onboardingState', JSON.stringify(state));
    },
    updateFavoriteSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload;
      localStorage.setItem('onboardingState', JSON.stringify(state));
    },
    updatePaymentInfo: (state, action: PayloadAction<Partial<PaymentInfo>>) => {
      state.paymentInfo = { ...state.paymentInfo, ...action.payload };
      localStorage.setItem('onboardingState', JSON.stringify(state));
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      localStorage.setItem('onboardingState', JSON.stringify(state));
    },
    resetOnboarding: (state) => {
      state.currentStep = 1;
      state.personalProfile = initialState.personalProfile;
      state.favoriteSongs = [];
      state.paymentInfo = initialState.paymentInfo;
      state.isCompleted = false;
      localStorage.removeItem('onboardingState');
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalProfile,
  updateFavoriteSongs,
  updatePaymentInfo,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;

