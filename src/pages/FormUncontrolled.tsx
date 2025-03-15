import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '../lib/styles/form.module.css';
import { formSchema, FormSchema } from '../lib/form.validators';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooksRedux';
import { fetchCountries } from '../redux/countrySlice';

const { form, form__items, error, form__block } = styles;

const FormUncontrolled = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const handlerForm = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: Omit<FormSchema, 'age'> & {
        age: number | string;
      } = {
        name: formData.get('name') as string,
        age: formData.get('age') === '' ? '' : Number(formData.get('age')),
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
        gender: formData.get('gender') as string,
        picture: formData.get('picture') as File,
        acceptTerms: Boolean(formData.get('acceptTerms')) as boolean,
        country: formData.get('country') as string,
      };
      console.log(data);
      try {
        formSchema.parse(data);
        setErrors({});
        navigate('/');
      } catch (error) {
        if (error instanceof z.ZodError) {
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
      <div className={form__block}>
        <label className={form__items}>
          Password: <input type="password" id="password" name="password" />
        </label>
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
              <input type="radio" name="gender" id="male" value="Male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className={form__items}>
              <input type="radio" name="gender" id="female" value="Female" />
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
      <button type="submit">Submit Form</button>
    </form>
  );
};
export default FormUncontrolled;
