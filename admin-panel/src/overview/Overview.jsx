import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { CreditCard, Euro, Users } from 'lucide-react'

export default function Overview () {
  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Ingresos totales</p>
              <Euro />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Ventas</p>
              <CreditCard />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Usuarios</p>
              <Users />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Usuarios</p>
              <Users />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className='grid grid-cols-5'>
        <Card className='col-span-3'>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Ventas recientes</p>
              <p>Has realizado 265 ventas este mes.</p>
              <Users />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
        <Card className='col-span-2'>
          <CardHeader>
            <div className='flex justify-between'>
              <p>Usuarios</p>
              <Users />
            </div>
            <CardTitle>+300</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  )
}
