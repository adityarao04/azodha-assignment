import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setCurrentStep } from '../store/slices/onboardingSlice';
import Step1PersonalProfile from '../components/onboarding/Step1PersonalProfile';
import Step2FavoriteSongs from '../components/onboarding/Step2FavoriteSongs';
import Step3PaymentInfo from '../components/onboarding/Step3PaymentInfo';
import Step4Success from '../components/onboarding/Step4Success';
import './Onboarding.css';

const Onboarding = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Ensure we're on the correct step from localStorage
    const stored = localStorage.getItem('onboardingState');
    if (stored) {
      try {
        const state = JSON.parse(stored);
        if (state.currentStep) {
          dispatch(setCurrentStep(state.currentStep));
        }
      } catch (error) {
        console.error('Error loading onboarding state:', error);
      }
    }
  }, [dispatch]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalProfile />;
      case 2:
        return <Step2FavoriteSongs />;
      case 3:
        return <Step3PaymentInfo />;
      case 4:
        return <Step4Success />;
      default:
        return <Step1PersonalProfile />;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className="progress-steps">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`progress-step ${
                  step <= currentStep ? 'active' : ''
                } ${step === currentStep ? 'current' : ''}`}
              >
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Profile'}
                  {step === 2 && 'Songs'}
                  {step === 3 && 'Payment'}
                  {step === 4 && 'Success'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="step-content">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Onboarding;

