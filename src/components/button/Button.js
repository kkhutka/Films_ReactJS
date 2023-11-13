import './Button.css'
const Button = ({color, text,lnk}) =>{
    return(
        <button style ={{backgroundColor: color}} className={'btn'} onClick={lnk}>
            {text}
        </button>
    )
}

export default Button;