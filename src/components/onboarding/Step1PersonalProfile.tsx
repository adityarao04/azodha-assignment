import { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  updatePersonalProfile,
  setCurrentStep,
} from '../../store/slices/onboardingSlice';
import './Step1PersonalProfile.css';

const Step1PersonalProfile = () => {
  const personalProfile = useAppSelector(
    (state) => state.onboarding.personalProfile
  );
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    personalProfile.profilePicture
  );

  const handleInputChange = (field: string, value: string) => {
    dispatch(updatePersonalProfile({ [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        dispatch(updatePersonalProfile({ profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (personalProfile.name && personalProfile.age && personalProfile.email) {
      dispatch(setCurrentStep(2));
    }
  };

  return (
    <div className="step1-container">
      <h2>Personal Profile</h2>
      <p className="step-description">
        Let's start by getting to know you better
      </p>

      <div className="form-section">
        <div className="profile-picture-section">
          <div className="profile-picture-preview">
            {preview ? (
              <img src={preview} alt="Profile preview" />
            ) : (
              <div className="profile-placeholder">
                <span>📷</span>
                <p>No image selected</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="upload-button"
          >
            {preview ? 'Change Picture' : 'Upload Picture'}
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={personalProfile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            value={personalProfile.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Enter your age"
            min="1"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={personalProfile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="step-actions">
        <button onClick={handleNext} className="next-button" disabled={!personalProfile.name || !personalProfile.age || !personalProfile.email}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1PersonalProfile;

