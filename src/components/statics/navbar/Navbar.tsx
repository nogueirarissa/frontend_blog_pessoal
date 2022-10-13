import { AppBar, Toolbar, Box, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import './Navbar.css';

function Navbar() {
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();

    function goLogout() {
        setToken('')
        alert("Usuário deslogado com sucesso.")
        navigate('/login')
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Box className="cursor">
                        <Typography variant="h5" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>

                    <Grid container justifyContent="center">
                        <Box display="flex" justifyContent="space-around">
                            <Link to="/home" className="text-decorator-none">
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        Home
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/posts" className="text-decorator-none">
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        Postagens
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/temas" className="text-decorator-none">
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        Temas
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to="/formularioTema" className="text-decorator-none">
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        Cadastrar Temas
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                    <Box display="flex" justifyContent="end">
                        <Typography variant="h6" color="inherit">
                            Dark Mode
                        </Typography>
                    </Box>

                    <Box mx={1} className="cursor" onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;