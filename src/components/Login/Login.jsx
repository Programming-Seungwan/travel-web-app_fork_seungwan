import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { auth, provider } from '../../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import './login.css';

function Login({ isLoggedIn, onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const navigate = useNavigate();

  async function handleGithubLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      onChangeIsLoggedIn(!isLoggedIn);
      onChangeUserId(user.uid);
      onChangeDisplayName(user.displayName);

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('displayName', user.displayName);

      console.log(user);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-page-outer-div'>
      <div className='login-header'>
        <h2>로그인</h2>
        <div></div>
        <button>
          <Link to='/'>홈으로</Link>
        </button>
      </div>
      <img className='project-logo' src='assets/일단락.png' alt='메인로고' />
      <LoginForm
        isLoggedIn={isLoggedIn}
        onChangeIsLoggedIn={onChangeIsLoggedIn}
        onChangeUserId={onChangeUserId}
        onChangeDisplayName={onChangeDisplayName}
      />
      <div className='__or__'> 또는 </div>

      <div className='github-login-div' onClick={handleGithubLogin}>
        <img className='github-img' src='assets/github-logo.png' alt='깃허브로 로그인' />
        <span>Github 계정으로 로그인</span>
      </div>
    </div>
  );
}

export default Login;
