import { Formik, Form, FieldArray, Field } from 'formik';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  updateFavoriteSongs,
  setCurrentStep,
} from '../../store/slices/onboardingSlice';
import './Step2FavoriteSongs.css';

interface SongFormValues {
  songs: string[];
}

const Step2FavoriteSongs = () => {
  const favoriteSongs = useAppSelector(
    (state) => state.onboarding.favoriteSongs
  );
  const dispatch = useAppDispatch();

  const initialValues: SongFormValues = {
    songs: favoriteSongs.length > 0 ? favoriteSongs : [''],
  };

  const handleSubmit = (values: SongFormValues) => {
    const filteredSongs = values.songs.filter((song) => song.trim() !== '');
    dispatch(updateFavoriteSongs(filteredSongs));
    dispatch(setCurrentStep(3));
  };

  const handleBack = (currentSongs: string[]) => {
    const filteredSongs = currentSongs.filter((song) => song.trim() !== '');
    dispatch(updateFavoriteSongs(filteredSongs));
    dispatch(setCurrentStep(1));
  };

  return (
    <div className="step2-container">
      <h2>Favorite Songs</h2>
      <p className="step-description">
        Tell us about your favorite songs (you can add as many as you like)
      </p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="songs-form">
            <FieldArray name="songs">
              {({ push, remove }) => (
                <div className="songs-list">
                  {values.songs.map((_, index) => (
                    <div key={index} className="song-item">
                      <Field
                        name={`songs.${index}`}
                        placeholder={`Song ${index + 1}`}
                        className="song-input"
                      />
                      {values.songs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="remove-button"
                          aria-label="Remove song"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="add-song-button"
                  >
                    + Add Another Song
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="step-actions">
              <button
                type="button"
                onClick={() => handleBack(values.songs)}
                className="back-button"
              >
                Back
              </button>
              <button type="submit" className="next-button">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2FavoriteSongs;

