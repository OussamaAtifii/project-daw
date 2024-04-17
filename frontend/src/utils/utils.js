const IMAGES_URL = 'http://localhost:3000/images/'

/**
 * Concatena el nombre del archivo de la imagen dado con la URL base para las imágenes.
 *
 * @param {string} image - El nombre del archivo de la imagen.
 * @returns {string} La URL completa de la imagen.
 */
export function getImageUrl (image) {
  return `${IMAGES_URL}${image}`
}
