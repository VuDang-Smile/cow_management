import { useMemo, useState } from 'react'
import Card from '../../components/Card'
import { userNewsList } from '../../mocks/user'
import { useI18n } from '../../i18n'
import BottomBar from './BottomBar'
import { Link } from 'react-router-dom'

export default function UserNews(){
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const list = useMemo(()=>{
    const term = q.trim()
    if(!term) return userNewsList
    return userNewsList.filter(n=>
      n.titleJa.includes(term) ||
      n.excerptJa.includes(term) ||
      (n.tagsJa?.some(t=> t.includes(term)) ?? false)
    )
  }, [q])

  return (
    <div className="user-home">
      <div className="home-panel">
        <Card title={t('news')}>
          <div className="row" style={{ gap: 8, alignItems:'center', marginBottom: 8 }}>
            <div className="input" style={{ width:'100%' }}>
              <span className="icon">🔎</span>
              <input
                placeholder="キーワード検索..."
                value={q}
                onChange={e=> setQ(e.target.value)}
                aria-label="search"
              />
            </div>
          </div>
          <div className="news-grid">
            {list.map(n => (
              <article key={n.id} className="news-card">
                <Link to={`/user/news/${n.id}`} className="link" style={{ textDecoration:'none' }}>
                  <div className="thumb" style={{ backgroundImage:`url(${n.imageUrl})` }} aria-label={n.titleJa} />
                  <div className="meta">
                    <div className="category">{n.categoryJa}</div>
                    <h3 className="title">{n.titleJa}</h3>
                    <p className="excerpt">{n.excerptJa}</p>
                    <div className="row" style={{ justifyContent:'space-between', marginTop: 8 }}>
                      <div className="muted small">{formatDate(n.publishedAt)}</div>
                      <div className="muted small">{n.sourceName ?? 'ミルクチェーン'}</div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Card>
      </div>
      <style>{css}</style>
      <BottomBar />
    </div>
  )
}

function formatDate(iso: string){
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth()+1).padStart(2,'0')
  const day = String(d.getDate()).padStart(2,'0')
  return `${y}/${m}/${day}`
}

const css = `
.user-home .news-grid{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.user-home .news-card{
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}
.user-home .news-card .thumb{
  height: 160px;
  background-size: cover;
  background-position: center;
}
.user-home .news-card .meta{
  padding: 12px;
}
.user-home .news-card .category{
  font-size: 12px;
  color: #2563eb;
  margin-bottom: 6px;
}
.user-home .news-card .title{
  font-size: 16px;
  margin: 0 0 6px;
  line-height: 1.3;
}
.user-home .news-card .excerpt{
  margin: 0;
  color: #475569;
  font-size: 14px;
}
.user-home .small{ font-size: 12px;}
`


