//payload armazena string
//a primeira propriedade é o tipo da action e a segunda propriedade é a informação que ela esta levando
export type Action = {type: "ADD_TOKEN"; payload: string};

export const  addToken =(token:string): Action => ({
    type:"ADD_TOKEN",
    payload: token,
});

