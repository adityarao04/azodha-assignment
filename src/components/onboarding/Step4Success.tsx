import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { completeOnboarding } from '../../store/slices/onboardingSlice';
import './Step4Success.css';

const Step4Success = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Mark onboarding as completed
    dispatch(completeOnboarding());
    
    // Redirect to home after 2 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="step4-container">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h2>Congratulations!</h2>
        <p className="success-message">
          You have successfully completed the onboarding process.
        </p>
        <p className="redirect-message">
          Redirecting to your home page...
        </p>
      </div>
    </div>
  );
};

export default Step4Success;

