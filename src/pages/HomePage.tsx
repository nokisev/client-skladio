import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Product, Tag } from '../types/apiTypes'
import ProductCard from '../component/Product/ProductCard' // Предполагается, что у вас есть такой компонент
import { fetchData } from '../services/apiService'
import './HomePage.css'
import PlateModel from '../component/PlateModel'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<Tag>(Tag.SPECIAL_PRICE)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchData()
        setProducts(allProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(product => 
    product.tags?.includes(selectedTag)
  )

  const getTagDisplayName = (tag: Tag): string => {
    const tagNames: Record<Tag, string> = {
      [Tag.SPECIAL_PRICE]: 'SALES',
      [Tag.CUPS]: 'Чашки',
      [Tag.PLATES]: 'Тарелки',
      [Tag.TEAPOT]: 'Чайники',
      [Tag.TECH]: 'Техника'
    }
    return tagNames[tag] || tag
  }

  return (
    <div className="home-page">
      <div className="page-container">
        <div className='left'>
          <h1>Добро пожаловать в Sklad<span>io</span></h1>
          <p>Переходите к <Link to="/products">Товарам</Link>, чтобы прикупить что-нибудь в свой дом.</p>
        </div>
        <div className='right'>
          <div className="plate-model-container">
            <PlateModel />
          </div>
        </div>
      </div>
      
      <main className='page-container'>
        <div className='products'>
          <div className="tags-filter">
          <div className="tags-scroll-container">
            {Object.values(Tag).map(tag => (
              <button
                key={tag}
                className={`tag ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {getTagDisplayName(tag)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="products-grid">
          {loading ? (
            <div>Загрузка товаров...</div>
          ) : error ? (
            <div>Ошибка: {error}</div>
          ) : filteredProducts.length === 0 ? (
            <div>Нет товаров с выбранным тегом</div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
        </div>
        
      </main>
    </div>
  )
}