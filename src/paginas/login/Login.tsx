import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Box, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service'; //consome api definida no services.ts
import UserLogin from '../../models/UserLogin';
import './Login.css';

function Login() {
    let navigate = useNavigate(); // armazena o token no navegador.
    const [token, setToken] = useLocalStorage('token');
    const [form, setForm] = useState(false);
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: '',
        }
    );

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (token !== '') {
            navigate('/home');
        }
    }, [token]);


    async function onSubmit(e: ChangeEvent<HTMLFormElement>) { //quando clica no botão de logar para autenticar os dados do usuário, ele enviará as informações por meio da função onSubmit. 
        e.preventDefault(); // aqui impede que ao clicar no botão a tela seja atualizada (previne o comportamento padrão do botão)
        try {
            await login('/usuarios/logar', userLogin, setToken)

            alert('Usuário logado com sucesso!');
        } catch (error) {
            alert('Dados do usuário inconsistentes. Erro ao logar!');

        }
        /*console.log('userLogin: ' + Object.values (userLogin)); //apenas para teste, não se deve deixar na aplicação */
    }

    return (
        <>
            <Grid container direction="row" justifyContent='center' alignItems='center'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h4' gutterBottom color='textPrimary' component='h4' align='center' className='textos1'>Entrar</Typography> {/* variant define o tipo de tag */}

                            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" variant="outlined" name='usuario' fullWidth margin='normal' />
                            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" variant="outlined" name='senha' type='password' fullWidth margin='normal' />

                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>Logar</Button>
                            </Box>

                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2} >
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Box marginRight={1}>
                                <Link to='/cadastro'>
                                    <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} className='imagem'>
                </Grid>
            </Grid>
        </>
    )
}

export default Login;