/* eslint-disable react/prop-types */
import { useState } from 'react'
import Filters from './Filters'
import { ArrowDownIcon, ArrowUpIcon } from './Icons'

export default function FiltersResponsive ({ filters, onChangeMinPrice, onChangeBrand, onChangeCategory, categories }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const toggleFiltros = () => {
    setMostrarFiltros(!mostrarFiltros)
  }

  return (
    <div>
      <div className='flex justify-end mb-2'>
        <button
          className='bg-main-500 text-white p-2 rounded flex md:hidden items-center justify-center gap-1'
          onClick={toggleFiltros}
        >
          Filtros
          {mostrarFiltros ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      {mostrarFiltros && (
        <>
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20'
            onClick={toggleFiltros}
          />
          <div className='fixed bottom-0 left-0 w-full z-30 bg-white h-4/6 p-8 border-t border-gray-200'>
            <Filters
              filters={filters}
              onChangeMinPrice={onChangeMinPrice}
              onChangeBrand={onChangeBrand}
              onChangeCategory={onChangeCategory}
              categories={categories}
            />
          </div>
        </>
      )}
    </div>
  )
}
