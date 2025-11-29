import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const username = useAppSelector((state) => state.auth.username);
  const personalProfile = useAppSelector(
    (state) => state.onboarding.personalProfile
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome, {personalProfile.name || username}!</h1>
        <div className="welcome-message">
          <p>🎉 Congratulations! You have successfully completed the onboarding process.</p>
          <p>Your account is now set up and ready to use.</p>
        </div>
        {personalProfile.profilePicture && (
          <div className="profile-picture-container">
            <img
              src={personalProfile.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          </div>
        )}
        <div className="user-info">
          <h2>Your Information</h2>
          <div className="info-item">
            <strong>Name:</strong> {personalProfile.name}
          </div>
          <div className="info-item">
            <strong>Age:</strong> {personalProfile.age}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {personalProfile.email}
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

