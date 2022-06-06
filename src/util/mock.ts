export const urlIbgeEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

export const urlApiFipe = "https://parallelum.com.br/fipe/api/v1"

export const retornarUrlMarcas = (tipoVeiculo: string) => {
    return `${urlApiFipe}/${tipoVeiculo}/marcas`;
}

export const retornarUrlModelo = (tipoVeiculo: string, codMarca: string) => {
    return `${urlApiFipe}/${tipoVeiculo}/marcas/${codMarca}/modelos`;
}


export const cilindradas = [
    { value: '1.0' },
    { value: '1.4' },
    { value: '1.6' },
    { value: '2.0' },
    { value: '3.0' },
    { value: '4.1' },
    { value: '90' },
    { value: '125' },
    { value: '150' },
    { value: '160' },
    { value: '200' },
    { value: '250' },
    { value: '300' },
]