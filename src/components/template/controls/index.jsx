import React from 'react'


const Button = ({
    titulo,
    type = "button",
    className = "btn btn-primary",
    carregando = false,
    onClick = () => { },
    onSubmit = () => { },
}) => {

    return (
        <button onClick={onClick} onSubmit={onSubmit} className={className} type={type} disabled={carregando}>
            {
                carregando &&
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            {titulo}
        </button>
    )

}



const Controls = {
    Button
}

export default Controls