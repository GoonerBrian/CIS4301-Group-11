import {useState} from 'react';
import {Link} from 'react-router-dom';
const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [Password, setPassWord] = useState('');
    const [error, setError] = useState('');
    return (
        <>
        <h1>Login Page Stub</h1>
        {error && <p>{error}</p>}
        <input placeholder= 'Username' 
        value = {username}
        onChange={e => setUserName(e.target.username)} />

        <input type='password' 
        placeholder ='Password'
        value = {Password}
        onChange={e => setPassWord(e.target.Password)}/>

        <button>Log In</button>
        <Link to='/create-account'>Create account here</Link>
        </>
    );
}

export default LoginPage;