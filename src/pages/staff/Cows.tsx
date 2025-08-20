import { useState } from 'react'
import { useI18n } from '../../i18n'
import Card from '../../components/Card'

interface Cow {
  id: string
  name: string
  age: number
  breed: string
  healthStatus: 'healthy' | 'sick' | 'recovering'
  lastCheckup: string
  weight: number
  notes: string
}

interface HealthRecord {
  id: string
  cowId: string
  date: string
  temperature: number
  weight: number
  symptoms: string
  treatment: string
  notes: string
}

export default function Cows() {
  const { t } = useI18n()
  const [selectedCow, setSelectedCow] = useState<Cow | null>(null)
  const [showHealthForm, setShowHealthForm] = useState(false)
  const [healthRecord, setHealthRecord] = useState<Partial<HealthRecord>>({
    temperature: 0,
    weight: 0,
    symptoms: '',
    treatment: '',
    notes: ''
  })

  const cows: Cow[] = [
    {
      id: 'A001',
      name: '牛 A001',
      age: 3,
      breed: 'ホルスタイン',
      healthStatus: 'healthy',
      lastCheckup: '2024-01-15',
      weight: 450,
      notes: '健康で食欲良好'
    },
    {
      id: 'A002',
      name: '牛 A002',
      age: 2,
      breed: 'ジャージー',
      healthStatus: 'sick',
      lastCheckup: '2024-01-14',
      weight: 380,
      notes: '経過観察が必要'
    },
    {
      id: 'B001',
      name: '牛 B001',
      age: 4,
      breed: 'ホルスタイン',
      healthStatus: 'recovering',
      lastCheckup: '2024-01-13',
      weight: 420,
      notes: '治療後回復中'
    }
  ]

  const handleHealthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCow) {
      // Thêm bản ghi sức khỏe mới (không xóa dữ liệu cũ)
      const newRecord: HealthRecord = {
        ...healthRecord as HealthRecord,
        id: Date.now().toString(),
        cowId: selectedCow.id,
        date: new Date().toISOString().split('T')[0]
      }
      console.log('Thêm bản ghi sức khỏe:', newRecord)
      setShowHealthForm(false)
      setHealthRecord({
        temperature: 0,
        weight: 0,
        symptoms: '',
        treatment: '',
        notes: ''
      })
    }
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '🟢'
      case 'sick': return '🔴'
      case 'recovering': return '🟡'
      default: return '⚪'
    }
  }

  return (
    <div className="cows-page">
      <h1>🐄 {t('staff_cows')}</h1>
      
      <div className="grid">
        {/* Danh sách bò */}
        <Card title={`📋 ${t('cow_list')}`}>
          <div className="cow-list">
            {cows.map(cow => (
              <div 
                key={cow.id} 
                className={`cow-item ${selectedCow?.id === cow.id ? 'selected' : ''}`}
                onClick={() => setSelectedCow(cow)}
              >
                <div className="cow-header">
                  <span className="cow-id">{cow.id}</span>
                  <span className="cow-name">{cow.name}</span>
                  <span className="health-status">
                    {getHealthStatusColor(cow.healthStatus)} {cow.healthStatus}
                  </span>
                </div>
                <div className="cow-details">
                  <p>{t('id')}: {cow.age} {t('range_day')} | {t('breed')}: {cow.breed}</p>
                  <p>{t('weight_label')}: {cow.weight} kg</p>
                  <p>{t('last_checkup')}: {cow.lastCheckup}</p>
                  <p>{t('notes_label')}: {cow.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chi tiết bò và nhập dữ liệu sức khỏe */}
        {selectedCow && (
          <Card title={`📊 ${t('cow_details')} ${selectedCow.name}`}>
            <div className="cow-detail">
              <div className="cow-info">
                <h3>{t('basic_info')}</h3>
                <p><strong>{t('id')}:</strong> {selectedCow.id}</p>
                <p><strong>{t('name')}:</strong> {selectedCow.name}</p>
                <p><strong>{t('id')}:</strong> {selectedCow.age} {t('range_day')}</p>
                <p><strong>{t('breed')}:</strong> {selectedCow.breed}</p>
                <p><strong>{t('weight_label')}:</strong> {selectedCow.weight} kg</p>
                <p><strong>{t('health_status')}:</strong> {getHealthStatusColor(selectedCow.healthStatus)} {t(selectedCow.healthStatus)}</p>
              </div>

              <div className="health-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowHealthForm(true)}
                >
                  📝 {t('health_data_entry')}
                </button>
              </div>

              {showHealthForm && (
                <div className="health-form">
                  <h4>{t('health_data_entry')}</h4>
                  <form onSubmit={handleHealthSubmit}>
                    <div className="form-group">
                                              <label>{t('temperature_label')}:</label>
                      <input
                        type="number"
                        step="0.1"
                        value={healthRecord.temperature}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          temperature: parseFloat(e.target.value)
                        })}
                        required
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('weight_label')}:</label>
                      <input
                        type="number"
                        step="0.1"
                        value={healthRecord.weight}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          weight: parseFloat(e.target.value)
                        })}
                        required
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('symptoms_label')}:</label>
                      <textarea
                        value={healthRecord.symptoms}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          symptoms: e.target.value
                        })}
                        placeholder={t('symptoms_placeholder')}
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('treatment_label')}:</label>
                      <textarea
                        value={healthRecord.treatment}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          treatment: e.target.value
                        })}
                        placeholder={t('treatment_placeholder')}
                      />
                    </div>
                    <div className="form-group">
                                              <label>{t('notes_label')}:</label>
                      <textarea
                        value={healthRecord.notes}
                        onChange={(e) => setHealthRecord({
                          ...healthRecord,
                          notes: e.target.value
                        })}
                        placeholder={t('notes_placeholder')}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-success">
                        💾 {t('save_record')}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowHealthForm(false)}
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
