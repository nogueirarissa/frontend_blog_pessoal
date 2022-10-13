import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import User from '../../../models/User';

//import { TokenState } from '../../../store/tokens/tokenReducer';

function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token, setToken] = useLocalStorage('token');
    /*const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );*/

    /*useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")

        }
    }, [token])*/

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null // adiciona o usuário dono na postagem
    })

    /*Buscar o ID dentro do REDUX
    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )*/

    /*State que vai controlar o usuário que será inserido na postagem
    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })*/

    useEffect(() => { //monitora o state tema, e caso eu selecione o tema x, ela assume o valor e atualiza pelo setPostagem
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem atualizada com sucesso');
            } catch (error) {
                alert('Erro ao atualizar, verifique os campos');
            }
        } else {
            try {
                await post(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                alert('Postagem cadastrada com sucesso');
            } catch (error) {
                alert('Erro ao cadastrar, verifique os campos');
            }
        }
        navigate('/posts');
    } 
    return ( //função onSubmit envia as informações para a api
        <Container maxWidth="sm" className="topo"> 
            <form onSubmit={onSubmit}> 
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, { 
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {temas.map((item) => (
                            <MenuItem value={item.id} style={{ display: 'block' }}>
                                {item.descricao}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;