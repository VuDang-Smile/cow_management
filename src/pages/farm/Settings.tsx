import Card from '../../components/Card'
import { users } from '../../mocks/farm'
import { useI18n } from '../../i18n'

export default function Settings(){
  const { lang, t } = useI18n()
  const locale = lang === 'JP' ? 'ja-JP' : 'vi-VN'
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title={t('settings_farm')}>
        <div className="grid" style={{ gridTemplateColumns:'1fr 1fr', gap: 12 }}>
          <div className="card">
            <div className="muted">{t('name')}</div>
            <input defaultValue="さくら牧場" />
            <div className="muted">{t('address')}</div>
            <input defaultValue="北海道札幌市" />
            <div className="muted">{t('license')}</div>
            <input defaultValue="許可-123456" />
            <div className="muted">{t('language')}</div>
            <select defaultValue="vi">
              <option value="vi">{t('vietnamese')}</option>
              <option value="en">{t('english')}</option>
            </select>
            <div className="actions" style={{ marginTop: 8 }}>
              <button className="btn success">{t('save')}</button>
            </div>
          </div>
        </div>
      </Card>

      <Card title={t('account_manage')} rightSlot={<button className="btn success">+ {t('add_account')}</button>}>
        <table className="table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('email')}</th>
              <th>{t('role')}</th>
              <th>{t('created_at')}</th>
              <th>{t('status')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u=> (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString(locale)}</td>
                <td>{u.status}</td>
                <td className="actions">
                  <button className="btn secondary">{t('edit')}</button>
                  <button className="btn danger">{t('delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}


