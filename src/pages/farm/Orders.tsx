import Card from '../../components/Card'
import { orders } from '../../mocks/farm'
import { OrderStatus } from '../../interfaces'
import { useI18n } from '../../i18n'

export default function Orders(){
  const { t, lang } = useI18n()
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={t('orders_list')} rightSlot={<button className="btn success">+ {t('create_order')}</button>}>
        <div className="grid" style={{ gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
          {orders.map(o=> (
            <div className="card" key={o.id}>
              <div className="row" style={{ justifyContent:'space-between' }}>
                <div className="section-title">{o.id}</div>
                <div className={`badge ${o.status===OrderStatus.Completed? 'green': o.status===OrderStatus.Cancelled? 'red':'yellow'}`}>{o.status}</div>
              </div>
              <div className="muted">{t('customer')}: {o.customerName}</div>
              <div className="muted">{t('products')}: {o.products.map(p=> `${(p as any).nameKey ? t((p as any).nameKey) : p.name} x${p.quantity}${p.unit}`).join(', ')}</div>
              <div className="muted">{t('delivery_date')}: {new Date(o.deliveryDate).toLocaleDateString(locale)}</div>
              <div className="actions" style={{ marginTop: 8 }}>
                <button className="btn secondary">{t('view_detail')}</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}


