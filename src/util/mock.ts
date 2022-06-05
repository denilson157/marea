export const urlIbgeEstados = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

export const urlApiFipe = "https://parallelum.com.br/fipe/api/v1"

export const retornarUrlMarcas = (tipoVeiculo: string) => {
    return `${urlApiFipe}/${tipoVeiculo}/marcas`;
}

export const retornarUrlModelo = (tipoVeiculo: string, codMarca: string) => {
    return `${urlApiFipe}/${tipoVeiculo}/marcas/${codMarca}/modelos`;
}