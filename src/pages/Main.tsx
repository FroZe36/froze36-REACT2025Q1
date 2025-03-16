import { selectAllForms } from '../redux/formsSlice';
import { useAppSelector } from '../redux/hooksRedux';
import styles from '../lib/styles/form.module.css';

const { form, form__items } = styles;

const Main = () => {
  const forms = useAppSelector((state) => selectAllForms(state));
  return (
    <section>
      {forms.map(
        (
          { name, age, email, gender, picture, acceptTerms, country, password },
          i
        ) => {
          return (
            <div
              key={i}
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${picture}) no-repeat center / cover`,
                animation: `${i === forms.length - 1 ? 'rainbow-border 3s ease-in-out 1' : null}`,
              }}
              className={form}
            >
              <h2>Form {i + 1}</h2>
              <label className={form__items}>
                Name: <span>{name}</span>
              </label>
              <label className={form__items}>
                Age: <span>{age}</span>
              </label>
              <label className={form__items}>
                Password: <span>{'*'.repeat(password.length)}</span>
              </label>
              <label className={form__items}>
                Email: <span>{email}</span>
              </label>
              <label className={form__items}>
                Gender: <span>{gender}</span>
              </label>
              <label className={form__items}>
                Accept T&C:
                {acceptTerms ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    style={{ width: 25 }}
                  >
                    <path
                      fill="#0e976e"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                ) : null}
              </label>
              <label className={form__items}>
                Country: <span>{country}</span>
              </label>
            </div>
          );
        }
      )}
    </section>
  );
};

export default Main;
