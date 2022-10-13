//payload armazena string
//a primeira propriedade é o tipo da action e a segunda propriedade é a informação que ela esta levando
export type Action = { type: "ADD_TOKEN" | "ADD_ID", payload: string }

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token,
});

//pegar o id do usuário na hora do login
export const addId = (id: string): Action => ({
    type: "ADD_ID",
    payload: id
})

