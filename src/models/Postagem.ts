import Tema from "./Tema";
import User from "./User";

interface Postagem {
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema?: Tema|null  //relacionamento entre tema e postagem
    usuario?: User|null 
}

export default Postagem;