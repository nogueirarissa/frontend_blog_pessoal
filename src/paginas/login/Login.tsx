import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Box, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service'; //consome api definida no services.ts
import UserLogin from '../../models/UserLogin';
import { useDispatch } from 'react-redux';
import { addToken, addId } from '../../store/tokens/action';
import './Login.css';
import { toast } from 'react-toastify';

function Login() {
    let navigate = useNavigate(); // armazena o token no navegador.
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [form, setForm] = useState(false);

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    });

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    });

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token))
            navigate('/home');
        }
    }, [token]);

    async function conectar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await login('usuarios/logar', userLogin, setRespUserLogin);
            toast.success('Usuario conectado com sucesso', {
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(`Falha ao conectar`, {
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: true
            })
        }
    }


    //metodo para pegar o token e o id do json e guardar no redux
    useEffect(() => {
        if (respUserLogin.token !== '') { 
            //console.log(respUserLogin)
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            navigate('/home');
        }
    }, [respUserLogin.token])


    //substitu??do pelo m??todo conectar
    /*async function onSubmit(e: ChangeEvent<HTMLFormElement>) { //quando clica no bot??o de logar para autenticar os dados do usu??rio, ele enviar?? as informa????es por meio da fun????o onSubmit. 
        e.preventDefault(); // aqui impede que ao clicar no bot??o a tela seja atualizada (previne o comportamento padr??o do bot??o)
        try {
            await login('/usuarios/logar', userLogin, setToken)

            alert('Usu??rio logado com sucesso!');
        } catch (error) {
            alert('Dados do usu??rio inconsistentes. Erro ao logar!');

        }
        /*console.log('userLogin: ' + Object.values (userLogin)); //apenas para teste, n??o se deve deixar na aplica????o */

    return (
        <>
            <Grid container direction="row" justifyContent='center' alignItems='center'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={conectar}>
                            <Typography variant='h4' gutterBottom color='textPrimary' component='h4' align='center' className='textos1'>Entrar</Typography> {/* variant define o tipo de tag */}

                            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usu??rio" variant="outlined" name='usuario' fullWidth margin='normal' />
                            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" variant="outlined" name='senha' type='password' fullWidth margin='normal' />

                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>Logar</Button>
                            </Box>

                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2} >
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>N??o tem uma conta?</Typography>
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