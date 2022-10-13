import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/statics/navbar/Navbar';
import Footer from './components/statics/footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import './App.css';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroPost from './components/postagens/cadastroPost/CadastroPost';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import Home from './paginas/home/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import  {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}> {/* descola o footer do navbar */}
        <Routes> {/* Antigo Switch */}
        <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />

            <Route path="/home" element={<Home />} />

            <Route path="/temas" element={<ListaTema />} />
            <Route path="/cadastroTema" element={<CadastroTema />} />
            <Route path="/atualizarTema/:id" element={<CadastroTema />} />
            <Route path="/apagarTema/:id" element={<DeletarTema />} />

            <Route path="/posts" element={<ListaPostagem />} />
            <Route path="/editarPost/:id" element={<CadastroPost />} />
            <Route path="/apagarPost/:id" element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </ BrowserRouter >
    </Provider>
  );
}
export default App;