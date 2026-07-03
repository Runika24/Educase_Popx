import "./Button.css";

function Button({title,onClick,secondary}){

    return(

        <button

        className={secondary ? "secondaryBtn":"primaryBtn"}

        onClick={onClick}

        >

            {title}

        </button>

    )

}

export default Button;