import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../lib/styles/form.module.css';
import { fetchCountries, selectCountries } from '../redux/countrySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooksRedux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchema } from '../lib/form.validators';
import { addForm } from '../redux/formsSlice';
import { toBase64 } from '../lib/base64';
import { useNavigate } from 'react-router';
import { getStrength } from '../lib/getStrength';
const { form, form__block, form__items, error, form__block_password } = styles;

const FormControlled = () => {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => selectCountries(state));
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const strength = getStrength(value);
    setPasswordStrength(strength);
    setValue('password', value);
    trigger('password');
  };
  const handlerForm: SubmitHandler<FormSchema> = async (data) => {
    if (data.picture instanceof FileList) {
      dispatch(
        addForm({ ...data, picture: await toBase64(data.picture[0] as File) })
      );
      navigate('/');
    }
  };
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <form className={form} onSubmit={handleSubmit(handlerForm)}>
      <h2>Form Controlled</h2>
      <div className={form__block}>
        <label className={form__items}>
          Name:
          <input type="text" id="name" {...register('name')} />
        </label>
        {errors.name && <span className={error}>{errors.name.message}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Age:
          <input
            type="number"
            id="age"
            {...register('age', {
              setValueAs: (value) => (value === '' ? '' : Number(value)),
            })}
          />
        </label>
        {errors.age && <span className={error}>{errors.age.message}</span>}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Email: <input type="email" id="email" {...register('email')} />
        </label>
        {errors.email && <span className={error}>{errors.email.message}</span>}
      </div>
      <div className={`${form__block} ${form__block_password}`}>
        <label className={form__items}>
          Password:
          <input
            type="password"
            id="password"
            {...register('password')}
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
        {errors.password && (
          <span className={error}>{errors.password.message}</span>
        )}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Confirm Password:
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
        </label>
        {errors.confirmPassword && (
          <span className={error}>{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className={form__block}>
        <div className={form__items}>
          <label>Choose Gender: </label>
          <div className={form__items}>
            <div className={form__items}>
              <input
                type="radio"
                id="male"
                value="Male"
                {...register('gender')}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className={form__items}>
              <input
                type="radio"
                id="female"
                value="Female"
                {...register('gender')}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        {errors.gender && (
          <span className={error}>{errors.gender.message}</span>
        )}
      </div>
      <div className={form__block}>
        <label className={form__items}>
          Upload Picture:
          <input
            type="file"
            id="picture"
            {...register('picture')}
            accept="image/jpeg, image/png"
          />
        </label>
        {errors.picture && (
          <span className={error}>{errors.picture.message}</span>
        )}
      </div>
      <div className={form__block}>
        <div className={form__items}>
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          <label htmlFor="acceptTerms">
            Accept Terms and Conditions agreement
          </label>
        </div>
        {errors.acceptTerms && (
          <span className={error}>{errors.acceptTerms.message}</span>
        )}
      </div>
      <div className={form__block}>
        <label htmlFor="country" className={form__items}>
          Country:
          <input
            type="text"
            id="country"
            {...register('country')}
            list="countries"
          />
        </label>
        <datalist id="countries">
          {countries.map((country) => {
            return <option key={country} value={country} />;
          })}
        </datalist>
        {errors.country && (
          <span className={error}>{errors.country.message}</span>
        )}
      </div>
      <button type="submit" formNoValidate disabled={!isValid}>
        Submit Form
      </button>
    </form>
  );
};
export default FormControlled;
