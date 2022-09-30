import { Typography, Button } from '@material-ui/core';
import {Box, Grid, TextField} from '@mui/material';
import React from 'react';
import '.Login.css';

function Login() {
    return(
        <>
        <Grid container direction="row">
            <Grid item xs={6}>
                <Box>
                    <form>
                        <Typography variant='h2'>Entrar</Typography>

                        <TextField id="outlined-basic" label="Usuario" variant="outlined" fullWidth margin='normal'/>
                        <TextField id="outlined-basic" label="Senha" variant="outlined" fullWidth margin='normal'/>

                        <Link to='/home'>
                            <Button type='submit' variant='contained' color='primary'>Entrar</Button>
                        </Link>

                    </form>
                    <Box display='flex'>
                        <Typography>Ainda não tem uma conta?</Typography>
                        <Typography>Cadastre-se</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} className='bg-login'></Grid>
        </Grid>
    </>    
    )
}