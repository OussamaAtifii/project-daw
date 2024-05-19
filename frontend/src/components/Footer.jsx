import { FacebookIcon, TwitterIcon, InstagramIcon, DribbbleIcon, EmailIcon, PhoneIcon, ArrowRightIcon, OfficeIcon } from './Icons'
import SocialIcon from './SocialIcon'

export default function Footer () {
  return (
    <footer className='bg-main-900 text-white'>
      <div className='max-w-screen-xl mx-auto py-12 px-2 xl:px-0'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='text-center lg:text-left'>
            <p className='text-3xl font-extrabold mb-4'>TecnoNexo</p>
            <div className='flex justify-center lg:justify-start gap-4 mb-4'>
              <SocialIcon icon={<TwitterIcon />} />
              <SocialIcon icon={<InstagramIcon />} />
              <SocialIcon icon={<FacebookIcon />} />
              <SocialIcon icon={<DribbbleIcon />} />
            </div>
          </div>
          <div className='text-center lg:text-left'>
            <h4 className='text-lg font-bold mb-3'>Soporte</h4>
            <ul className='text-sm space-y-2'>
              <li><a href='#' className='hover:text-blue-300'>Preguntas Frecuentes</a></li>
              <li><a href='#' className='hover:text-blue-300'>Contacto</a></li>
              <li><a href='#' className='hover:text-blue-300'>Política de Privacidad</a></li>
              <li><a href='#' className='hover:text-blue-300'>Términos y Condiciones</a></li>
            </ul>
          </div>
          <div className='text-center lg:text-left'>
            <h4 className='text-lg font-bold mb-3'>Contacto</h4>
            <ul className='text-sm space-y-2 flex flex-col items-center lg:items-start'>
              <li className='flex items-center lg:justify-start gap-1'><OfficeIcon color='#fff' /><ArrowRightIcon size={18} color='#fff' /><a href='#' className='hover:text-blue-300'>Gran Vía, 1, Madrid, España</a></li>
              <li className='flex items-center lg:justify-start gap-1'><EmailIcon /><ArrowRightIcon size={18} color='#fff' /> <a href='#' className='hover:text-blue-300'> info@tecnonexo.com</a></li>
              <li className='flex items-center lg:justify-start gap-1'><PhoneIcon /><ArrowRightIcon size={18} color='#fff' /><a href='#' className='hover:text-blue-300'>+34 612 34 56 78</a></li>
            </ul>
          </div>
          <div className='text-center lg:text-left text-pretty'>
            <h4 className='text-lg font-bold mb-3'>Garantía</h4>
            <p className='text-sm'>Ofrecemos una garantía de calidad en todos nuestros productos. Si experimenta algún problema, no dude en ponerse en contacto con nuestro equipo de soporte para obtener asistencia.</p>
          </div>
        </div>
      </div>
      <div className='bg-gray-800 py-4'>
        <p className='text-center text-sm'>© 2024 TecnoNexo. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
