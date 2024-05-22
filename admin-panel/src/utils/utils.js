/**
 * Formatea una cadena de fecha dada en el formato dd/mm/yyyy.
 *
 * @param {string} dateString - La cadena de fecha a formatear.
 * @returns {string} La cadena de fecha formateada en el formato dd/mm/yyyy.
 */
export function formatDate (dateString) {
  const date = new Date(dateString)
  // Obtener el día y asegurar que tenga dos dígitos
  const day = date.getDate().toString().padStart(2, '0')

  // Obtener el mes (se suma 1 porque en JavaScript los meses van de 0 a 11) y asegurar que tenga dos dígitos
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  // Obtener el año
  const year = date.getFullYear()

  const hour = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Retornar la fecha formateada en el formato dd/mm/yyyy
  return `${day}/${month}/${year} - ${hour}:${minutes}`
}
