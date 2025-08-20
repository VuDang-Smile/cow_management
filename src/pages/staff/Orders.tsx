import { useState } from 'react'
import { useI18n } from '../../i18n'
import Card from '../../components/Card'

interface Order {
  id: string
  orderNumber: string
  type: 'incoming' | 'outgoing'
  supplier?: string
  customer?: string
  items: OrderItem[]
  totalAmount: number
  orderDate: string
  expectedDate: string
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'received' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  notes: string
  assignedTo?: string
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

export default function Orders() {
  const { t } = useI18n()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showStatusForm, setShowStatusForm] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    notes: ''
  })

  const orders: Order[] = [
    {
      id: 'O001',
      orderNumber: 'ORD-2024-001',
      type: 'incoming',
      supplier: '飼料会社ABC',
      items: [
        { id: '1', name: '高級飼料', quantity: 500, unit: 'kg', unitPrice: 15000, totalPrice: 7500000 },
        { id: '2', name: 'ビタミン剤', quantity: 50, unit: '本', unitPrice: 50000, totalPrice: 2500000 }
      ],
      totalAmount: 10000000,
      orderDate: '2024-01-10',
      expectedDate: '2024-01-16',
      status: 'confirmed',
      priority: 'high',
      notes: '1月分の飼料注文',
      assignedTo: '現担当者'
    },
    {
      id: 'O002',
      orderNumber: 'ORD-2024-002',
      type: 'outgoing',
      customer: '乳製品会社XYZ',
      items: [
        { id: '1', name: '生乳', quantity: 200, unit: 'L', unitPrice: 25000, totalPrice: 5000000 }
      ],
      totalAmount: 5000000,
      orderDate: '2024-01-12',
      expectedDate: '2024-01-15',
      status: 'in_transit',
      priority: 'medium',
      notes: '定期出荷の生乳配送',
      assignedTo: '現担当者'
    },
    {
      id: 'O003',
      orderNumber: 'ORD-2024-003',
      type: 'incoming',
      supplier: '医薬品会社DEF',
      items: [
        { id: '1', name: '予防接種薬', quantity: 100, unit: '本', unitPrice: 30000, totalPrice: 3000000 },
        { id: '2', name: 'ワクチン', quantity: 200, unit: '回分', unitPrice: 15000, totalPrice: 3000000 }
      ],
      totalAmount: 6000000,
      orderDate: '2024-01-13',
      expectedDate: '2024-01-18',
      status: 'pending',
      priority: 'high',
      notes: '2月の予防接種用薬品とワクチン',
      assignedTo: '現担当者'
    }
  ]

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOrder) {
      // Cập nhật trạng thái đơn hàng
      console.log('Cập nhật đơn hàng:', {
        orderId: selectedOrder.id,
        ...statusUpdate
      })
      setShowStatusForm(false)
      setStatusUpdate({
        status: '',
        notes: ''
      })
    }
  }

  const getOrderTypeIcon = (type: string) => {
    return type === 'incoming' ? '📥' : '📤'
  }

  const getOrderTypeText = (type: string) => {
    return type === 'incoming' ? t('incoming_order') : t('outgoing_order')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'confirmed': return '✅'
      case 'in_transit': return '🚚'
      case 'delivered': return '📦'
      case 'received': return '📥'
      case 'cancelled': return '❌'
      default: return '⚪'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('pending')
      case 'confirmed': return t('confirmed')
      case 'in_transit': return t('in_transit')
      case 'delivered': return t('delivered')
      case 'received': return t('received')
      case 'cancelled': return t('cancelled')
      default: return t('unknown')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div className="orders-page">
      <h1>📋 {t('staff_orders')}</h1>
      
      <div className="grid">
        {/* Danh sách đơn hàng */}
        <Card title={`📝 ${t('orders_list')}`}>
          <div className="order-list">
            {orders.map(order => (
              <div 
                key={order.id} 
                className={`order-item ${selectedOrder?.id === order.id ? 'selected' : ''} ${order.status}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <span className="order-number">{order.orderNumber}</span>
                  <span className="order-type">
                    {getOrderTypeIcon(order.type)} {getOrderTypeText(order.type)}
                  </span>
                  <div className="order-badges">
                    <span className={`priority ${order.priority}`}>
                      {getPriorityColor(order.priority)} {order.priority}
                    </span>
                    <span className={`status ${order.status}`}>
                      {getStatusIcon(order.status)} {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                <div className="order-details">
                  <p><strong>{t('partner')}:</strong> {order.supplier || order.customer}</p>
                  <p><strong>{t('order_date')}:</strong> {order.orderDate}</p>
                  <p><strong>{t('expected_date')}:</strong> {order.expectedDate}</p>
                  <p><strong>{t('total_amount')}:</strong> {formatCurrency(order.totalAmount)}</p>
                  <p><strong>{t('items_count')}:</strong> {order.items.length}</p>
                                      {order.notes && (
                      <p><strong>{t('notes_label')}:</strong> {order.notes}</p>
                    )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chi tiết đơn hàng */}
        {selectedOrder && (
          <Card title={`📊 ${t('order_details')} ${selectedOrder.orderNumber}`}>
            <div className="order-detail">
              <div className="order-info">
                <h3>{t('order_info')}</h3>
                <p><strong>{t('order_number')}:</strong> {selectedOrder.orderNumber}</p>
                <p><strong>{t('order_type')}:</strong> {getOrderTypeIcon(selectedOrder.type)} {getOrderTypeText(selectedOrder.type)}</p>
                <p><strong>{t('partner')}:</strong> {selectedOrder.supplier || selectedOrder.customer}</p>
                <p><strong>{t('order_date')}:</strong> {selectedOrder.orderDate}</p>
                <p><strong>{t('expected_date')}:</strong> {selectedOrder.expectedDate}</p>
                <p><strong>{t('status')}:</strong> {getStatusIcon(selectedOrder.status)} {getStatusText(selectedOrder.status)}</p>
                <p><strong>{t('priority')}:</strong> {getPriorityColor(selectedOrder.priority)} {t(selectedOrder.priority)}</p>
                <p><strong>{t('total_amount')}:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>
                {selectedOrder.notes && (
                  <p><strong>{t('notes_label')}:</strong> {selectedOrder.notes}</p>
                )}
              </div>

              <div className="order-items">
                <h4>{t('order_items')}</h4>
                <div className="items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('item_name_header')}</th>
                        <th>{t('quantity_header')}</th>
                        <th>{t('unit_price')}</th>
                        <th>{t('total_price')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity} {item.unit}</td>
                          <td>{formatCurrency(item.unitPrice)}</td>
                          <td>{formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="order-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowStatusForm(true)}
                >
                  🔄 {t('update_order_status')}
                </button>
              </div>

              {showStatusForm && (
                <div className="status-form">
                  <h4>{t('update_order_status')}</h4>
                  <form onSubmit={handleStatusUpdate}>
                    <div className="form-group">
                                              <label>{t('new_status')}:</label>
                      <select
                        value={statusUpdate.status}
                        onChange={(e) => setStatusUpdate({
                          ...statusUpdate,
                          status: e.target.value
                        })}
                        required
                      >
                        <option value="">{t('select_status')}</option>
                        {selectedOrder.type === 'incoming' ? (
                          <>
                                                          <option value="confirmed">{t('confirmed')}</option>
                              <option value="in_transit">{t('in_transit')}</option>
                              <option value="received">{t('received')}</option>
                          </>
                        ) : (
                          <>
                                                          <option value="confirmed">{t('confirmed')}</option>
                              <option value="in_transit">{t('in_transit')}</option>
                              <option value="delivered">{t('delivered')}</option>
                          </>
                        )}
                        <option value="cancelled">{t('cancelled')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                                              <label>{t('status_update_notes')}:</label>
                      <textarea
                        value={statusUpdate.notes}
                        onChange={(e) => setStatusUpdate({
                          ...statusUpdate,
                          notes: e.target.value
                        })}
                        placeholder={t('status_update_placeholder_order')}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-success">
                        💾 {t('save')}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowStatusForm(false)}
                      >
                        ❌ {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
