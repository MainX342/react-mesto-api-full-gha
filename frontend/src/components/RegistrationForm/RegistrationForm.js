import AuthForm from '../AuthForm/AuthForm';
import { Link } from 'react-router-dom';


export default function RegistrationForm({ name, children, isValid, onSubmit }) {

  return (
    <section className="login page__login">
      <h2 className="login__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <AuthForm
        name={name}
        titleButton={name === 'signup' ? 'Регистрация' : 'Войти'}
        sendingText={name === 'signup' ? 'Регистрация...' : 'Вход...'}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === 'signup' && <p className="login__subtitle">Уже зарегистрированы? <Link to={'/sign-in'} className='login__subtitle'>Войти</Link></p>}
      {name === 'signin' && <p className="login__subtitle">Еще не зарегистрированы? <Link to={'/sign-up'} className='login__subtitle'>Регистрация</Link></p>}
    </section>
  )
}