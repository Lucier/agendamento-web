export const formatarData = (data: string): string => {
  const dataObj = new Date(data)
  const formatadorData = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const formatadorHora = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  // Removendo o ponto final que o 'short' coloca no mês (ex: "out.") e capitalizando
  const dataFormatada = formatadorData.format(dataObj).replace('.', '')
  const horaFormatada = formatadorHora.format(dataObj)

  return `${dataFormatada} • ${horaFormatada}`
}
