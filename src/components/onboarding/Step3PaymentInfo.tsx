import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  updatePaymentInfo,
  setCurrentStep,
} from '../../store/slices/onboardingSlice';
import './Step3PaymentInfo.css';

const Step3PaymentInfo = () => {
  const paymentInfo = useAppSelector((state) => state.onboarding.paymentInfo);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(paymentInfo);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    handleInputChange('cvv', value);
  };

  const handleNext = () => {
    if (formData.cardNumber && formData.expiryDate && formData.cvv) {
      dispatch(updatePaymentInfo(formData));
      dispatch(setCurrentStep(4));
    }
  };

  const handleBack = () => {
    // Save current form data before going back
    dispatch(updatePaymentInfo(formData));
    dispatch(setCurrentStep(2));
  };

  return (
    <div className="step3-container">
      <h2>Payment Information</h2>
      <p className="step-description">
        Enter your payment details to complete the setup
      </p>

      <div className="form-section">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number *</label>
          <input
            type="text"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              type="text"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV *</label>
            <input
              type="text"
              id="cvv"
              value={formData.cvv}
              onChange={handleCvvChange}
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button type="button" onClick={handleBack} className="back-button">
          Back
        </button>
        <button
          onClick={handleNext}
          className="next-button"
          disabled={!formData.cardNumber || !formData.expiryDate || !formData.cvv}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3PaymentInfo;

