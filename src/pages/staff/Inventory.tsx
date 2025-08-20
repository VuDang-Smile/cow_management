import { useState } from 'react'
import { useI18n } from '../../i18n'
import Card from '../../components/Card'

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  unit: string
  lastUpdated: string
  location: string
  notes: string
}

interface Transaction {
  id: string
  itemId: string
  type: 'in' | 'out'
  quantity: number
  date: string
  reason: string
  authorizedBy: string
  notes: string
}

export default function Inventory() {
  const { t } = useI18n()
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [transaction, setTransaction] = useState<Partial<Transaction>>({
    type: 'out',
    quantity: 0,
    reason: '',
    notes: ''
  })
  const [hasPermission, setHasPermission] = useState(true) // Giả lập phân quyền

  const inventoryItems: InventoryItem[] = [
    {
      id: 'I001',
      name: '飼料',
      category: '資材',
      currentStock: 50,
      minStock: 100,
      unit: 'kg',
      lastUpdated: '2024-01-15',
      location: '倉庫A',
      notes: '乳牛用配合飼料'
    },
    {
      id: 'I002',
      name: '予防接種薬',
      category: '薬品',
      currentStock: 5,
      minStock: 20,
      unit: '本',
      lastUpdated: '2024-01-14',
      location: '薬品庫',
      notes: '定期予防接種用'
    },
    {
      id: 'I003',
      name: 'ワクチン',
      category: '薬品',
      currentStock: 8,
      minStock: 15,
      unit: '回分',
      lastUpdated: '2024-01-13',
      location: '冷蔵庫',
      notes: '冷蔵保管'
    },
    {
      id: 'I004',
      name: '藁',
      category: '資材',
      currentStock: 200,
      minStock: 50,
      unit: 'kg',
      lastUpdated: '2024-01-12',
      location: '倉庫B',
      notes: '牛舎敷料用'
    }
  ]

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedItem && hasPermission) {
      // Thực hiện giao dịch nhập/xuất
      const newTransaction: Transaction = {
        ...transaction as Transaction,
        id: Date.now().toString(),
        itemId: selectedItem.id,
        date: new Date().toISOString().split('T')[0],
        authorizedBy: 'Nhân viên hiện tại'
      }
      console.log('Thực hiện giao dịch:', newTransaction)
      setShowTransactionForm(false)
      setTransaction({
        type: 'out',
        quantity: 0,
        reason: '',
        notes: ''
      })
    }
  }

  const getStockStatus = (current: number, min: number) => {
    if (current <= min * 0.5) return '🔴'
    if (current <= min) return '🟡'
    return '🟢'
  }

  const getStockStatusText = (current: number, min: number) => {
    if (current <= min * 0.5) return t('need_supplement_urgent')
    if (current <= min) return t('need_supplement_normal')
    return t('sufficient_stock')
  }

  return (
    <div className="inventory-page">
      <h1>📦 {t('staff_inventory')}</h1>
      
      {!hasPermission && (
        <div className="permission-warning">
          <p>⚠️ {t('no_permission_warning')}</p>
        </div>
      )}
      
      <div className="grid">
        {/* Danh sách vật tư */}
        <Card title={`📋 ${t('inventory_list')}`}>
          <div className="inventory-list">
            {inventoryItems.map(item => (
              <div 
                key={item.id} 
                className={`inventory-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="item-header">
                  <span className="item-id">{item.id}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="stock-status">
                    {getStockStatus(item.currentStock, item.minStock)} {getStockStatusText(item.currentStock, item.minStock)}
                  </span>
                </div>
                <div className="item-details">
                  <p><strong>{t('item_category')}:</strong> {item.category}</p>
                  <p><strong>{t('stock')}:</strong> {item.currentStock} {item.unit}</p>
                  <p><strong>{t('min_stock')}:</strong> {item.minStock} {item.unit}</p>
                  <p><strong>{t('location')}:</strong> {item.location}</p>
                  <p><strong>{t('last_updated')}:</strong> {item.lastUpdated}</p>
                  <p><strong>{t('notes_label')}:</strong> {item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chi tiết và giao dịch */}
        {selectedItem && (
          <Card title={`📊 ${t('item_details')} ${selectedItem.name}`}>
            <div className="item-detail">
              <div className="item-info">
                <h3>{t('item_info')}</h3>
                <p><strong>{t('id')}:</strong> {selectedItem.id}</p>
                <p><strong>{t('item_name')}:</strong> {selectedItem.name}</p>
                <p><strong>{t('item_category')}:</strong> {selectedItem.category}</p>
                <p><strong>{t('current_stock_label')}:</strong> {selectedItem.currentStock} {selectedItem.unit}</p>
                <p><strong>{t('min_stock')}:</strong> {selectedItem.minStock} {selectedItem.unit}</p>
                <p><strong>{t('location')}:</strong> {selectedItem.location}</p>
                <p><strong>{t('last_updated')}:</strong> {selectedItem.lastUpdated}</p>
                <p><strong>{t('stock_status')}:</strong> {getStockStatus(selectedItem.currentStock, selectedItem.minStock)} {getStockStatusText(selectedItem.currentStock, selectedItem.minStock)}</p>
                <p><strong>{t('notes_label')}:</strong> {selectedItem.notes}</p>
              </div>

              {hasPermission && (
                <div className="transaction-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowTransactionForm(true)}
                  >
                    📝 {t('transaction_form')}
                  </button>
                </div>
              )}

              {showTransactionForm && hasPermission && (
                <div className="transaction-form">
                  <h4>{t('transaction_form')}</h4>
                  <form onSubmit={handleTransactionSubmit}>
                    <div className="form-group">
                                              <label>{t('transaction_type')}:</label>
                      <select
                        value={transaction.type}
                        onChange={(e) => setTransaction({
                          ...transaction,
                          type: e.target.value as 'in' | 'out'
                        })}
                        required
                      >
                        <option value="in">📥 {t('import_stock')}</option>
                        <option value="out">📤 {t('export_stock')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                                              <label>{t('quantity_label')} ({selectedItem.unit}):</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={transaction.quantity}
                        onChange={(e) => setTransaction({
                          ...transaction,
                          quantity: parseFloat(e.target.value)
                        })}
                        required
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('reason_label')}:</label>
                      <select
                        value={transaction.reason}
                        onChange={(e) => setTransaction({
                          ...transaction,
                          reason: e.target.value
                        })}
                        required
                      >
                        <option value="">{t('select_reason')}</option>
                        <option value="daily_use">{t('daily_use')}</option>
                        <option value="emergency">{t('emergency')}</option>
                        <option value="restock">{t('restock')}</option>
                        <option value="task_related">{t('task_related')}</option>
                        <option value="other">{t('other')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                                              <label>{t('notes_label')}:</label>
                      <textarea
                        value={transaction.notes}
                        onChange={(e) => setTransaction({
                          ...transaction,
                          notes: e.target.value
                        })}
                        placeholder={t('transaction_notes')}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-success">
                        💾 {t('execute_transaction')}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowTransactionForm(false)}
                      >
                        ❌ {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!hasPermission && (
                <div className="no-permission">
                  <p>🔒 {t('no_permission_message')}</p>
                  <p>{t('contact_manager')}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
