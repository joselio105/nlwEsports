interface ButtonProps {
  title: string
}

const Button = (props:ButtonProps) => {
  const title = props.title;
  return <button>{title}</button>
}

function App() {
  return (
    <>
      <Button title="Enviar" />
      <Button title="Excluir" />
      <Button title="Criar" />
      <Button title="Voltar" />
      <Button title="Atualizar" />
    </>
   
  )
}

export default App
