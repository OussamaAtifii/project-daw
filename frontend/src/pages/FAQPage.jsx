import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export default function FAQPage () {
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const fetchFAQs = async () => {
      // Simula una llamada a una API para obtener las preguntas frecuentes
      const data = [
        {
          question: '¿Cuál es la política de devoluciones?',
          answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su condición original.'
        },
        {
          question: '¿Ofrecen garantía en los productos?',
          answer: 'Sí, todos nuestros productos vienen con una garantía de un año contra defectos de fabricación.'
        },
        {
          question: '¿Puedo cambiar mi pedido después de realizarlo?',
          answer: 'Una vez realizado el pedido, no se pueden hacer cambios. Sin embargo, puedes cancelar el pedido antes de que sea enviado y hacer uno nuevo.'
        },
        {
          question: '¿Cómo puedo contactar con atención al cliente?',
          answer: 'Puedes contactar con nuestro equipo de atención al cliente a través del correo electrónico soporte@tuweb.com o llamando al 123-456-7890.'
        },
        {
          question: '¿Ofrecen servicios de instalación para los componentes?',
          answer: 'Sí, ofrecemos servicios de instalación a domicilio por un costo adicional. Puedes seleccionar esta opción al momento de realizar tu pedido.'
        }
      ]
      setFaqs(data)
    }

    fetchFAQs()
  }, [])

  return (
    <>
      <Navbar />
      <main className='max-w-screen-xl mx-auto'>
        <Breadcrumbs />
        <h1 className='text-3xl font-bold mb-6'>Preguntas Frecuentes</h1>
        <section className='faq-section'>
          {faqs.map((faq, index) => (
            <div key={index} className='faq-item border-b py-4'>
              <h2 className='faq-question text-xl font-semibold mb-2'>{faq.question}</h2>
              <p className='faq-answer text-gray-700'>{faq.answer}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
