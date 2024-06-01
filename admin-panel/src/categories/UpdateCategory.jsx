import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import ImageUploadCard from '@/components/ImageUploadCard'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCategory } from '@/services/categoriesApi'

export default function UpdateCategory () {
  const { id: categoryId } = useParams()
  const { toast } = useToast()
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(null)

  const navigate = useNavigate()

  const formSchema = z.object({
    name: z.string().min(2).max(30),
    desc: z.string().min(150).max(250),
    image: z.any()
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name,
      desc: category?.desc
    }
  })

  const { reset } = form

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategory(categoryId)
        console.log(categoryData)
        setCategory(categoryData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategory()
  }, [categoryId])

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        desc: category.desc
      })
    }
  }, [category, reset])

  const handleImageChange = (newImage) => {
    setImage(newImage)
  }

  const onSubmit = async (values) => {
    try {
      const categoryResponse = await fetch(
        `http://localhost:3000/categories/${categoryId}`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PATCH',
          body: JSON.stringify(values)
        }
      )

      if (!categoryResponse.ok) {
        const errorData = await categoryResponse.json()
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorData.message || 'Error al modificar la categoría'
        })
        return
      }

      const categoryData = await categoryResponse.json()

      if (categoryData.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: categoryData.message
        })
        return
      }

      toast({
        title: 'Categoría modificada correctamente',
        description: categoryData.message
      })

      if (categoryData.id && image) {
        const formData = new FormData()
        formData.append('image', image)

        const imageResponse = await fetch(
          `http://localhost:3000/categories/${categoryData.id}/image`,
          { method: 'POST', body: formData }
        )

        if (!imageResponse.ok) {
          throw new Error('Error al enviar imagen')
        }

        console.log('Imagen subida correctamente.')
      }

      console.log('Categoría creada exitosamente.')
      return navigate('/')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Error de red'
      })
    }
  }

  return (
    <div className='max-w-screen-xl mx-auto'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-semibold'>Modificar categoria</h1>
          <div className='space-x-4'>
            <Link to='/'>
              <Button variant='outline' type='button'>
                Cancelar
              </Button>
            </Link>
            <Button>Modificar Categoria</Button>
          </div>
        </div>
        <div className='grid grid-cols-5 gap-8'>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>Detalles de la categoría</CardTitle>
              <CardDescription>
                Introduce el nombre y la descripción de la nueva categoría para
                gestionar mejor tus productos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Nombre de la categoría'
                            {...field}
                            className='focus-visible:ring-1 focus-visible:ring-offset-0'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='desc'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Descripción de la categoría'
                            {...field}
                            className='resize-none h-40'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
          <ImageUploadCard
            onImageChange={handleImageChange}
            image={category ? category.image : ''}
          />
        </div>
      </form>
    </div>
  )
}
