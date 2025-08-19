import Card from '../../components/Card'
import { inventoryItems } from '../../mocks/farm'
import { useI18n } from '../../i18n'
import { InventoryStatus } from '../../interfaces'

export default function Inventory(){
  const { t } = useI18n()
  const low = inventoryItems.filter(i=> i.status===InventoryStatus.Low)
  const out = inventoryItems.filter(i=> i.status===InventoryStatus.OutOfStock) 
  const ok = inventoryItems.filter(i=> i.status===InventoryStatus.Available)

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gap: 12 }}>
        <Card title={t('inv_total_value')}><div className="stat">{inventoryItems.reduce((s,i)=> s+i.value,0).toLocaleString()}</div></Card>
        <Card title={t('low')}><div className="stat">{low.length}</div></Card>
        <Card title={t('out_of_stock')}><div className="stat">{out.length}</div></Card>
        <Card title={t('available')}><div className="stat">{ok.length}</div></Card>
      </div>

      <Card title={t('priority_alerts')}>
        {low.map(i=> (
          <div key={i.id} className="row" style={{ marginBottom: 8 }}>
            <div className="badge yellow">{t('alert')}</div>
            <div style={{ marginLeft: 8 }}>&quot;{(i as any).nameKey ? t((i as any).nameKey) : i.name}&quot; {t('inv_low_hint')}</div>
          </div>
        ))}
      </Card>

      <Card title={t('all_items')}>
        <table className="table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('category')}</th>
              <th>{t('stock')}</th>
              <th>{t('unit')}</th>
              <th>{t('status')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(i=> (
              <tr key={i.id}>
                <td>{(i as any).nameKey ? t((i as any).nameKey) : i.name}</td>
                <td>{i.category}</td>
                <td>{i.quantity}</td>
                <td>{i.unit}</td>
                <td>
                  <span className={`badge ${i.status === InventoryStatus.Available ? 'green' : i.status === InventoryStatus.Low ? 'yellow' : 'red'}`}>{i.status}</span>
                </td>
                <td className="actions">
                  <button className="btn secondary">{t('view_detail')}</button>
                  <button className="btn">{t('import_stock')}</button>
                  <button className="btn warn">{t('export_adjust')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}


