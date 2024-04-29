import { FacebookIcon, TwitterIcon, InstagramIcon, DribbbleIcon } from './Icons'
import SocialIcon from './SocialIcon'

export default function Footer () {
  return (
    <footer className='bg-main-900 text-white'>
      <div className='max-w-screen-xl mx-auto flex lg:flex-row py-8 gap-14'>
        <div>
          <div className='flex gap-4'>
            <p className='text-3xl font-extrabold'>TecnoNexo</p>
          </div>
          <div className='flex gap-2'>
            <SocialIcon icon={<TwitterIcon />} />
            <SocialIcon icon={<InstagramIcon />} />
            <SocialIcon icon={<FacebookIcon />} />
            <SocialIcon icon={<DribbbleIcon />} />
          </div>
        </div>
        <div className='w-1/3'>
          <h4 className='text-lg font-bold mb-2'>Soporte</h4>
          <ul className='text-sm'>
            <li><a href='#'>Preguntas Frecuentes</a></li>
            <li><a href='#'>Contacto</a></li>
            <li><a href='#'>Política de Privacidad</a></li>
            <li><a href='#'>Términos y Condiciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className='text-lg font-bold mb-2'>Garantía</h4>
          <p className='text-sm'>Ofrecemos una garantía de calidad en todos nuestros productos. Si experimenta algún problema, no dude en ponerse en contacto con nuestro equipo de soporte para obtener asistencia.</p>
        </div>
      </div>
      <p className='text-center text-sm bg-black p-2'>© 2024 TecnoNexo. Todos los derechos reservados.</p>
    </footer>

  )
}
