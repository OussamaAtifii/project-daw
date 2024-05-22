import Categories from '@/categories/Categories'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage () {
  return (
    <div className='flex flex-col items-center justify-center h-full text-left'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>
      <Tabs defaultValue='Resumen' className='w-full'>
        <TabsList>
          <TabsTrigger value='resumen'>Resumen</TabsTrigger>
          <TabsTrigger value='categories'>Categorias</TabsTrigger>
          <TabsTrigger value='productos'>Productos</TabsTrigger>
          <TabsTrigger value='usuarios'>Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value='resumen'>Make changes to your account here.</TabsContent>
        <TabsContent value='categories'><Categories /></TabsContent>
      </Tabs>
    </div>
  )
}
