import { Typography, Button } from '@material-ui/core';
import { Box, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import './Login.css';

function Login() {
    return (
        <>
            <Grid container direction="row" justifyContent='center' alignItems='center'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <form>
                            <Typography variant='h2' gutterBottom color='textPrimary' component='h2' align='center' className='textos1'>Entrar</Typography> {/* variant define o tipo de tag */}

                            <TextField id="outlined-basic" label="Usuario" variant="outlined" name='usuario' fullWidth margin='normal' />
                            <TextField id="outlined-basic" label="Senha" variant="outlined" name='senha' type='password' fullWidth margin='normal' />

                            <Link to='/home' className='text-decorator-none'>
                                <Button type='submit' variant='contained' color='primary'>Logar</Button>
                            </Link>

                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2} >
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} className = 'imagem'>
                </Grid>
            </Grid>
        </>
    )
}

export default Login;