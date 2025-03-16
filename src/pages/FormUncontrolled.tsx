import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../lib/styles/form.module.css';
import { formSchema } from '../lib/form.validators';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooksRedux';
import { selectCountries } from '../redux/countrySlice';
import { fetchCountries } from '../redux/countrySlice';
import { addForm } from '../redux/formsSlice';
import { toBase64 } from '../lib/base64';
import { ModifiedFormSchemaAge } from '../lib/types';
import { getStrength } from '../lib/getStrength';

const { form, form__items, error, form__block, form__block_password } = styles;

const FormUncontrolled = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const strength = getStrength(e.target.value);
    setPasswordStrength(strength);
  };
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => selectCountries(state));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const handlerForm = async (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        ...Object.fromEntries(formData.entries()),
        age: formData.get('age') === '' ? '' : Number(formData.get('age')),
        acceptTerms: Boolean(formData.get('acceptTerms')),
      } as ModifiedFormSchemaAge;
      try {
        formSchema.parse(data);
        setErrors({});
        dispatch(
          addForm({ ...data, picture: await toBase64(data.picture as File) })
        );
        navigate('/');
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(error);
          const errorMessages: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path && !errorMessages[err.path[0]]) {
              errorMessages[err.path[0]] = err.message;
            }
          });
          setErrors(errorMessages);
        }
      }
    }
  };
  return (
    <form className={form} onSubmit={handlerForm} ref={formRef}>
      <h2>Form Uncontrolled</h2>
      <div className={form__block}>
        <label className={form__items}>
          Name: <input type="text" id="name" name="name" />
        </label>
        {errors.name && <span className={error}>{errors.name}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Age: <input type="number" id="age" name="age" />
        </label>
        {errors.age && <span className={error}>{errors.age}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Email: <input type="email" id="email" name="email" />
        </label>
        {errors.email && <span className={error}>{errors.email}</span>}
      </div>
      <div className={`${form__block} ${form__block_password}`}>
        <label className={form__items}>
          Password:
          <input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </label>
        <div className="progressBar">
          <div
            className="progressBar__fill"
            style={{ width: `${(passwordStrength / 4) * 100}%` }}
            data-strength={passwordStrength}
          ></div>
        </div>
        {errors.password && <span className={error}>{errors.password}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Confirm Password:
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </label>
        {errors.confirmPassword && (
          <span className={error}>{errors.confirmPassword}</span>
        )}
      </div>
      <div className={form__block}>
        <div className={form__items}>
          <label>Choose Gender: </label>
          <div className={form__items}>
            <div className={form__items}>
              <input type="radio" name="gender" id="male" defaultValue="Male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className={form__items}>
              <input
                type="radio"
                name="gender"
                id="female"
                defaultValue="Female"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        {errors.gender && <span className={error}>{errors.gender}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Upload Picture:
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/jpeg, image/png"
          />
        </label>
        {errors.picture && <span className={error}>{errors.picture}</span>}
      </div>
      <div className={form__block}>
        <div className={form__items}>
          <input type="checkbox" id="acceptTerms" name="acceptTerms" />
          <label htmlFor="acceptTerms">
            Accept Terms and Conditions agreement
          </label>
        </div>
        {errors.acceptTerms && (
          <span className={error}>{errors.acceptTerms}</span>
        )}
      </div>
      <div className={form__block}>
        <label htmlFor="country" className={form__items}>
          Country:
          <input type="text" id="country" name="country" list="countries" />
        </label>
        <datalist id="countries">
          {countries.map((country) => {
            return <option key={country} value={country} />;
          })}
        </datalist>
        {errors.country && <span className={error}>{errors.country}</span>}
      </div>
      <button type="submit" formNoValidate>
        Submit Form
      </button>
    </form>
  );
};
export default FormUncontrolled;
