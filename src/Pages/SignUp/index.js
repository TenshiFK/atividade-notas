import { useState, useContext  } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../Contexts/auth';
import Headerlogin from '../../Components/HeaderLogin';

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();

    if(name !== '' && email !== '' && password !== ''){
     await signUp(email, password, name)
    }

  }

  return(
    <div className="container-login">
    <Headerlogin/>
      <div className='conteudo-login'>
        <svg className='icone-login' xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 163 169" fill="none">
          <ellipse cx="81.5899" cy="84.0783" rx="81.2074" ry="84.0783" fill="white"/>
          <path d="M135.581 128.418L138.056 125.196L134.794 122.773C120.991 112.519 102.202 105.303 81.5899 105.303C60.9782 105.303 42.1893 112.519 28.3858 122.773L25.1242 125.196L27.5986 128.418C34.0412 136.809 42.2407 143.596 51.5917 148.262C60.9422 152.928 71.1973 155.349 81.5899 155.34C91.9825 155.349 102.238 152.928 111.588 148.262C120.939 143.596 129.139 136.809 135.581 128.418ZM4.38142 84.0783C4.38142 39.7183 39.0774 3.99885 81.5899 3.99885C124.102 3.99885 158.798 39.7183 158.798 84.0783C158.798 128.438 124.102 164.158 81.5899 164.158C39.0774 164.158 4.38142 128.438 4.38142 84.0783ZM51.6182 50.312C49.9998 54.3571 49.1685 58.6881 49.1685 63.0588C49.1685 71.88 52.5518 80.3667 58.6158 86.6452C64.6845 92.9283 72.9455 96.485 81.5899 96.485C90.2344 96.485 98.4954 92.9283 104.564 86.6452C110.628 80.3667 114.011 71.88 114.011 63.0588C114.011 58.6881 113.18 54.3571 111.562 50.312C109.943 46.2667 107.568 42.5822 104.564 39.4723C101.56 36.3622 97.9863 33.8874 94.0429 32.1962C90.0992 30.5049 85.8673 29.6325 81.5899 29.6325C77.3126 29.6325 73.0807 30.5049 69.137 32.1962C65.1936 33.8874 61.6198 36.3622 58.6158 39.4723C55.6122 42.5822 53.2366 46.2667 51.6182 50.312Z" fill="#1D3485" stroke="#1D3485" stroke-width="7.9977"/>
        </svg>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1 className='nova_conta'>Nova conta</h1>
            <input 
              type="text" 
              placeholder="Seu nome"
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

            <input className='email'
              type="text" 
              placeholder="email@email.com"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <input 
              type="password" 
              placeholder="********"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />

            <button className='btn-login' type="submit">
              {loadingAuth ? 'Carregando...' : 'Cadastrar'}
            </button>
          </form>

          <Link to="/">Já possui uma conta? Faça login</Link>

        </div>
      </div>
    </div>
  )
}