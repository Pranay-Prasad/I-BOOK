import UINotes from './UINotes'
export const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      
      <UINotes showAlert={showAlert}/>
    </div>
  )
}